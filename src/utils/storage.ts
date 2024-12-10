import { WorkoutSheet } from '../types/workout';

const STORAGE_KEY = 'workout-sheets';

export const getWorkoutSheets = (): WorkoutSheet[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveWorkoutSheets = (sheets: WorkoutSheet[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sheets));
};