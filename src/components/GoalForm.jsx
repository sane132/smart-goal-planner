import { useState, useEffect } from 'react';

function GoalForm({ addGoal, updateGoal, selectedGoal, setSelectedGoal }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: '',
  });

  useEffect(() => {
    if (selectedGoal) {
      setFormData({
        name: selectedGoal.name,
        targetAmount: selectedGoal.targetAmount,
        category: selectedGoal.category,
        deadline: selectedGoal.deadline.split('T')[0],
      });
    }
  }, [selectedGoal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      ...formData,
      targetAmount: Number(formData.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    if (selectedGoal) {
      updateGoal({ ...selectedGoal, ...goalData });
    } else {
      addGoal(goalData);
    }

    setFormData({
      name: '',
      targetAmount: '',
      category: 'Travel',
      deadline: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>{selectedGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
      <div className="form-group">
        <label>Goal Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Target Amount ($):</label>
        <input
          type="number"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
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
        </select>
      </div>
      <div className="form-group">
        <label>Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{selectedGoal ? 'Update Goal' : 'Add Goal'}</button>
      {selectedGoal && (
        <button type="button" onClick={() => setSelectedGoal(null)}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default GoalForm;