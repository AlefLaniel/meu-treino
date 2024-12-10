export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface WorkoutSheet {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  plans: WorkoutPlan[];
}