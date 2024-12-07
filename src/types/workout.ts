export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  notes?: string;
  completed?: boolean
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  exercises: Exercise[];
  createdAt: Date;
}