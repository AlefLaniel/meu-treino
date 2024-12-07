import React from 'react';
import { Dumbbell, ChevronRight } from 'lucide-react';
import { WorkoutPlan } from '../types/workout';
import { DeleteButton } from './DeleteButton';

interface WorkoutCardProps {
  workout: WorkoutPlan;
  onClick: (workout: WorkoutPlan) => void;
  onDelete: (workoutId: string) => void;
}

export function WorkoutCard({ workout, onClick, onDelete }: WorkoutCardProps) {
  return (
    <div 
      onClick={() => onClick(workout)}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-full">
            <Dumbbell className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{workout.name}</h3>
            <p className="text-sm text-gray-600">{workout.exercises.length} exercícios</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DeleteButton onDelete={() => onDelete(workout.id)} />
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}