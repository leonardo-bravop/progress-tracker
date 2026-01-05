import { useEffect, useState } from "react";
import { calculateGoalProgress, progressColor } from "../utils/progress";
import type { Objective } from "../types/Objective";
import { ObjectiveItem } from "./ObjectiveItem";
import type { Goal } from "../types/Goal";

type AddGoalModalProps = {
  onClose: () => void;
  onAdd: (goal: Goal) => void;
};

export function AddGoalModal({ onClose, onAdd }: AddGoalModalProps) {
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  useEffect(() => {
    setProgress(calculateGoalProgress(objectives));
  }, [objectives]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      name,
      objectives
    });

    setName("");
    setObjectives([]);
    onClose();
  };

  const updateObjective = (
    objectiveId: string,
    data: Partial<Objective>
  ) => {
    setObjectives(prev => prev.map(obj => {
       const isTargetObj = obj.id === objectiveId;
          if (!isTargetObj) return obj;
          return { ...obj, ...data };
      })
    )
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

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg shadow-lg w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Add New Goal</h2>

        <div className="flex flex-col gap-2">
          <>
            <div className="flex justify-between items-center h-9 gap-3">
                <label className="text-sm">Name*</label>
                <input
                  required
                  className="border p-1 rounded h-9 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter goal name"
                />
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
            </div>
      
            <div className="mt-4">
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2 mb-4">
                  <h4>Items ({objectives.length})</h4>
                </div>
      
                <button
                  type="button"
                  onClick={addObjective}
                  className="mb-3 text-xs px-2 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 align-top cursor-pointer"
                >
                  Add Item
                </button>
              </div>
      
              <div className="flex flex-col gap-4 max-h-55 overflow-y-scroll pr-4">
                {objectives.map(obj => (
                  <ObjectiveItem
                    key={obj.id}
                    objective={obj}
                    onUpdate={updateObjective}
                    onDelete={deleteObjective}
                    isEditing={true}
                  />
                ))}
              </div>
            </div>
          </>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="
              px-3 py-1 border border-gray-300 rounded text-black
              bg-gray-100 hover:bg-gray-200 cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              px-3 py-1 bg-blue-600 text-white rounded cursor-pointer
              hover:bg-blue-700
            "
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}