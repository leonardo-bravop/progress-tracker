import type { Goal } from "../types/Goal";

export const calculateGoalProgress = (objectives: Goal["objectives"]) => {
  if (objectives.length === 0) return 0;
  const total = objectives.reduce((sum, obj) => sum + obj.progress, 0);
  return Math.round(total / objectives.length);
};