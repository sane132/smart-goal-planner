
import { formatDistanceToNow } from 'date-fns';

export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;
  
  const today = new Date();
  const urgentGoals = goals.filter(goal => {
    if (goal.savedAmount >= goal.targetAmount) return false;
    const deadline = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft >= 0;
  });

  const overdueGoals = goals.filter(goal => {
    if (goal.savedAmount >= goal.targetAmount) return false;
    const deadline = new Date(goal.deadline);
    return deadline < today;
  });

  return (
    <section className="overview">
      <h2>Savings Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{totalGoals}</h3>
          <p>Total Goals</p>
        </div>
        
        <div className="stat-card">
          <h3>${totalSaved.toLocaleString()}</h3>
          <p>Total Saved</p>
        </div>
        
        <div className="stat-card">
          <h3>${totalTarget.toLocaleString()}</h3>
          <p>Total Target</p>
        </div>
        
        <div className="stat-card">
          <h3>{completedGoals}</h3>
          <p>Completed</p>
        </div>
        
        <div className="stat-card urgent">
          <h3>{urgentGoals.length}</h3>
          <p>Urgent</p>
        </div>
        
        <div className="stat-card overdue">
          <h3>{overdueGoals.length}</h3>
          <p>Overdue</p>
        </div>
      </div>
    </section>
  );
}