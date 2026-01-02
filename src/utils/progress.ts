import type { Goal } from "../types/Goal";

export const calculateGoalProgress = (objectives: Goal["objectives"]) => {
  if (objectives.length === 0) return 0;
  const total = objectives.reduce((sum, obj) => sum + obj.progress, 0);
  return Math.round(total / objectives.length);
};

export const progressColor = (progress: number) => {
  if (progress < 15) return "bg-red-500";
  else if (progress < 30) return "bg-orange-500";
  else if (progress < 75) return "bg-yellow-500";
  else if (progress < 90) return "bg-green-500";
  else return "bg-green-600";
};