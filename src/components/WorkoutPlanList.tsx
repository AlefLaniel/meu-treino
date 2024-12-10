import React from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { WorkoutPlan } from '../types/workout';

interface Props {
  plans: WorkoutPlan[];
  onSelect: (plan: WorkoutPlan) => void;
  onAdd: () => void;
  onEdit: (plan: WorkoutPlan) => void;
  onDelete: (id: string) => void;
}

export default function WorkoutPlanList({ plans, onSelect, onAdd, onEdit, onDelete }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Planos de Treino</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          Novo Plano
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-semibold text-gray-800">{plan.name}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(plan)}
                  className="p-1 text-gray-600 hover:text-indigo-600"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(plan.id)}
                  className="p-1 text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {plan.exercises.length} exercícios
            </p>

            <button
              onClick={() => onSelect(plan)}
              className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              Ver Exercícios
            </button>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          Nenhum plano de treino cadastrado nesta ficha.
        </div>
      )}
    </div>
  );
}