import { useState } from 'react'

export default function GoalForm({ setGoals }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    const newGoal = await response.json()
    setGoals(prev => [...prev, newGoal])
    
    // Reset form
    setFormData({
      name: '',
      targetAmount: '',
      category: 'Travel',
      deadline: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
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
  )
}