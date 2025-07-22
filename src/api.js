// src/api.js
const API_BASE_URL = 'http://localhost:3000';

export const getGoals = async () => {
    const response = await fetch(`${API_BASE_URL}/goals`);
    if (!response.ok) {
        throw new Error('Failed to fetch goals');
    }
    return response.json();
};

export const addGoal = async (goal) => {
    const response = await fetch(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
    });
    if (!response.ok) {
        throw new Error('Failed to add goal');
    }
    return response.json();
};

export const updateGoal = async (id, updatedFields) => {
    const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
        throw new Error('Failed to update goal');
    }
    return response.json();
};

export const deleteGoal = async (id) => {
    const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete goal');
    }
    return response.json(); // json-server typically returns an empty object for DELETE
};