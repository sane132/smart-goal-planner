function GoalItem({ goal, deleteGoal, setSelectedGoal }) {
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const today = new Date();
  const deadline = new Date(goal.deadline);
  const timeDiff = deadline - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  let status = '';
  if (goal.savedAmount >= goal.targetAmount) {
    status = 'Completed';
  } else if (daysLeft < 0) {
    status = 'Overdue';
  } else if (daysLeft <= 30) {
    status = 'Urgent';
  }

  return (
    <div className={`goal-item ${status.toLowerCase()}`}>
      <div className="goal-header">
        <h3>{goal.name}</h3>
        <span className="category">{goal.category}</span>
        {status && <span className={`status ${status.toLowerCase()}`}>{status}</span>}
      </div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${Math.min(progress, 100)}%` }}></div>
      </div>
      <div className="goal-details">
        <p>${goal.savedAmount} of ${goal.targetAmount} saved ({Math.round(progress)}%)</p>
        <p>Days left: {daysLeft > 0 ? daysLeft : 'Past deadline'}</p>
      </div>
      <div className="goal-actions">
        <button onClick={() => setSelectedGoal(goal)}>Edit</button>
        <button onClick={() => deleteGoal(goal.id)}>Delete</button>
      </div>
    </div>
  );
}

export default GoalItem;