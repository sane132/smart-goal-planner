// src/App.js
import React, { useState, useEffect } from 'react';
import { getGoals, addGoal, updateGoal, deleteGoal } from './api';
import GoalCard from './components/GoalCard';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import OverviewDashboard from './components/OverviewDashboard';
import './styles/App.css';

function App() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingGoal, setEditingGoal] = useState(null); // State for goal being edited

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const data = await getGoals();
            setGoals(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddGoal = async (newGoal) => {
        try {
            const addedGoal = await addGoal({ ...newGoal, id: Date.now().toString(), savedAmount: 0, createdAt: new Date().toISOString().split('T')[0] });
            setGoals((prevGoals) => [...prevGoals, addedGoal]);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateGoal = async (id, updatedFields) => {
        try {
            const updated = await updateGoal(id, updatedFields);
            setGoals((prevGoals) =>
                prevGoals.map((goal) => (goal.id === id ? { ...goal, ...updated } : goal))
            );
            setEditingGoal(null); // Clear editing state after update
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteGoal = async (id) => {
        try {
            await deleteGoal(id);
            setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleMakeDeposit = async (goalId, amount) => {
        const goalToUpdate = goals.find(g => g.id === goalId);
        if (!goalToUpdate) return;

        const newSavedAmount = goalToUpdate.savedAmount + parseFloat(amount);
        try {
            const updated = await updateGoal(goalId, { savedAmount: newSavedAmount });
            setGoals((prevGoals) =>
                prevGoals.map((goal) => (goal.id === goalId ? { ...goal, ...updated } : goal))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="loading-message">Loading goals...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="app-container">
            <h1>Smart Goal Planner</h1>

            <div className="dashboard-section">
                <OverviewDashboard goals={goals} />
            </div>

            <div className="forms-section">
                <h2>Add New Goal</h2>
                <GoalForm onSubmit={handleAddGoal} />

                <h2>Make a Deposit</h2>
                <DepositForm goals={goals} onDeposit={handleMakeDeposit} />
            </div>

            <div className="goals-list-section">
                <h2>My Goals</h2>
                {goals.length === 0 ? (
                    <p>No goals added yet. Start by adding a new goal!</p>
                ) : (
                    <div className="goals-grid">
                        {goals.map((goal) => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onDelete={handleDeleteGoal}
                                onEdit={() => setEditingGoal(goal)} // Set goal for editing
                            />
                        ))}
                    </div>
                )}
            </div>

            {editingGoal && (
                <div className="edit-modal">
                    <h3>Edit Goal: {editingGoal.name}</h3>
                    <GoalForm
                        initialData={editingGoal}
                        onSubmit={(updatedFields) => handleUpdateGoal(editingGoal.id, updatedFields)}
                        onCancel={() => setEditingGoal(null)}
                    />
                </div>
            )}
        </div>
    );
}

export default App;