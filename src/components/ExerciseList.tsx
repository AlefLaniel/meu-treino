import React from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Exercise } from '../types/workout';

interface Props {
  exercises: Exercise[];
  onAdd: () => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

export default function ExerciseList({ exercises, onAdd, onEdit, onDelete }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Exercícios</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          Novo Exercício
        </button>
      </div>

      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {exercise.name}
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Séries:</span> {exercise.sets}
                  </div>
                  <div>
                    <span className="font-medium">Repetições:</span> {exercise.reps}
                  </div>
                  <div>
                    <span className="font-medium">Peso:</span> {exercise.weight}kg
                  </div>
                </div>
                {exercise.notes && (
                  <p className="mt-2 text-sm text-gray-500">{exercise.notes}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(exercise)}
                  className="p-1 text-gray-600 hover:text-indigo-600"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(exercise.id)}
                  className="p-1 text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {exercises.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          Nenhum exercício cadastrado neste plano.
        </div>
      )}
    </div>
  );
}