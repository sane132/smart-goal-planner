// src/components/GoalCard.js
import React from 'react';
import './../styles/GoalCard.css';

function GoalCard({ goal, onDelete, onEdit }) {
    const { id, name, targetAmount, savedAmount, category, deadline } = goal;

    const remainingAmount = targetAmount - savedAmount;
    const progressPercentage = (savedAmount / targetAmount) * 100;
    const isComplete = savedAmount >= targetAmount;

    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    let statusClass = '';
    let statusText = '';

    if (isComplete) {
        statusClass = 'goal-complete';
        statusText = 'Completed!';
    } else if (daysRemaining <= 30 && daysRemaining > 0) {
        statusClass = 'goal-warning';
        statusText = `${daysRemaining} days left!`;
    } else if (daysRemaining <= 0) { // Current time is July 22, 2025
        statusClass = 'goal-overdue';
        statusText = 'Overdue!';
    } else {
        statusText = `${daysRemaining} days left`;
    }


    return (
        <div className={`goal-card ${statusClass}`}>
            <h3>{name}</h3>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Target:</strong> ${targetAmount.toLocaleString()}</p>
            <p><strong>Saved:</strong> ${savedAmount.toLocaleString()}</p>
            <p><strong>Remaining:</strong> ${remainingAmount.toLocaleString()}</p>
            <p><strong>Deadline:</strong> {deadline} ({statusText})</p>

            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${Math.min(100, progressPercentage)}%` }}
                ></div>
            </div>
            <span className="progress-percentage">{Math.round(progressPercentage)}%</span>

            <div className="goal-actions">
                <button onClick={() => onEdit(goal)} className="edit-btn">Edit</button>
                <button onClick={() => onDelete(id)} className="delete-btn">Delete</button>
            </div>
        </div>
    );
}

export default GoalCard;