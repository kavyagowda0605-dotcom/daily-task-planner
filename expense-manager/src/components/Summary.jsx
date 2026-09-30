import React from 'react';

export default function Summary({ expenses }) {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="summary-card">
      <h2>Total Expenses</h2>
      <h3>${total.toFixed(2)}</h3>
    </div>
  );
}