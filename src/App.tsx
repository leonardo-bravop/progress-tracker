import { useState } from "react";
import { ProgressCard } from "./components/ProgressCard";
import { AddGoalModal } from "./components/AddGoalModal";
import type { Goal } from "./types/Goal";

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addGoal = (name: string, progress: number) => {
    setGoals((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, progress },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="p-4 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-bold">Progress Tracker</h1>
      </header>

      <main className="p-4 flex flex-col gap-3">
        {goals.map((goal) => (
          <ProgressCard
            key={goal.id}
            name={goal.name}
            progress={goal.progress}
            onDelete={() =>
              setGoals(goals.filter((g) => g.id !== goal.id))
            }
          />
        ))}

        {goals.length === 0 && (
          <p className="text-gray-500 text-center mt-10">No goals yet. Add one!</p>
        )}
      </main>

      <button
        onClick={() => setIsModalOpen(true)}
        className="
          fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white
          px-4 py-2 rounded-full shadow-lg text-lg
        "
      >
        + Add Goal
      </button>

      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addGoal}
      />
    </div>
  );
}