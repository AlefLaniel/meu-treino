import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (window.confirm('Tem certeza que deseja excluir este treino?')) {
      onDelete();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
      title="Excluir treino"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}