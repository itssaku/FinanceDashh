import { useEffect, useState } from "react";
import "../styles/Insights.css";

function Insights() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  let totalIncome = 0;
  let totalExpense = 0;
  const categoryTotals = {};

  transactions.forEach((tx) => {
    if (tx.type === "income") {
      totalIncome += tx.amount;
    } else {
      totalExpense += tx.amount;
      categoryTotals[tx.category] =
        (categoryTotals[tx.category] || 0) + tx.amount;
    }
  });

  const savings = totalIncome - totalExpense;

  const total = totalIncome + totalExpense;
  const incomePercent = total ? (totalIncome / total) * 100 : 0;

  // Top categories
  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const highestCategory = topCategories[0]?.[0] || "N/A";

  return (
    <div className="container-fluid mt-4 px-4">

      <h2 className="mb-4 fw-bold">Insights</h2>

      {/* TOP CARDS */}
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card premium-card income-card p-4">
            <p>💰 Income</p>
            <h3>₹{totalIncome}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card premium-card expense-card p-4">
            <p>📉 Expense</p>
            <h3>₹{totalExpense}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card premium-card savings-card p-4">
            <p>💸 Savings</p>
            <h3>₹{savings}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card premium-card category-card p-4">
            <p>🏆 Top Category</p>
            <h3>{highestCategory}</h3>
          </div>
        </div>

      </div>

      {/* INCOME VS EXPENSE */}
      <div className="card mt-4 p-4 premium-card">
        <h6 className="mb-3">📊 Income vs Expense</h6>

        <div className="progress premium-progress">
          <div
            className="progress-bar bg-success"
            style={{ width: `${incomePercent}%` }}
          ></div>
        </div>

        <small className="text-muted">
          Income: {incomePercent.toFixed(1)}%
        </small>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <div className="card mt-4 p-4 premium-card">
        <h6 className="mb-3">🔥 Spending Breakdown</h6>

        {topCategories.map(([cat, amt], index) => {
          const percent = (amt / totalExpense) * 100;

          return (
            <div key={index} className="mb-3">

              <div className="d-flex justify-content-between">
                <span>{cat}</span>
                <strong>₹{amt}</strong>
              </div>

              <div className="progress small-progress mt-1">
                <div
                  className="progress-bar bg-primary"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

            </div>
          );
        })}
      </div>

      {/* SMART INSIGHTS */}
      <div className="card mt-4 p-4 premium-card">
        <h6 className="mb-3">💡 Smart Insights</h6>

        <ul>
          <li>You spend the most on <strong>{highestCategory}</strong></li>

          <li>
            {savings < 0
              ? "⚠ You are overspending"
              : "💰 Great! You are saving well"}
          </li>

          <li>
            {totalExpense > totalIncome * 0.7
              ? "High expense ratio — consider budgeting"
              : "Healthy financial balance"}
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Insights;