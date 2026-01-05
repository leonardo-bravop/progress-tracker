import { useEffect, useState } from "react";
import type { Goal } from "../types/Goal";
import { calculateGoalProgress, progressColor } from "../utils/progress";
import { ObjectiveItem } from "./ObjectiveItem";
import type { Objective } from "../types/Objective";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type ProgressCardProps = {
  goal: Goal;
  onDelete?: (id: string) => void;
  onUpdate: (id: string, data: Partial<Goal>) => void;
};

export function ProgressCard({ goal, onDelete, onUpdate }: ProgressCardProps) {
  const [editingObjectives, setEditingObjectives] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState(goal.name);
  const [objectives, setObjectives] = useState(goal.objectives);
  const [progress, setProgress] = useState(0);

  const toggleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  const startEdit = (editType: 'name' | 'objectives') => {
    if (editType === 'name') {
      setEditingName(true);
    } else {
      setEditingObjectives(true);
      setCollapsed(false);
    }
  };

  const cancelEdit = () => {
    setEditingName(false);
    setEditingObjectives(false);
    setObjectives(goal.objectives);
    setName(goal.name);
  };

  const handleSave = () => {
    onUpdate(goal.id, { name, objectives });
    setEditingName(false);
    setEditingObjectives(false);
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
    setCollapsed(false);
    setEditingObjectives(true);

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

  useEffect(() => {
    setProgress(calculateGoalProgress(objectives));
  }, [objectives]);
  
  const ViewMode = (
    <>
      <div className="flex justify-between items-center h-9 gap-3">
        {
          editingName ?
            <input
              className="border p-1 rounded h-9 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          : <h3 className="font-medium text-lg truncate">{goal.name}</h3>
        }

        <div className="flex gap-2">
          {!editingName &&
            <button
              onClick={() => startEdit('name')}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>
          }
          
          {onDelete &&
            <button
              onClick={() => onDelete(goal.id)}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          }
        </div>
      </div>

      <div className="my-2 h-2 bg-gray-200 rounded">
        <div
          className={`h-full ${progressColor(progress)} rounded transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-gray-600 pb-1.5">
          {progress}% complete
        </span>

        {
          (editingName || editingObjectives) && (
             <div className="flex gap-2">
              <button
                className="px-2 py-1 text-xs text-black border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => cancelEdit()}
              >
                Cancel
              </button>

              <button
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )
        }
      </div>

      <div className="mt-4">
        <div className="flex gap-2 justify-between items-center mb-4">
          <h4>Items ({objectives.length})</h4>
          <div className="flex gap-2">
             {
              objectives.length > 0 &&
                <button 
                  className="text-gray-600 hover:text-gray-900 cursor-pointer" 
                  onClick={toggleCollapse}
                >
                  {collapsed ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                </button>
            }
            {
              !editingObjectives &&
                <button
                  onClick={() => startEdit('objectives')}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
            }
            <button
              onClick={addObjective}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {!collapsed && objectives.map(obj => (
            <ObjectiveItem
              key={obj.id}
              objective={obj}
              onUpdate={updateObjective}
              onDelete={deleteObjective}
              isEditing={editingObjectives}
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