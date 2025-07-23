import React from 'react';
import { useState } from 'react';
import { useGoals } from './hooks/useGoals';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import './index.css';

function App() {
  const { goals, loading, error, addGoal, updateGoal, deleteGoal } = useGoals();
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleAddGoal = async (goalData) => {
    await addGoal(goalData);
  };

  const handleUpdateGoal = async (id, updates) => {
    await updateGoal(id, updates);
    setSelectedGoal(null);
  };

  const handleDeleteGoal = async (id) => {
    await deleteGoal(id);
  };

  const handleDeposit = async (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    const newAmount = Number(goal.savedAmount) + Number(amount);
    await updateGoal(goalId, { savedAmount: newAmount });
  };

  if (loading) return <div className="loading">Loading goals...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <header>
        <h1>Smart Goal Planner</h1>
      </header>
      
      <main>
        <Overview goals={goals} />
        
        <div className="management-section">
          <div className="forms-container">
            <GoalForm 
              onSubmit={selectedGoal ? 
                (data) => handleUpdateGoal(selectedGoal.id, data) : 
                handleAddGoal}
              initialData={selectedGoal || {
                name: '',
                targetAmount: '',
                category: 'Travel',
                deadline: ''
              }}
              onCancel={() => setSelectedGoal(null)}
            />
            
            <DepositForm 
              goals={goals.filter(g => g.savedAmount < g.targetAmount)} 
              onSubmit={handleDeposit} 
            />
          </div>
          
          <GoalList 
            goals={goals} 
            onEdit={setSelectedGoal} 
            onDelete={handleDeleteGoal} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;