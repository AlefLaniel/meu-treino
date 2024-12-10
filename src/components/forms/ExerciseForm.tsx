import React, { useState } from 'react';
import { Exercise } from '../../types/workout';

interface Props {
  exercise?: Exercise | null | undefined;
  onSubmit: (data: Omit<Exercise, 'id'>) => void;
  onCancel: () => void;
}

export default function ExerciseForm({ exercise, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(exercise?.name ?? '');
  const [sets, setSets] = useState(exercise?.sets ?? 3);
  const [reps, setReps] = useState(exercise?.reps ?? 12);
  const [weight, setWeight] = useState(exercise?.weight ?? 0);
  const [notes, setNotes] = useState(exercise?.notes ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, sets, reps, weight, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome do Exercício
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="sets" className="block text-sm font-medium text-gray-700">
            Séries
          </label>
          <input
            type="number"
            id="sets"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-700">
            Repetições
          </label>
          <input
            type="number"
            id="reps"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Peso (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            min="0"
            step="0.5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Observações
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {exercise ? 'Atualizar' : 'Criar'} Exercício
        </button>
      </div>
    </form>
  );
}