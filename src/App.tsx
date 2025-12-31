export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

      <header className="p-4 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-bold">Skill Tracker</h1>
      </header>

      <main className="flex-1 p-4">
        <p className="text-gray-600">No skills yet. Start by adding one!</p>
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