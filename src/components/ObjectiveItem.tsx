import type { Objective } from "../types/Objective";

type ObjectiveItemProps = {
  objective: Objective;
  onUpdate: (id: string, progress: number) => void;
};

export function ObjectiveItem({ objective, onUpdate }: ObjectiveItemProps) {
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

      <input
        type="range"
        min={0}
        max={100}
        value={objective.progress}
        onChange={handleChange}
        className="h-[16px]"
        style={{accentColor: "black"}}
      />
    </div>
  );
}