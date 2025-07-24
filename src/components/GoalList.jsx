import GoalItem from './GoalItem';

function GoalList({ goals, deleteGoal, setSelectedGoal }) {
  return (
    <div className="goal-list">
      <h2>Your Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Add your first goal!</p>
      ) : (
        <div className="goals-container">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              deleteGoal={deleteGoal}
              setSelectedGoal={setSelectedGoal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalList;