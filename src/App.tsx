import React, { useEffect, useState } from "react";
import { WorkoutPlan } from "./types/workout";
import { WorkoutForm } from "./components/WorkoutForm";
import { WorkoutCard } from "./components/WorkoutCard";
import { Plus, Dumbbell } from "lucide-react";
import { useWorkouts } from "./hooks/useWorkouts";
import { DeleteButton } from "./components/DeleteButton";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";

function App() {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkouts();
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(
    null
  );
  const [editingWorkout, setEditingWorkout] = useState<WorkoutPlan | null>(
    null
  );

  useEffect(() => {
    if (selectedWorkout) {
      console.log("selectedWorkout atualizado:", selectedWorkout);
    }
  }, [selectedWorkout]);

  const handleSaveWorkout = (workout: WorkoutPlan) => {
    if (editingWorkout) {
      updateWorkout(workout);
      setEditingWorkout(null);
      Swal.fire({
        icon: "success",
        title: "Treino atualizado!",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      addWorkout(workout);
      Swal.fire({
        icon: "success",
        title: "Treino Criado!",
        showConfirmButton: false,
        timer: 1500
      });
    }
    setShowForm(false);
  };

  const handleEditWorkout = (workout: WorkoutPlan) => {
    setEditingWorkout(workout);
    setSelectedWorkout(null);
    setShowForm(true);
  };

  const handleWorkoutClick = (workout: WorkoutPlan) => {
    setSelectedWorkout(workout);
  };

  const handleDeleteWorkout = (workoutId: string) => {
    deleteWorkout(workoutId);
    if (selectedWorkout?.id === workoutId) {
      setSelectedWorkout(null);
    }
  };

  const handleExerciseToggle = (exerciseId: string) => {
    if (selectedWorkout) {
      const updatedExercises = selectedWorkout.exercises.map((exercise) =>
        exercise.id === exerciseId
          ? { ...exercise, completed: !exercise.completed }
          : exercise
      );
      const updatedWorkout = {
        ...selectedWorkout,
        exercises: updatedExercises,
      };
      updateWorkout(updatedWorkout);
      setSelectedWorkout(updatedWorkout);
    }
  };

  const handleResetExercises = () => {
    if (selectedWorkout) {
      const updatedExercises = selectedWorkout.exercises.map((exercise) => ({
        ...exercise,
        completed: false,
      }));
      const updatedWorkout = {
        ...selectedWorkout,
        exercises: updatedExercises,
      };
      updateWorkout(updatedWorkout);
      setSelectedWorkout(updatedWorkout);
    }
    setSelectedWorkout(null);
  };

  const generatePdf = async () => {
    try {
      const element = document.getElementById("workoutDetails");
      if (element) {
        console.log("Elemento encontrado, gerando PDF...");
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        console.log("Salvando PDF...");
        pdf.save(`${selectedWorkout?.name || "workout"}.pdf`);
      } else {
        console.error("Elemento não encontrado");
      }
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Meus Treinos</h1>
            </div>
            <button
              onClick={() => {
                setEditingWorkout(null);
                setShowForm(true);
              }}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Treino
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {showForm ? (
          <WorkoutForm
            onSave={handleSaveWorkout}
            initialWorkout={editingWorkout || undefined}
            onCancel={() => {
              setShowForm(false);
              setEditingWorkout(null);
            }}
          />
        ) : selectedWorkout ? (
          <div className="space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedWorkout(null)}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                ← Voltar
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditWorkout(selectedWorkout)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Editar
                </button>
                <DeleteButton
                  onDelete={() => handleDeleteWorkout(selectedWorkout.id)}
                />
              </div>
            </div>

            <div id="workoutDetails" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedWorkout.name}
              </h2>
              {selectedWorkout.description && (
                <p className="text-gray-600 mb-6">
                  {selectedWorkout.description}
                </p>
              )}

              <div className="space-y-4">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={!!exercise.completed}
                        onChange={() => handleExerciseToggle(exercise.id)}
                        className="form-checkbox"
                      />

                      <span className="bg-purple-100 text-purple-600 font-medium rounded-full w-8 h-8 flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-medium text-lg">{exercise.name}</h3>
                        <p className="text-gray-600">
                          {exercise.sets} séries x {exercise.reps} repetições
                          {exercise.weight && ` • ${exercise.weight}`}
                        </p>
                        {exercise.notes && (
                          <p className="text-sm text-gray-500 mt-1">
                            {exercise.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
           <div className="text-center">
           <button
              onClick={handleResetExercises}
              className="mt-6 bg-red-600 text-white py-2 px-4 text-center mx-auto rounded-md hover:bg-red-700"
            >
              {" "}
              Finalizar e Resetar{" "}
            </button>

            <button
              onClick={generatePdf}
              className="mt-6 ml-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {" "}
              Gerar PDF{" "}
            </button>
           </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum treino cadastrado
                </h3>
                <p className="text-gray-500">
                  Clique em "Novo Treino" para começar
                </p>
              </div>
            ) : (
              workouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  onClick={handleWorkoutClick}
                  onDelete={handleDeleteWorkout}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
