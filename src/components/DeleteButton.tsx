import React from 'react';
import { Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface DeleteButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, apague!"
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire({
          title: "Excluido!",
          text: "Seu treino foi excluido.",
          icon: "success"
        });
      }
    });
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