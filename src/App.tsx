import { useState } from "react";
import { ProgressCard } from "./components/ProgressCard";
import type { Goal } from "./types/Goal";

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", name: "Learn React", progress: 20 },
    { id: "2", name: "Study Algorithms", progress: 50 },
    { id: "3", name: "Build Habit Tracker", progress: 10 },
    { id: "4", name: "Learn Rust", progress: 80 },
    { id: "5", name: "Master TypeScript", progress: 90 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="p-4 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-bold">Progress Tracker</h1>
      </header>

      <main className="flex-1 p-4 grid gap-3">
        {goals.map((goal) => (
          <ProgressCard key={goal.id} name={goal.name} progress={goal.progress} />
        ))}
      </main>

      <button
        className="
          fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white
          px-4 py-2 rounded-full shadow-lg transition-all
        "
      >
        + Add Goal
      </button>
    </div>
  );
}