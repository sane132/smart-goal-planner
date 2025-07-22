// src/components/GoalForm.js
import React, { useState, useEffect } from 'react';
import './../styles/GoalForm.css';

function GoalForm({ onSubmit, initialData = null, onCancel }) {
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [category, setCategory] = useState('Travel'); // Default category
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setTargetAmount(initialData.targetAmount);
            setCategory(initialData.category);
            setDeadline(initialData.deadline);
        } else {
            // Reset form when not in edit mode
            setName('');
            setTargetAmount('');
            setCategory('Travel');
            setDeadline('');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name || !targetAmount || !category || !deadline) {
            setError('All fields are required.');
            return;
        }

        const amount = parseFloat(targetAmount);
        if (isNaN(amount) || amount <= 0) {
            setError('Target amount must be a positive number.');
            return;
        }

        onSubmit({ name, targetAmount: amount, category, deadline });

        // Clear form only if not in edit mode
        if (!initialData) {
            setName('');
            setTargetAmount('');
            setCategory('Travel');
            setDeadline('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="goal-form">
            {error && <p className="form-error">{error}</p>}
            <div className="form-group">
                <label htmlFor="name">Goal Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Travel Fund - Japan"
                />
            </div>
            <div className="form-group">
                <label htmlFor="targetAmount">Target Amount ($):</label>
                <input
                    type="number"
                    id="targetAmount"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="e.g., 5000"
                    min="1"
                />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Travel">Travel</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Education">Education</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Home">Home</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="deadline">Deadline:</label>
                <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>
            <div className="form-actions">
                <button type="submit">{initialData ? 'Update Goal' : 'Add Goal'}</button>
                {initialData && <button type="button" onClick={onCancel}>Cancel</button>}
            </div>
        </form>
    );
}

export default GoalForm;