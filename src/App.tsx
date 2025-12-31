import { ProgressCard } from "./components/ProgressCard";

export default function App() {
  const mockSkills = [
    { name: "Learn React", progress: 20 },
    { name: "Study Algorithms", progress: 50 },
    { name: "Build Habit Tracker", progress: 10 },
    { name: "Learn Rust", progress: 80 },
    { name: "Master TypeScript", progress: 90 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

      <header className="p-4 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-bold">Skill Tracker</h1>
      </header>

      <main className="flex-1 p-4 grid gap-3">
        {mockSkills.map((skill) => (
          <ProgressCard key={skill.name} name={skill.name} progress={skill.progress} />
        ))}
      </main>

      <button
        className="
          fixed bottom-6 right-6 bg-gray-600 hover:bg-gray-700
          text-white px-4 py-2 rounded-full shadow-lg
          transition-all cursor-pointer
        "
      >
        + Add Skill
      </button>
    </div>
  );
}