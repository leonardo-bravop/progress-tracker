import type { Objective } from "../types/Objective";
import { progressColor } from "../utils/progress";

type ObjectiveItemProps = {
  objective: Objective;
  onUpdate: (id: string, progress: number) => void;
  isEditing: boolean;
};

export function ObjectiveItem({ objective, onUpdate, isEditing }: ObjectiveItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(objective.id, Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-normal truncate">
          {objective.name}
        </span>
        <span className="text-xs text-gray-500">
          {objective.progress}%
        </span>
      </div>

      {
        isEditing ? (
          <input
          type="range"
          min={0}
          max={100}
          value={objective.progress}
          onChange={handleChange}
          className="my-1"
        />
        ) : (
          <div className="my-2 h-2 bg-gray-200 rounded">
            <div
              className={`h-full ${progressColor(objective.progress)} rounded transition-all`}
              style={{ width: `${objective.progress}%` }}
            />
          </div>
        )
      }
    </div>
  );
}