// src/api/api.js
const API_BASE_URL = import.meta.env.PROD
  ? 'https://your-render-app.onrender.com'
  : 'http://localhost:3000';

export const fetchGoals = async () => {
  const response = await fetch(`${API_BASE_URL}/goals`);
  if (!response.ok) throw new Error('Failed to fetch goals');
  return response.json();
};

export const addGoal = async (goal) => {
  const response = await fetch(`${API_BASE_URL}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal)
  });
  if (!response.ok) throw new Error('Failed to add goal');
  return response.json();
};

export const updateGoal = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update goal');
  return response.json();
};

export const deleteGoal = async (id) => {
  const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete goal');
  return id;
};