import React from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { WorkoutSheet } from '../types/workout';

interface Props {
  sheets: WorkoutSheet[];
  onSelect: (sheet: WorkoutSheet) => void;
  onAdd: () => void;
  onEdit: (sheet: WorkoutSheet) => void;
  onDelete: (id: string) => void;
}

export default function WorkoutSheetList({ sheets, onSelect, onAdd, onEdit, onDelete }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Meus Treinos</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          Nova Ficha
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sheets.map((sheet) => (
          <div
            key={sheet.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{sheet.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(sheet)}
                  className="p-1 text-gray-600 hover:text-indigo-600"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(sheet.id)}
                  className="p-1 text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{sheet.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(sheet.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {sheet.plans.length} planos de treino
            </p>
            
            <button
              onClick={() => onSelect(sheet)}
              className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
      
      {sheets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma ficha de treino cadastrada. Crie uma nova ficha para começar!
        </div>
      )}
    </div>
  );
}