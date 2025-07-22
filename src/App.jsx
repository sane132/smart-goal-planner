import { useState, useEffect } from 'react'
import axios from 'axios'
import GoalForm from './components/GoalForm'
import GoalItem from './components/GoalItem'
import './styles.css'

function App() {
  const [goals, setGoals] = useState([])

  const fetchGoals = async () => {
    try {
      const res = await axios.get('http://localhost:3000/goals')
      setGoals(res.data)
    } catch (error) {
      console.error("Error fetching goals:", error)
    }
  }

  useEffect(() => { fetchGoals() }, [])

  // Calculate summary stats
  const totalGoals = goals.length
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const completedGoals = goals.filter(goal => 
    goal.savedAmount >= goal.targetAmount
  ).length

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      
      <div className="summary-stats">
        <h2>Summary</h2>
        <p>Total Goals: {totalGoals}</p>
        <p>Total Saved: ${totalSaved.toLocaleString()}</p>
        <p>Total Target: ${totalTarget.toLocaleString()}</p>
        <p>Completed Goals: {completedGoals}</p>
      </div>

      <GoalForm onGoalAdded={fetchGoals} />
      
      <div className="goals-container">
        {goals.length > 0 ? (
          goals.map(goal => (
            <GoalItem key={goal.id} goal={goal} refreshGoals={fetchGoals} />
          ))
        ) : (
          <p>No goals yet. Add your first goal above!</p>
        )}
      </div>
    </div>
  )
}

export default App