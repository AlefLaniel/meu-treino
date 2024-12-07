import { useState, useEffect } from 'react';
import { WorkoutPlan } from '../types/workout';
import { StorageService } from '../services/storage';

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);

  useEffect(() => {
    const savedWorkouts = StorageService.getWorkouts();
    setWorkouts(savedWorkouts);
  }, []);

  const addWorkout = (workout: WorkoutPlan) => {
    const updatedWorkouts = [...workouts, workout];
    setWorkouts(updatedWorkouts);
    StorageService.saveWorkouts(updatedWorkouts);
  };

  const updateWorkout = (updatedWorkout: WorkoutPlan) => {
    const updatedWorkouts = workouts.map(workout => 
      workout.id === updatedWorkout.id ? updatedWorkout : workout
    );
    setWorkouts(updatedWorkouts);
    StorageService.saveWorkouts(updatedWorkouts);
  };

  const deleteWorkout = (workoutId: string) => {
    const updatedWorkouts = workouts.filter(w => w.id !== workoutId);
    setWorkouts(updatedWorkouts);
    StorageService.saveWorkouts(updatedWorkouts);
  };

  return {
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout
  };
}