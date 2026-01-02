import { useState } from "react";
import type { Goal } from "../types/Goal";
import { calculateGoalProgress, progressColor } from "../utils/progress";
import { ObjectiveItem } from "./ObjectiveItem";

type ProgressCardProps = {
  goal: Goal;
  onDelete?: (id: string) => void;
  onUpdate: (id: string, data: Partial<Goal>) => void;
  onObjectiveUpdate: (
    goalId: string,
    objectiveId: string,
    progress: number
  ) => void;
};

export function ProgressCard({ goal, onDelete, onUpdate, onObjectiveUpdate }: ProgressCardProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(goal.name);

  const toggleEdit = () => setEditing(!editing);

  const handleSave = () => {
    onUpdate(goal.id, { name });
    toggleEdit();
  };

  const progress = calculateGoalProgress(goal.objectives);

  const ViewMode = (
    <>
      <div className="flex justify-between items-center h-9 gap-2">
        {
          editing ?
            <input
              className="border p-1 rounded h-9 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          : <h3 className="font-medium text-lg truncate">{goal.name}</h3>
        }

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
          {progress}% complete
        </span>

        {
          editing ? (
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
          ) : 
            <button
              onClick={toggleEdit}
              className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
            >
              Edit
            </button>
        }
      </div>

      <div className="mt-4">
        <h4 className="mb-4">Items</h4>

        <div className="flex flex-col gap-2">
          {goal.objectives.map(obj => (
            <ObjectiveItem
              key={obj.id}
              objective={obj}
              onUpdate={(id, progress) =>
                onObjectiveUpdate(goal.id, id, progress)
              }
              isEditing={editing}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="h-fit w-full border p-3 rounded-lg bg-white shadow-sm flex flex-col gap-2 relative">
      {ViewMode}
    </div>
  );
}