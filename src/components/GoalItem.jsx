import axios from 'axios'
import ProgressBar from './ProgressBar'

export default function GoalItem({ goal, refreshGoals }) {
  const handleDeposit = async (amount) => {
    await axios.patch(`http://localhost:3000/goals/${goal.id}`, {
      savedAmount: goal.savedAmount + Number(amount)
    })
    refreshGoals()
  }

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/goals/${goal.id}`)
    refreshGoals()
  }

  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      <p>Target: ${goal.targetAmount}</p>
      <p>Saved: ${goal.savedAmount}</p>
      <ProgressBar 
        current={goal.savedAmount} 
        target={goal.targetAmount} 
      />
      <input
        type="number"
        placeholder="Deposit amount"
        onBlur={(e) => handleDeposit(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}import axios from 'axios'
import ProgressBar from './ProgressBar'
import { useState } from 'react'

export default function GoalItem({ goal, refreshGoals }) {
  const [depositAmount, setDepositAmount] = useState('')

  const handleDeposit = async (e) => {
    e.preventDefault()
    if (!depositAmount || isNaN(depositAmount)) return
    
    await axios.patch(`http://localhost:3000/goals/${goal.id}`, {
      savedAmount: goal.savedAmount + Number(depositAmount)
    })
    setDepositAmount('')
    refreshGoals()
  }

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/goals/${goal.id}`)
    refreshGoals()
  }

  // Deadline calculations
  const daysRemaining = Math.ceil(
    (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  )
  
  const deadlineClass = 
    daysRemaining < 0 ? 'overdue' :
    daysRemaining <= 30 ? 'warning' :
    ''

  return (
    <div className="goal-card">
      <div className="goal-header">
        <h3>{goal.name}</h3>
        <span className={`deadline ${deadlineClass}`}>
          {daysRemaining > 0 
            ? `${daysRemaining} days remaining`
            : 'Overdue!'}
        </span>
      </div>
      <p>Category: {goal.category}</p>
      <p>Target: ${goal.targetAmount.toLocaleString()}</p>
      <p>Saved: ${goal.savedAmount.toLocaleString()}</p>
      
      <ProgressBar 
        current={goal.savedAmount} 
        target={goal.targetAmount} 
      />
      
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          placeholder="Deposit amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button type="submit">Add Deposit</button>
      </form>
      
      <button 
        onClick={handleDelete}
        style={{ backgroundColor: '#e74c3c', marginTop: '10px' }}
      >
        Delete Goal
      </button>
    </div>
  )
}