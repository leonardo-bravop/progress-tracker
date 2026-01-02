import type { Objective } from "./Objective";

export type Goal = {
  id: string;
  name: string;
  objectives: Objective[];
};