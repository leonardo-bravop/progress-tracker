type ProgressCardProps = {
  name: string;
  progress?: number;
  onDelete?: () => void;
};

const progressColor = (progress: number) => {
  if (progress < 15) return "bg-red-500";
  else if (progress < 30) return "bg-orange-500";
  else if (progress < 75) return "bg-yellow-500";
  else if (progress < 90) return "bg-green-500";
  else return "bg-green-600";
};

export function ProgressCard({ name, progress = 0, onDelete }: ProgressCardProps) {
    return (
        <div className="h-fit w-full border p-3 rounded-lg bg-white shadow-sm flex flex-col gap-2 relative">
           {onDelete && (
              <button
                onClick={onDelete}
                className="absolute top-2 right-2 hover:text-red-700"
              >
                ✕
              </button>
            )}

        <h3 className="font-medium text-lg">{name}</h3>
        <div className="h-2 bg-gray-200 rounded">
            <div
                className={`h-full ${progressColor(progress)} rounded transition-all`}
                style={{ width: `${progress}%` }}
            />
        </div>
        <span className="text-sm text-gray-600">{progress}% complete</span>
        </div>
    );
}