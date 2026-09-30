import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import './App.css';

export default function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Groceries', amount: 45.50, category: 'Food', date: '2026-09-01' },
    { id: 2, title: 'Bus Pass', amount: 20.00, category: 'Transport', date: '2026-09-02' },
  ]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSaveExpense = (expense) => {
    if (editingExpense) {
      setExpenses(expenses.map((e) => (e.id === expense.id ? expense : e)));
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, expense]);
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <h1>Personal Expense Manager</h1>

      <Summary expenses={filteredExpenses} />

      <ExpenseForm
        onSaveExpense={handleSaveExpense}
        editingExpense={editingExpense}
        onCancelEdit={() => setEditingExpense(null)}
      />

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <ExpenseList
        expenses={filteredExpenses}
        onDeleteExpense={handleDeleteExpense}
        onEditExpense={(expense) => setEditingExpense(expense)}
      />
    </div>
  );
}