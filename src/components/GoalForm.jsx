import { useState } from 'react'
import axios from 'axios'

export default function GoalForm({ onGoalAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3000/goals', formData)
    onGoalAdded()
    setFormData({ name: '', targetAmount: '', category: 'Travel', deadline: '' })
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