import { WorkoutSheet } from "../types/workout";

export const workoutSheets: WorkoutSheet[] = [
    {
      id: "ws1",
      name: "Plano de Treino A",
      description: "Plano de treino para ganho de massa muscular.",
      createdAt: "2024-12-01T08:30:00Z",
      plans: [
        {
          id: "wp1",
          name: "Treino de Peito e Tríceps",
          exercises: [
            {
              id: "ex1",
              name: "Supino Reto",
              sets: 4,
              reps: 8,
              weight: 80,
              notes: "Focar na forma e na execução"
            },
            {
              id: "ex2",
              name: "Crossover",
              sets: 3,
              reps: 12,
              weight: 40,
              notes: "Executar devagar e com controle"
            },
            {
              id: "ex3",
              name: "Tríceps Testa",
              sets: 4,
              reps: 10,
              weight: 25,
              notes: "Manter os cotovelos fixos"
            }
          ]
        },
        {
          id: "wp2",
          name: "Treino de Costas e Bíceps",
          exercises: [
            {
              id: "ex4",
              name: "Puxada na Barra Fixa",
              sets: 4,
              reps: 6,
              weight: 0,
              notes: "Focar na amplitude do movimento"
            },
            {
              id: "ex5",
              name: "Remada Curvada",
              sets: 4,
              reps: 8,
              weight: 70,
              notes: "Evitar curvar a coluna"
            },
            {
              id: "ex6",
              name: "Rosca Direta",
              sets: 3,
              reps: 10,
              weight: 22.5,
              notes: "Manter os cotovelos fixos"
            }
          ]
        }
      ]
    },
    {
      id: "ws2",
      name: "Plano de Treino B",
      description: "Plano de treino para definição muscular.",
      createdAt: "2024-12-05T09:00:00Z",
      plans: [
        {
          id: "wp3",
          name: "Treino de Pernas",
          exercises: [
            {
              id: "ex7",
              name: "Agachamento Livre",
              sets: 5,
              reps: 10,
              weight: 100,
              notes: "Fazer agachamento profundo"
            },
            {
              id: "ex8",
              name: "Leg Press",
              sets: 4,
              reps: 12,
              weight: 180,
              notes: "Evitar travar os joelhos"
            },
            {
              id: "ex9",
              name: "Cadeira Extensora",
              sets: 4,
              reps: 15,
              weight: 60,
              notes: "Controlar o movimento"
            }
          ]
        },
        {
          id: "wp4",
          name: "Treino de Ombros e Abdômen",
          exercises: [
            {
              id: "ex10",
              name: "Desenvolvimento com Halteres",
              sets: 4,
              reps: 8,
              weight: 25,
              notes: "Manter a postura"
            },
            {
              id: "ex11",
              name: "Elevação Lateral",
              sets: 3,
              reps: 12,
              weight: 12.5,
              notes: "Evitar movimentos rápidos"
            },
            {
              id: "ex12",
              name: "Abdominais na Bola Suíça",
              sets: 4,
              reps: 20,
              weight: 0,
              notes: "Manter a contração muscular"
            }
          ]
        }
      ]
    }
  ];
  