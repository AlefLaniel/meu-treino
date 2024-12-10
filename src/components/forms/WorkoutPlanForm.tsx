import React, { useState } from 'react';
import { WorkoutPlan } from '../../types/workout';

interface Props {
  plan?: WorkoutPlan | null | undefined;
  onSubmit: (data: Pick<WorkoutPlan, 'name'>) => void;
  onCancel: () => void;
}

export default function WorkoutPlanForm({ plan, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(plan?.name ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome do Plano
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
          {plan ? 'Atualizar' : 'Criar'} Plano
        </button>
      </div>
    </form>
  );
}