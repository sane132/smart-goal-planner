// src/components/OverviewDashboard.js
import React from 'react';
import './../styles/OverviewDashboard.css';

function OverviewDashboard({ goals }) {
    const totalGoals = goals.length;
    const totalMoneySaved = goals.reduce((acc, goal) => acc + goal.savedAmount, 0);
    const completedGoals = goals.filter((goal) => goal.savedAmount >= goal.targetAmount).length;

    const today = new Date();
    const upcomingWarnings = goals.filter(goal => {
        const deadlineDate = new Date(goal.deadline);
        const timeDiff = deadlineDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return !goal.savedAmount >= goal.targetAmount && daysRemaining <= 30 && daysRemaining > 0;
    });

    const overdueGoals = goals.filter(goal => {
        const deadlineDate = new Date(goal.deadline);
        const timeDiff = deadlineDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return !goal.savedAmount >= goal.targetAmount && daysRemaining <= 0;
    });

    return (
        <div className="overview-dashboard">
            <h2>Savings Overview</h2>
            <div className="overview-stats">
                <div className="stat-item">
                    <h3>Total Goals</h3>
                    <p>{totalGoals}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Money Saved</h3>
                    <p>${totalMoneySaved.toLocaleString()}</p>
                </div>
                <div className="stat-item">
                    <h3>Goals Completed</h3>
                    <p>{completedGoals}</p>
                </div>
            </div>

            {upcomingWarnings.length > 0 && (
                <div className="overview-warnings">
                    <h3>Upcoming Deadlines (Within 30 Days)</h3>
                    <ul>
                        {upcomingWarnings.map(goal => {
                            const deadlineDate = new Date(goal.deadline);
                            const timeDiff = deadlineDate.getTime() - today.getTime();
                            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                            return (
                                <li key={goal.id}>
                                    <strong>{goal.name}:</strong> {daysRemaining} days left! (${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()})
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {overdueGoals.length > 0 && (
                <div className="overview-overdue">
                    <h3>Overdue Goals</h3>
                    <ul>
                        {overdueGoals.map(goal => (
                            <li key={goal.id}>
                                <strong>{goal.name}:</strong> Deadline passed! (${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default OverviewDashboard;