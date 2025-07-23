const API_BASE_URL = 'http://localhost:3000/goals';

export const fetchGoals = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch goals');
  }
  return response.json();
};

export const addGoal = async (goal) => {
  const response = await fetch(API_BASE_URL, {
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
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH', // Use PATCH for partial updates (e.g., just savedAmount)
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
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete goal');
  }
  return response.json(); // json-server returns {} for successful DELETE
};