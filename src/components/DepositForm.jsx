import { useState } from 'react';

function DepositForm({ goals, makeDeposit }) {
  const [depositData, setDepositData] = useState({
    goalId: '',
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepositData({
      ...depositData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!depositData.goalId || !depositData.amount) return;
    
    makeDeposit(depositData.goalId, depositData.amount);
    setDepositData({
      goalId: '',
      amount: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h2>Make a Deposit</h2>
      <div className="form-group">
        <label>Select Goal:</label>
        <select
          name="goalId"
          value={depositData.goalId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Goal --</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.savedAmount}/${goal.targetAmount})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Amount ($):</label>
        <input
          type="number"
          name="amount"
          value={depositData.amount}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;