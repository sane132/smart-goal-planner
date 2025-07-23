
import GoalItem from './GoalItem';

export default function GoalList({ goals, onEdit, onDelete }) {
  return (
    <section className="goal-list">
      <h2>Your Savings Goals</h2>
      {goals.length === 0 ? (
        <p className="empty-message">No goals found. Add your first savings goal!</p>
      ) : (
        <div className="goals-grid">
          {goals.map(goal => (
            <GoalItem 
              key={goal.id} 
              goal={goal} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </section>
  );
}