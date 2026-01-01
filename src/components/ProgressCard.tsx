import { useState } from "react";
import type { Goal } from "../types/Goal";

type ProgressCardProps = {
  goal: Goal;
  onDelete?: (id: string) => void;
  onUpdate: (id: string, data: Partial<Goal>) => void;
};

const progressColor = (progress: number) => {
  if (progress < 15) return "bg-red-500";
  else if (progress < 30) return "bg-orange-500";
  else if (progress < 75) return "bg-yellow-500";
  else if (progress < 90) return "bg-green-500";
  else return "bg-green-600";
};

export function ProgressCard({ goal, onDelete, onUpdate }: ProgressCardProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(goal.name);
  const [progress, setProgress] = useState(goal.progress);

  const toggleEdit = () => setEditing(!editing);

  const handleSave = () => {
    onUpdate(goal.id, { name, progress });
    toggleEdit();
  };

  const ViewMode = (
    <>
      <div className="flex justify-between items-center h-9">
        <h3 className="font-medium text-lg truncate">{goal.name}</h3>

        {onDelete && (
            <button
              onClick={() => onDelete(goal.id)}
              className="hover:text-red-700 text-lg leading-none"
            >
              ✕
            </button>
          )}
      </div>

      <div className="my-2 h-2 bg-gray-200 rounded">
        <div
          className={`h-full ${progressColor(progress)} rounded transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-gray-600">
          {goal.progress}% complete
        </span>
        <button
            onClick={toggleEdit}
            className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
        >
          Edit
        </button>
      </div>
    </>
  );

  const EditMode = (
    <div className="flex flex-col gap-3 w-full">
      <input
        className="border p-1 rounded h-9"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="h-[16px]"
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
      />

      <div className="flex justify-between items-center text-sm">
        <span>{progress}%</span>

        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
            onClick={toggleEdit}
          >
            Cancel
          </button>

          <button
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-fit w-full border p-3 rounded-lg bg-white shadow-sm flex flex-col gap-2 relative">
      {editing ? EditMode : ViewMode}
    </div>
  );
}