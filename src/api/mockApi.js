// src/api/mockApi.js
let goals = [
  {
    id: "1",
    name: "Travel Fund - Japan",
    targetAmount: 5000,
    savedAmount: 3200,
    category: "Travel",
    deadline: "2025-12-31",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 10000,
    savedAmount: 7500,
    category: "Emergency",
    deadline: "2026-06-30",
    createdAt: "2023-05-01"
  },
  {
    id: "3",
    name: "New Laptop",
    targetAmount: 1500,
    savedAmount: 1500,
    category: "Electronics",
    deadline: "2024-07-20",
    createdAt: "2024-03-10"
  }
];

export const fetchGoals = async () => [...goals];

export const addGoal = async (goal) => {
  const newGoal = { 
    ...goal, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0]
  };
  goals.push(newGoal);
  return newGoal;
};

export const updateGoal = async (id, updates) => {
  goals = goals.map(g => g.id === id ? { ...g, ...updates } : g);
  return goals.find(g => g.id === id);
};

export const deleteGoal = async (id) => {
  goals = goals.filter(g => g.id !== id);
  return id;
};