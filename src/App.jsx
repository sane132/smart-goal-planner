import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [goals, setGoals] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: ''
  })

  // Fetch all goals on load
  useEffect(() => {
    fetch('http://localhost:3000/goals')
      .then(res => res.json())
      .then(data => setGoals(data))
  }, [])

  // Add new goal
  const addGoal = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const newGoal = await response.json()
    setGoals([...goals, newGoal])
    setFormData({ name: '', targetAmount: '', category: 'Travel', deadline: '' })
  }

  // Make deposit to goal
  const addDeposit = async (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId)
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + Number(amount)
    }
    
    await fetch(`http://localhost:3000/goals/${goalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount })
    })
    
    setGoals(goals.map(g => g.id === goalId ? updatedGoal : g))
  }

  // Delete goal
  const deleteGoal = async (goalId) => {
    await fetch(`http://localhost:3000/goals/${goalId}`, {
      method: 'DELETE'
    })
    setGoals(goals.filter(g => g.id !== goalId))
  }

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      
      {/* Goal Form */}
      <form onSubmit={addGoal}>
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
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="Travel">Travel</option>
          <option value="Emergency">Emergency</option>
          <option value="Education">Education</option>
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
        {goals.map(goal => (
          <div key={goal.id} className="goal-card">
            <h3>{goal.name}</h3>
            <p>Target: ${goal.targetAmount}</p>
            <p>Saved: ${goal.savedAmount}</p>
            
            {/* Deposit Form */}
            <form onSubmit={(e) => {
              e.preventDefault()
              const amount = e.target.elements.deposit.value
              if (amount) addDeposit(goal.id, amount)
            }}>
              <input
                type="number"
                name="deposit"
                placeholder="Deposit amount"
              />
              <button type="submit">Add Deposit</button>
            </form>
            
            <button onClick={() => deleteGoal(goal.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App