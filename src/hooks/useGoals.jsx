import { useState, useEffect } from 'react';

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3000/goals';

  const fetchGoals = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const addGoal = async (goal) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...goal,
          savedAmount: 0,
          createdAt: new Date().toISOString().split('T')[0]
        })
      });
      const data = await response.json();
      setGoals(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateGoal = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await response.json();
      setGoals(prev => prev.map(g => g.id === id ? data : g));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteGoal = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setGoals(prev => prev.filter(g => g.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { goals, loading, error, fetchGoals, addGoal, updateGoal, deleteGoal };
}