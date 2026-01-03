import { useState } from "react";
import type { Goal } from "../types/Goal";
import { calculateGoalProgress, progressColor } from "../utils/progress";
import { ObjectiveItem } from "./ObjectiveItem";
import type { Objective } from "../types/Objective";

type ProgressCardProps = {
  goal: Goal;
  onDelete?: (id: string) => void;
  onUpdate: (id: string, data: Partial<Goal>) => void;
};

export function ProgressCard({ goal, onDelete, onUpdate }: ProgressCardProps) {
  const [editing, setEditing] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState(goal.name);
  const [objectives, setObjectives] = useState(goal.objectives);

  const toggleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  const startEdit = () => {
    setEditing(true);
    setCollapsed(false);
  };

  const cancelEdit = () => {
    setObjectives(goal.objectives);
    setName(goal.name);
    setEditing(false);
  };

  const handleSave = () => {
    onUpdate(goal.id, { name, objectives });
    setEditing(false);
  };

  const updateObjective = (
    objectiveId: string,
    data: Partial<Objective>
  ) => {
    setObjectives(prev =>
      prev.map(obj => {
       const isTargetObj = obj.id === objectiveId;
          if (!isTargetObj) return obj;
          return { ...obj, ...data };
      })
    );
  };

  const addObjective = () => {
    setObjectives(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: `Objective ${prev.length + 1}`,
        progress: 0,
      },
    ]);
  };

  const deleteObjective = (id: string) => {
    setObjectives(prev => prev.filter(obj => obj.id !== id));
  };

  const progress = calculateGoalProgress(goal.objectives);

  const ViewMode = (
    <>
      <div className="flex justify-between items-center h-9 gap-3">
        {
          editing ?
            <input
              className="border p-1 rounded h-9 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          : <h3 className="font-medium text-lg truncate">{goal.name}</h3>
        }

        {editing && onDelete && (
            <button
              onClick={() => onDelete(goal.id)}
              className="text-red-600 hover:text-red-700 text-lg leading-none"
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
                className="px-2 py-1 text-xs text-black border border-gray-300 rounded bg-gray-100 hover:bg-gray-200"
                onClick={cancelEdit}
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
              onClick={startEdit}
              className="text-xs px-2 py-1 text-black border border-gray-300 rounded bg-gray-100 hover:bg-gray-200"
            >
              Edit
            </button>
        }
      </div>

      <div className="mt-4">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 mb-4">
            <h4>Items ({objectives.length})</h4>

            <button 
              className="
                text-xs px-2 py-1 text-black border border-gray-300 rounded bg-gray-100 hover:bg-gray-200
              " 
              onClick={toggleCollapse}
            >
              {collapsed ? 'Show' : 'Hide'}
            </button>
          </div>

          {editing && (
            <button
              onClick={addObjective}
              className="mb-3 text-xs px-2 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 align-top"
            >
              Add Item
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {!collapsed && objectives.map(obj => (
            <ObjectiveItem
              key={obj.id}
              objective={obj}
              onUpdate={updateObjective}
              onDelete={deleteObjective}
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