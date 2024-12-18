import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { WorkoutSheet, WorkoutPlan, Exercise } from "./types/workout";
import { getWorkoutSheets, saveWorkoutSheets } from "./utils/storage";
import WorkoutSheetList from "./components/WorkoutSheetList";
import WorkoutPlanList from "./components/WorkoutPlanList";
import ExerciseList from "./components/ExerciseList";
import Modal from "./components/Modal";
import WorkoutSheetForm from "./components/forms/WorkoutSheetForm";
import WorkoutPlanForm from "./components/forms/WorkoutPlanForm";
import ExerciseForm from "./components/forms/ExerciseForm";
import { ChevronLeft } from "lucide-react";
import { generatePdfFromHtml } from "./utils/pdf";
import { workoutSheets } from "./data/workoutSheets";

export default function App() {
  const [sheets, setSheets] = useState<WorkoutSheet[]>(workoutSheets);
  const [selectedSheet, setSelectedSheet] = useState<WorkoutSheet | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);

  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  const [editingSheet, setEditingSheet] = useState<WorkoutSheet | null>(null);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    setSheets(getWorkoutSheets());
  }, []);

  useEffect(() => {
    saveWorkoutSheets(sheets);
  }, [sheets]);

  // Sheet operations
  const handleAddSheet = (
    data: Omit<WorkoutSheet, "id" | "plans" | "createdAt">
  ) => {
    const newSheet: WorkoutSheet = {
      ...data,
      id: uuidv4(),
      plans: [],
      createdAt: new Date().toISOString(),
    };
    setSheets([...sheets, newSheet]);
    setIsSheetModalOpen(false);
  };

  const handleEditSheet = (
    data: Omit<WorkoutSheet, "id" | "plans" | "createdAt">
  ) => {
    if (!editingSheet) return;
    const updatedSheets = sheets.map((sheet) =>
      sheet.id === editingSheet.id ? { ...sheet, ...data } : sheet
    );
    setSheets(updatedSheets);
    setSelectedSheet(
      updatedSheets.find((s) => s.id === editingSheet.id) ?? null
    );
    setIsSheetModalOpen(false);
    setEditingSheet(null);
  };

  const handleDeleteSheet = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta ficha?")) return;
    setSheets(sheets.filter((sheet) => sheet.id !== id));
    if (selectedSheet?.id === id) setSelectedSheet(null);
  };

  // Plan operations
  const handleAddPlan = (data: Pick<WorkoutPlan, "name">) => {
    if (!selectedSheet) return;
    const newPlan: WorkoutPlan = {
      ...data,
      id: uuidv4(),
      exercises: [],
    };
    const updatedSheet = {
      ...selectedSheet,
      plans: [...selectedSheet.plans, newPlan],
    };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setIsPlanModalOpen(false);
  };

  const handleEditPlan = (data: Pick<WorkoutPlan, "name">) => {
    if (!selectedSheet || !editingPlan) return;
    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === editingPlan.id ? { ...plan, ...data } : plan
    );
    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === editingPlan.id) ?? null);
    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (id: string) => {
    if (
      !selectedSheet ||
      !confirm("Tem certeza que deseja excluir este plano?")
    )
      return;
    const updatedSheet = {
      ...selectedSheet,
      plans: selectedSheet.plans.filter((plan) => plan.id !== id),
    };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    if (selectedPlan?.id === id) setSelectedPlan(null);
  };

  // Exercise operations
  const handleAddExercise = (data: Omit<Exercise, "id">) => {
    if (!selectedSheet || !selectedPlan) return;
    const newExercise: Exercise = {
      ...data,
      id: uuidv4(),
    };
    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? { ...plan, exercises: [...plan.exercises, newExercise] }
        : plan
    );
    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === selectedPlan.id) ?? null);
    setIsExerciseModalOpen(false);
  };

  const handleEditExercise = (data: Omit<Exercise, "id">) => {
    if (!selectedSheet || !selectedPlan || !editingExercise) return;
    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? {
            ...plan,
            exercises: plan.exercises.map((exercise) =>
              exercise.id === editingExercise.id
                ? { ...exercise, ...data }
                : exercise
            ),
          }
        : plan
    );
    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === selectedPlan.id) ?? null);
    setIsExerciseModalOpen(false);
    setEditingExercise(null);
  };

  const handleDeleteExercise = (id: string) => {
    if (
      !selectedSheet ||
      !selectedPlan ||
      !confirm("Tem certeza que deseja excluir este exercício?")
    )
      return;
    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? {
            ...plan,
            exercises: plan.exercises.filter((exercise) => exercise.id !== id),
          }
        : plan
    );
    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === selectedPlan.id) ?? null);
  };

  const handleToggleExerciseCompletion = (id: string) => {
    if (!selectedSheet || !selectedPlan) return;

    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? {
            ...plan,
            exercises: plan.exercises.map((exercise) =>
              exercise.id === id
                ? { ...exercise, completed: !exercise.completed }
                : exercise
            ),
          }
        : plan
    );

    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === selectedPlan.id) ?? null);
  };

  const resetCompleted = () => {
    if (!selectedSheet || !selectedPlan) return;

    const updatedPlans = selectedSheet.plans.map((plan) =>
      plan.id === selectedPlan.id
        ? {
            ...plan, done: true,
            exercises: plan.exercises.map((exercise) => ({
              ...exercise,
              completed: false, // Reseta o estado
            })),
          }
        : plan
    );

    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
    setSelectedSheet(updatedSheet);
    setSelectedPlan(updatedPlans.find((p) => p.id === selectedPlan.id) ?? null);
    setSelectedPlan(null)
  };

  const resetDone = () => {
    if (!selectedSheet) return;
  
    const updatedPlans = selectedSheet.plans.map((plan) => ({
      ...plan,
      done: false, // Reseta o estado de "done" do plano
      exercises: plan.exercises.map((exercise) => ({
        ...exercise,
        completed: false, // Reseta o estado de "completed" de todos os exercícios
      })),
    }));
  
    const updatedSheet = { ...selectedSheet, plans: updatedPlans };
  
    setSheets(
      sheets.map((sheet) =>
        sheet.id === selectedSheet.id ? updatedSheet : sheet
      )
    );
  
    setSelectedSheet(updatedSheet);
    setSelectedPlan(null); // Remove o plano selecionado para refletir a atualização
  };
  


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedSheet ? (
          <WorkoutSheetList
            sheets={sheets}
            onSelect={setSelectedSheet}
            onAdd={() => setIsSheetModalOpen(true)}
            onEdit={(sheet) => {
              setEditingSheet(sheet);
              setIsSheetModalOpen(true);
            }}
            onDelete={handleDeleteSheet}
          />
        ) : !selectedPlan ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedSheet(null)}
                className="action-button flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft size={20} />
                Voltar
              </button>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedSheet.name}
              </h2>
            </div>
            <WorkoutPlanList
              plans={selectedSheet.plans}
              onSelect={setSelectedPlan}
              onAdd={() => setIsPlanModalOpen(true)}
              onEdit={(plan) => {
                setEditingPlan(plan);
                setIsPlanModalOpen(true);
              }}
              onDelete={handleDeletePlan}
              resetDone={resetDone}
            />
          </div>
        ) : (
          <div id="exercise-list" className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft size={20} />
                Voltar
              </button>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedPlan.name}
              </h2>
            </div>
            <ExerciseList
              exercises={selectedPlan.exercises}
              onAdd={() => setIsExerciseModalOpen(true)}
              onEdit={(exercise) => {
                setEditingExercise(exercise);
                setIsExerciseModalOpen(true);
              }}
              onDelete={handleDeleteExercise}
              onToggleCompletion={handleToggleExerciseCompletion}
            />
            <div className="flex justify-between">
              {/* Botão de reset */}
              <button
                onClick={resetCompleted}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Finalizar Exercícios
              </button>
              {/* Botão de Gerar PDF */}
              <button
                onClick={() => generatePdfFromHtml()}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Gerar PDF
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isSheetModalOpen}
        onClose={() => {
          setIsSheetModalOpen(false);
          setEditingSheet(null);
        }}
        title={editingSheet ? "Editar Ficha" : "Nova Ficha"}
      >
        <WorkoutSheetForm
          sheet={editingSheet}
          onSubmit={editingSheet ? handleEditSheet : handleAddSheet}
          onCancel={() => {
            setIsSheetModalOpen(false);
            setEditingSheet(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isPlanModalOpen}
        onClose={() => {
          setIsPlanModalOpen(false);
          setEditingPlan(null);
        }}
        title={editingPlan ? "Editar Plano" : "Novo Plano"}
      >
        <WorkoutPlanForm
          plan={editingPlan}
          onSubmit={editingPlan ? handleEditPlan : handleAddPlan}
          onCancel={() => {
            setIsPlanModalOpen(false);
            setEditingPlan(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isExerciseModalOpen}
        onClose={() => {
          setIsExerciseModalOpen(false);
          setEditingExercise(null);
        }}
        title={editingExercise ? "Editar Exercício" : "Novo Exercício"}
      >
        <ExerciseForm
          exercise={editingExercise}
          onSubmit={editingExercise ? handleEditExercise : handleAddExercise}
          onCancel={() => {
            setIsExerciseModalOpen(false);
            setEditingExercise(null);
          }}
        />
      </Modal>
    </div>
  );
}
