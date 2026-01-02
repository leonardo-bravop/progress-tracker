import type { Objective } from "../types/Objective";
import { progressColor } from "../utils/progress";

type ObjectiveItemProps = {
  objective: Objective;
  onUpdate: (id: string, progress: number) => void;
  onDelete?: (id: string) => void;
  isEditing: boolean;
};

export function ObjectiveItem({ objective, onUpdate, onDelete, isEditing }: ObjectiveItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(objective.id, Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-normal truncate">
          {objective.name}
        </span>
        {isEditing && onDelete && (
          <button
            onClick={() => onDelete(objective.id)}
            className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex gap-2 w-full">
        {
          isEditing ? (
            <input
            type="range"
            min={0}
            max={100}
            value={objective.progress}
            onChange={handleChange}
            className="my-1 w-full"
            />
          ) : (
            <div className="my-2 h-2 bg-gray-200 rounded w-full">
              <div
                className={`h-full ${progressColor(objective.progress)} rounded transition-all`}
                style={{ width: `${objective.progress}%` }}
                />
            </div>
          )
        }

        <span className="text-xs text-gray-500">
            {objective.progress}%
        </span>
      </div>
    </div>
  );
}