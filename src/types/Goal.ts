export type Objective = {
  id: string;
  name: string;
  progress: number;
};

export type Goal = {
  id: string;
  name: string;
  objectives: Objective[];
};