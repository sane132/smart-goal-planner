function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  const today = new Date();

  const urgentGoals = goals.filter(goal => {
    if (goal.savedAmount >= goal.targetAmount) return false;
    const deadline = new Date(goal.deadline);
    const timeDiff = deadline - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft >= 0;
  });

  const overdueGoals = goals.filter(goal => {
    if (goal.savedAmount >= goal.targetAmount) return false;
    const deadline = new Date(goal.deadline);
    return deadline < today;
  });

  return (
    <div className="overview">
      <h2>Savings Overview</h2>
      <div className="stats">
        <div className="stat-item">
          <h3>{totalGoals}</h3>
          <p>Total Goals</p>
        </div>
        <div className="stat-item">
          <h3>${totalSaved.toLocaleString()}</h3>
          <p>Total Saved</p>
        </div>
        <div className="stat-item">
          <h3>{completedGoals}</h3>
          <p>Goals Completed</p>
        </div>
        <div className="stat-item">
          <h3>{urgentGoals.length}</h3>
          <p>Urgent Goals</p>
        </div>
        <div className="stat-item">
          <h3>{overdueGoals.length}</h3>
          <p>Overdue Goals</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;