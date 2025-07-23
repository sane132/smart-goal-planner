import { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:3000/goals');
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const response = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });
      const data = await response.json();
      setGoals([...goals, data]);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const updateGoal = async (updatedGoal) => {
    try {
      await fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      });
      setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
      setSelectedGoal(null);
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'DELETE',
      });
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const makeDeposit = async (goalId, amount) => {
    try {
      const goalToUpdate = goals.find(goal => goal.id === goalId);
      const updatedGoal = {
        ...goalToUpdate,
        savedAmount: Number(goalToUpdate.savedAmount) + Number(amount)
      };
      
      await fetch(`http://localhost:3000/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savedAmount: updatedGoal.savedAmount }),
      });
      
      setGoals(goals.map(goal => goal.id === goalId ? updatedGoal : goal));
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      <div className="dashboard">
        <Overview goals={goals} />
        <div className="goal-management">
          <div className="forms">
            <GoalForm 
              addGoal={addGoal} 
              updateGoal={updateGoal} 
              selectedGoal={selectedGoal} 
              setSelectedGoal={setSelectedGoal} 
            />
            <DepositForm goals={goals} makeDeposit={makeDeposit} />
          </div>
          <GoalList 
            goals={goals} 
            deleteGoal={deleteGoal} 
            setSelectedGoal={setSelectedGoal} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;