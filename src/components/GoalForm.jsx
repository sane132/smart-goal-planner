
import { useState, useEffect } from 'react';

export default function GoalForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState(initialData);
  
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      targetAmount: Number(formData.targetAmount),
      category: formData.category,
      deadline: formData.deadline
    });
    if (!initialData.id) {
      setFormData(initialData);
    }
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h2>{initialData.id ? 'Edit Goal' : 'Add New Goal'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Goal Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="targetAmount">Target Amount ($)</label>
        <input
          id="targetAmount"
          type="number"
          name="targetAmount"
          min="1"
          value={formData.targetAmount}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
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
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>
      
      <div className="form-actions">
        <button type="submit">{initialData.id ? 'Update' : 'Add'} Goal</button>
        {initialData.id && (
          <button type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}