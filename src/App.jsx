import React, { useEffect, useState } from 'react';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/goals')
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error('Failed to fetch goals:', err));
  }, []);

  return (
    <div>
      <h1>My Goals</h1>

      {Array.isArray(goals) && goals.length > 0 ? (
        goals.map((goal) => (
          <div key={goal.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <h2>{goal.name}</h2>
            <p>Category: {goal.category}</p>
            <p>Target Amount: ${goal.targetAmount?.toLocaleString?.()}</p>
            <p>Saved Amount: ${goal.savedAmount?.toLocaleString?.()}</p>
            <p>Deadline: {new Date(goal.deadline)?.toLocaleDateString?.()}</p>
            <p>Created: {new Date(goal.createdAt)?.toLocaleDateString?.()}</p>
          </div>
        ))
      ) : (
        <p>Loading or no goals found...</p>
      )}
    </div>
  );
  fetch('/goals')
    .then((response) => response.json())
    .then((data) => setGoals(data))
    .catch((error) => console.error('Error fetching goals:', error));
}

export default App;
