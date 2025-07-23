
import { useState } from 'react';

export default function DepositForm({ goals, onSubmit }) {
  const [formData, setFormData] = useState({
    goalId: '',
    amount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.goalId || !formData.amount) return;
    onSubmit(formData.goalId, formData.amount);
    setFormData({ goalId: '', amount: '' });
  };

  return (
    <form className="deposit-form" onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      
      <div className="form-group">
        <label htmlFor="goalId">Select Goal</label>
        <select
          id="goalId"
          name="goalId"
          value={formData.goalId}
          onChange={(e) => setFormData({...formData, goalId: e.target.value})}
          required
        >
          <option value="">-- Select a Goal --</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.savedAmount}/${goal.targetAmount})
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="amount">Amount ($)</label>
        <input
          id="amount"
          type="number"
          name="amount"
          min="1"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />
      </div>
      
      <button type="submit">Deposit</button>
    </form>
  );
}