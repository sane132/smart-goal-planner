// GoalItem.jsx
export default function GoalItem({ goal, setGoals }) {
  const [depositAmount, setDepositAmount] = useState('')

  const handleDeposit = async (e) => {
    e.preventDefault()
    if (!depositAmount) return

    await fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        savedAmount: goal.savedAmount + Number(depositAmount)
      })
    })
    
    setGoals(prev => prev.map(g => 
      g.id === goal.id 
        ? {...g, savedAmount: g.savedAmount + Number(depositAmount)} 
        : g
    ))
    setDepositAmount('')
  }

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: 'DELETE'
    })
    setGoals(prev => prev.filter(g => g.id !== goal.id))
  }

  return (
    <div className="goal-item">
      <h3>{goal.name}</h3>
      <p>Target: ${goal.targetAmount}</p>
      <p>Saved: ${goal.savedAmount}</p>
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          placeholder="Deposit amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button type="submit">Add Deposit</button>
      </form>
      <button onClick={handleDelete}>Delete Goal</button>
    </div>
  )
}