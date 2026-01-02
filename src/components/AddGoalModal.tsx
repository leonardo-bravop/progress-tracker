import { useState } from "react";

type AddGoalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, progress: number) => void;
};

export function AddGoalModal({ isOpen, onClose, onAdd }: AddGoalModalProps) {
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, progress);
    setName("");
    setProgress(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg shadow-lg w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Add New Goal</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Name</label>
          <input
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Learn React"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Progress ({progress}%)</label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            disabled
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border rounded text-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}