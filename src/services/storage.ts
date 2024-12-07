import { WorkoutPlan } from '../types/workout';

const STORAGE_KEY = 'workout_plans';

export const StorageService = {
  getWorkouts(): WorkoutPlan[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    try {
      const workouts = JSON.parse(data);
      // Convert string dates back to Date objects
      return workouts.map((workout: WorkoutPlan) => ({
        ...workout,
        createdAt: new Date(workout.createdAt)
      }));
    } catch (error) {
      console.error('Error parsing workouts:', error);
      return [];
    }
  },

  saveWorkouts(workouts: WorkoutPlan[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    } catch (error) {
      console.error('Error saving workouts:', error);
    }
  }
};