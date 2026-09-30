import React from 'react';

export default function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  if (expenses.length === 0) {
    return <p style={{ textAlign: 'center', color: '#777' }}>No expenses found.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id} className="expense-item">
          <div className="expense-details">
            <strong>{expense.title}</strong> - ${expense.amount.toFixed(2)}
            <span>[{expense.category}]</span>
            <span>({expense.date})</span>
          </div>
          <div className="actions">
            <button className="btn-edit" onClick={() => onEditExpense(expense)}>
              Edit
            </button>
            <button className="btn-delete" onClick={() => onDeleteExpense(expense.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}