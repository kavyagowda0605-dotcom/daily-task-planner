import React, { useState, useEffect } from 'react';

export default function ExpenseForm({ onSaveExpense, editingExpense, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    onSaveExpense({
      id: editingExpense ? editingExpense.id : Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date,
    });

    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate('');
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">{editingExpense ? 'Update' : 'Add Expense'}</button>
      {editingExpense && (
        <button type="button" onClick={onCancelEdit} style={{ backgroundColor: '#6c757d' }}>
          Cancel
        </button>
      )}
    </form>
  );
}