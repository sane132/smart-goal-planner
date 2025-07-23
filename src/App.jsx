import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'; // Make sure this file exists

function App() {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch goals from JSON server
  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/goals');
        if (!response.ok) throw new Error('Failed to fetch goals');
        const data = await response.json();
        setGoals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  // Add new goal
  const handleAddGoal = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to add goal');
      
      const newGoal = await response.json();
      setGoals([...goals, newGoal]);
      setFormData({ name: '', targetAmount: '', category: 'Travel', deadline: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Make deposit to goal
  const handleDeposit = async (goalId, amount) => {
    if (!amount || isNaN(amount)) return;
    
    setIsLoading(true);
    try {
      const goal = goals.find(g => g.id === goalId);
      const updatedAmount = goal.savedAmount + Number(amount);
      
      const response = await fetch(`http://localhost:3000/goals/${goalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedAmount: updatedAmount })
      });
      
      if (!response.ok) throw new Error('Failed to update goal');
      
      setGoals(goals.map(g => 
        g.id === goalId ? { ...g, savedAmount: updatedAmount } : g
      ));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete goal
  const handleDelete = async (goalId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/goals/${goalId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete goal');
      
      setGoals(goals.filter(g => g.id !== goalId));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      
      {/* Add Goal Form */}
      <form onSubmit={handleAddGoal} className="goal-form">
        <input
          type="text"
          placeholder="Goal name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Target amount"
          value={formData.targetAmount}
          onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
          required
          min="1"
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="Travel">Travel</option>
          <option value="Emergency">Emergency</option>
          <option value="Education">Education</option>
          <option value="Home">Home</option>
        </select>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      {/* Goals List */}
      <div className="goals-container">
        {goals.length === 0 ? (
          <p>No goals yet. Add your first goal above!</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className="goal-card">
              <h3>{goal.name}</h3>
              <p>Category: {goal.category}</p>
              <p>Target: ${goal.targetAmount.toLocaleString()}</p>
              <p>Saved: ${goal.savedAmount.toLocaleString()}</p>
              <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
              
              {/* Progress Bar */}
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{
                    width: `${Math.min(100, (goal.savedAmount / goal.targetAmount) * 100)}%`
                  }}
                ></div>
              </div>
              
              {/* Deposit Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDeposit(goal.id, e.target.elements.deposit.value);
                  e.target.reset();
                }}
                className="deposit-form"
              >
                <input
                  type="number"
                  name="deposit"
                  placeholder="Deposit amount"
                  min="1"
                  required
                />
                <button type="submit">Add Deposit</button>
              </form>
              
              <button 
                onClick={() => handleDelete(goal.id)}
                className="delete-btn"
              >
                Delete Goal
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;