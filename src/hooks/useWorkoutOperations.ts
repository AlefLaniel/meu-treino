import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { WorkoutSheet, WorkoutPlan, Exercise } from "../types/workout";

export default function useWorkoutOperations() {
  // Estado para armazenar as fichas, o plano selecionado e a ficha selecionada
  const [sheets, setSheets] = useState<WorkoutSheet[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<WorkoutSheet | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);

  // Adiciona uma nova ficha de treino
  const handleAddSheet = (name: string) => {
    const newSheet: WorkoutSheet = {
      id: uuidv4(),
      name,
      plans: [],
      createdAt: new Date().toISOString(),
    };
    setSheets((prev) => [...prev, newSheet]);
  };

  // Edita uma ficha de treino existente
  const handleEditSheet = (id: string, name: string) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === id ? { ...sheet, name } : sheet
      )
    );
  };

  // Remove uma ficha de treino
  const handleDeleteSheet = (id: string) => {
    setSheets((prev) => prev.filter((sheet) => sheet.id !== id));
    if (selectedSheet?.id === id) {
      setSelectedSheet(null);
    }
  };

  // Adiciona um novo plano de treino dentro de uma ficha
  const handleAddPlan = (sheetId: string, name: string) => {
    const newPlan: WorkoutPlan = {
      id: uuidv4(),
      name,
      exercises: [],
    };
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === sheetId
          ? { ...sheet, plans: [...sheet.plans, newPlan] }
          : sheet
      )
    );
  };

  // Edita um plano de treino
  const handleEditPlan = (sheetId: string, planId: string, name: string) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === sheetId
          ? {
              ...sheet,
              plans: sheet.plans.map((plan) =>
                plan.id === planId ? { ...plan, name } : plan
              ),
            }
          : sheet
      )
    );
  };

  // Remove um plano de treino
  const handleDeletePlan = (sheetId: string, planId: string) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === sheetId
          ? {
              ...sheet,
              plans: sheet.plans.filter((plan) => plan.id !== planId),
            }
          : sheet
      )
    );
    if (selectedPlan?.id === planId) {
      setSelectedPlan(null);
    }
  };

  // Adiciona um exercício em um plano de treino
  const handleAddExercise = (planId: string, name: string, reps: number) => {
    const newExercise: Exercise = {
        id: uuidv4(),
        name,
        reps,
        completed: false,
        sets: 0,
        weight: 0
    };
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === selectedSheet?.id
          ? {
              ...sheet,
              plans: sheet.plans.map((plan) =>
                plan.id === planId
                  ? { ...plan, exercises: [...plan.exercises, newExercise] }
                  : plan
              ),
            }
          : sheet
      )
    );
  };

  // Edita um exercício
  const handleEditExercise = (
    planId: string,
    exerciseId: string,
    name: string,
    reps: number
  ) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === selectedSheet?.id
          ? {
              ...sheet,
              plans: sheet.plans.map((plan) =>
                plan.id === planId
                  ? {
                      ...plan,
                      exercises: plan.exercises.map((exercise) =>
                        exercise.id === exerciseId
                          ? { ...exercise, name, reps }
                          : exercise
                      ),
                    }
                  : plan
              ),
            }
          : sheet
      )
    );
  };

  // Remove um exercício de um plano de treino
  const handleDeleteExercise = (planId: string, exerciseId: string) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === selectedSheet?.id
          ? {
              ...sheet,
              plans: sheet.plans.map((plan) =>
                plan.id === planId
                  ? {
                      ...plan,
                      exercises: plan.exercises.filter(
                        (exercise) => exercise.id !== exerciseId
                      ),
                    }
                  : plan
              ),
            }
          : sheet
      )
    );
  };

  // Alterna o estado de conclusão de um exercício
  const handleToggleExerciseCompletion = (planId: string, exerciseId: string) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === selectedSheet?.id
          ? {
              ...sheet,
              plans: sheet.plans.map((plan) =>
                plan.id === planId
                  ? {
                      ...plan,
                      exercises: plan.exercises.map((exercise) =>
                        exercise.id === exerciseId
                          ? { ...exercise, completed: !exercise.completed }
                          : exercise
                      ),
                    }
                  : plan
              ),
            }
          : sheet
      )
    );
  };

  // Reseta todos os exercícios de um plano para "não completados"
  const resetCompleted = (planId: string) => {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === selectedSheet?.id
          ? {
              ...sheet,
              plans: sheet.plans.map((plan) =>
                plan.id === planId
                  ? {
                      ...plan,
                      exercises: plan.exercises.map((exercise) => ({
                        ...exercise,
                        completed: false,
                      })),
                    }
                  : plan
              ),
            }
          : sheet
      )
    );
  };

  return {
    sheets,
    selectedSheet,
    selectedPlan,
    setSelectedSheet,
    setSelectedPlan,
    handleAddSheet,
    handleEditSheet,
    handleDeleteSheet,
    handleAddPlan,
    handleEditPlan,
    handleDeletePlan,
    handleAddExercise,
    handleEditExercise,
    handleDeleteExercise,
    handleToggleExerciseCompletion,
    resetCompleted,
  };
}
