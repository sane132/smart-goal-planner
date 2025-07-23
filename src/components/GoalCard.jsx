
import React from 'react';
import { calculateDaysLeft, isGoalOverdue, isDeadlineApproaching } from '../utils/dateUtils';
import './GoalCard.css'; // Create this file for GoalCard specific styling

function GoalCard({ goal, onEdit, onDelete, onDeposit }) {
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const remainingAmount = goal.targetAmount - goal.savedAmount;
  const daysLeft = calculateDaysLeft(goal.deadline);
  const overdue = isGoalOverdue(goal.deadline);
  const approachingDeadline = isDeadlineApproaching(goal.deadline);
  const completed = goal.savedAmount >= goal.targetAmount;

  const getStatusText = () => {
    if (completed) return 'Completed!';
    if (overdue) return 'Overdue!';
    if (approachingDeadline) return `Warning: ${daysLeft} days left!`;
    return `${daysLeft > 0 ? daysLeft : 0} days left`;
  };

  const getStatusClass = () => {
    if (completed) return 'status-completed';
    if (overdue) return 'status-overdue';
    if (approachingDeadline) return 'status-warning';
    return '';
  };

  return (
    <div className={`goal-card ${getStatusClass()}`}>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: ${goal.targetAmount.toLocaleString()}</p>
      <p>Saved: ${goal.savedAmount.toLocaleString()}</p>
      <p>Remaining: ${remainingAmount.toLocaleString()}</p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${Math.min(100, progress)}%` }}></div>
      </div>
      <p className="progress-text">{progress.toFixed(2)}% complete</p>
      <p className="deadline-text">Deadline: {goal.deadline} ({getStatusText()})</p>
      <div className="goal-actions">
        <button onClick={() => onEdit(goal)}>Edit</button>
        <button onClick={() => onDeposit(goal)}>Deposit</button>
        <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
}

export default GoalCard;