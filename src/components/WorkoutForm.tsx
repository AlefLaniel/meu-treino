import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Exercise, WorkoutPlan } from '../types/workout';
import { ExerciseForm } from './ExerciseForm';

interface WorkoutFormProps {
  onSave: (workout: WorkoutPlan) => void;
  initialWorkout?: WorkoutPlan;
  onCancel: () => void;
}

export function WorkoutForm({ onSave, initialWorkout, onCancel }: WorkoutFormProps) {
  const [name, setName] = useState(initialWorkout?.name || '');
  const [description, setDescription] = useState(initialWorkout?.description || '');
  const [exercises, setExercises] = useState<Exercise[]>(initialWorkout?.exercises || []);
  const [showExerciseForm, setShowExerciseForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && exercises.length > 0) {
      const workout: WorkoutPlan = {
        id: initialWorkout?.id || Date.now().toString(),
        name,
        description,
        exercises,
        createdAt: initialWorkout?.createdAt || new Date()
      };
      onSave(workout);
    }
  };

  const handleAddExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Ficha</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição (opcional)</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Exercícios</h3>
            <button
              type="button"
              onClick={() => setShowExerciseForm(true)}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Adicionar Exercício
            </button>
          </div>

          <div className="space-y-2">
            {exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="bg-gray-50 p-4 rounded-md flex justify-between items-start"
              >
                <div>
                  <h4 className="font-medium">{exercise.name}</h4>
                  <p className="text-sm text-gray-600">
                    {exercise.sets} séries x {exercise.reps} repetições
                    {exercise.weight && ` • ${exercise.weight}`}
                  </p>
                  {exercise.notes && (
                    <p className="text-sm text-gray-500 mt-1">{exercise.notes}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setExercises(exercises.filter(e => e.id !== exercise.id))}
                  className="text-red-600 hover:text-red-700"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!name || exercises.length === 0}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-gray-400"
          >
            {initialWorkout ? 'Salvar Alterações' : 'Criar Ficha de Treino'}
          </button>
        </div>
      </form>

      {showExerciseForm && (
        <ExerciseForm
          onAdd={handleAddExercise}
          onClose={() => setShowExerciseForm(false)}
        />
      )}
    </div>
  );
}