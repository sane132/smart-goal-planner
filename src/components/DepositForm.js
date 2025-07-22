// src/components/DepositForm.js
import React, { useState } from 'react';
import './../styles/DepositForm.css';

function DepositForm({ goals, onDeposit }) {
    const [depositAmount, setDepositAmount] = useState('');
    const [selectedGoalId, setSelectedGoalId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!selectedGoalId) {
            setError('Please select a goal.');
            return;
        }

        const amount = parseFloat(depositAmount);
        if (isNaN(amount) || amount <= 0) {
            setError('Deposit amount must be a positive number.');
            return;
        }

        onDeposit(selectedGoalId, amount);
        setDepositAmount('');
        setSelectedGoalId('');
    };

    return (
        <form onSubmit={handleSubmit} className="deposit-form">
            {error && <p className="form-error">{error}</p>}
            <div className="form-group">
                <label htmlFor="depositAmount">Amount:</label>
                <input
                    type="number"
                    id="depositAmount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Enter amount to deposit"
                    min="1"
                />
            </div>
            <div className="form-group">
                <label htmlFor="selectGoal">Select Goal:</label>
                <select
                    id="selectGoal"
                    value={selectedGoalId}
                    onChange={(e) => setSelectedGoalId(e.target.value)}
                >
                    <option value="">-- Select a Goal --</option>
                    {goals.map((goal) => (
                        <option key={goal.id} value={goal.id}>
                            {goal.name} (${goal.savedAmount} / ${goal.targetAmount})
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Make Deposit</button>
        </form>
    );
}

export default DepositForm;