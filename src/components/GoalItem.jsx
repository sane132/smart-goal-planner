
import { formatDistanceToNow } from 'date-fns';

export default function GoalItem({ goal, onEdit, onDelete }) {
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  const deadline = new Date(goal.deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

  let status = '';
  if (goal.savedAmount >= goal.targetAmount) {
    status = 'Completed';
  } else if (daysLeft < 0) {
    status = 'Overdue';
  } else if (daysLeft <= 30) {
    status = 'Urgent';
  }

  return (
    <div className={`goal-card ${status.toLowerCase()}`}>
      <div className="goal-header">
        <h3>{goal.name}</h3>
        <div className="goal-meta">
          <span className="category">{goal.category}</span>
          {status && <span className={`status ${status.toLowerCase()}`}>{status}</span>}
        </div>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
          aria-label={`${progress.toFixed(0)}% complete`}
        />
      </div>
      
      <div className="goal-details">
        <p>
          <strong>Progress:</strong> ${goal.savedAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()} 
          ({progress.toFixed(0)}%)
        </p>
        <p><strong>Remaining:</strong> ${(goal.targetAmount - goal.savedAmount).toLocaleString()}</p>
        <p>
          <strong>Deadline:</strong> {formatDistanceToNow(deadline, { addSuffix: true })}
          {daysLeft > 0 && ` (${daysLeft} days left)`}
        </p>
      </div>
      
      <div className="goal-actions">
        <button onClick={() => onEdit(goal)}>Edit</button>
        <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
}