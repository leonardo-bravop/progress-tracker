import { useState, useEffect } from "react";
import { ProgressCard } from "./components/ProgressCard";
import { AddGoalModal } from "./components/AddGoalModal";
import type { Goal } from "./types/Goal";
import { ConfirmModal } from "./components/ConfirmModal";

type ModalState =
  | {
      type: "confirm";
      title: string;
      message?: string;
      onConfirm: () => void;
    }
  | { type: "add-goal" }
  | null;

export default function App() {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const stored = localStorage.getItem("goals");
    return stored ? JSON.parse(stored) : [];
  });

  const [modal, setModal] = useState<ModalState>(null);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const updateGoal = (id: string, data: Partial<Goal>) => {
    setGoals(prev =>
      prev.map(goal => goal.id === id ? { ...goal, ...data } : goal)
    )
  }

  const addGoal = (goal: Goal) => {
    setModal({ type: "add-goal" });

    setGoals(prev => [
      ...prev,
      goal
    ])
  }

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="p-4 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-bold">Progress Tracker</h1>
      </header>

      <main className={`p-4 grid gap-3 pb-20 ${goals.length ? "" : "flex-1"}`} style={{grid: goals.length ? "auto-flow / repeat(auto-fill, minmax(320px, 1fr))" : "none"}}>
        {goals.map(goal => (
          <ProgressCard
            key={goal.id}
            goal={goal}
            onDelete={() =>
              setModal({
                type: "confirm",
                title: "Delete goal?",
                message: "This will permanently delete the goal and all objectives.",
                onConfirm: () => {
                  deleteGoal(goal.id);
                  setModal(null);
                },
              })
            }
            onUpdate={updateGoal}
          />
        ))}

        {
          goals.length === 0 && (
          <p className="text-gray-500 text-center my-auto">
            No goals yet. Add one!
          </p>
        )}
      </main>      

      <button
        onClick={() => setModal({ type: "add-goal" })}
        className="
          fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white
          px-4 py-2 rounded-full shadow-lg text-lg cursor-pointer
        "
      >
        + Add Goal
      </button>

      {modal?.type === "add-goal" && (
        <AddGoalModal
          onClose={() => setModal(null)}
          onAdd={addGoal}
        />
      )}

      {modal?.type === "confirm" && (
        <ConfirmModal
          title={modal.title}
          message={modal.message ?? ""}
          onCancel={() => setModal(null)}
          onConfirm={modal.onConfirm}
        />
      )}
    </div>
  );
}