import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Exercise } from '../types/workout';

interface ExerciseFormProps {
  onAdd: (exercise: Exercise) => void;
  onClose: () => void;
}

export function ExerciseForm({ onAdd, onClose }: ExerciseFormProps) {
  const [exercise, setExercise] = useState<Partial<Exercise>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exercise.name && exercise.sets && exercise.reps) {
      onAdd({
        id: Date.now().toString(),
        name: exercise.name,
        sets: Number(exercise.sets),
        reps: exercise.reps,
        weight: exercise.weight,
        notes: exercise.notes
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Adicionar Exercício</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Exercício</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={exercise.name || ''}
              onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Séries</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={exercise.sets || ''}
                onChange={(e) => setExercise({ ...exercise, sets: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Repetições</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="ex: 12 ou 8-12"
                value={exercise.reps || ''}
                onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Peso (opcional)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="ex: 10kg"
              value={exercise.weight || ''}
              onChange={(e) => setExercise({ ...exercise, weight: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Observações (opcional)</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={exercise.notes || ''}
              onChange={(e) => setExercise({ ...exercise, notes: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Adicionar Exercício
          </button>
        </form>
      </div>
    </div>
  );
}