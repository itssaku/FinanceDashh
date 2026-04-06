import { useState, useEffect } from "react";
import "../styles/Transaction.css";

const data = [
  { id: 1, date: "2026-03-01", amount: 5000, category: "Education", type: "expense" },
  { id: 2, date: "2026-03-02", amount: 2000, category: "Food", type: "expense" },
  { id: 3, date: "2026-03-03", amount: 15000, category: "Rent", type: "expense" },
  { id: 4, date: "2026-03-04", amount: 8000, category: "Salary", type: "income" },
  { id: 5, date: "2026-03-05", amount: 1200, category: "Transport", type: "expense" },
  { id: 6, date: "2026-03-06", amount: 3000, category: "Shopping", type: "expense" },
  { id: 7, date: "2026-03-07", amount: 2500, category: "Health", type: "expense" },
  { id: 8, date: "2026-03-08", amount: 6000, category: "Freelance", type: "income" },
];

function Transactions({ role }) {

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : data;
  });

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // 🔥 EXPORT JSON
  const exportJSON = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.json";
    link.click();
  };

  // 🔥 EXPORT CSV
  const exportCSV = () => {
    const headers = ["Date", "Amount", "Category", "Type"];

    const rows = transactions.map(tx => [
      tx.date,
      tx.amount,
      tx.category,
      tx.type
    ]);

    const csvContent =
      headers.join(",") + "\n" +
      rows.map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
  };

  // 🔍 Filter
  let filteredData = transactions.filter((item) => {
    return (
      item.category.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "all" || item.type === filterType)
    );
  });

  // ↕ Sort
  if (sortOrder === "asc") {
    filteredData.sort((a, b) => a.amount - b.amount);
  } else if (sortOrder === "desc") {
    filteredData.sort((a, b) => b.amount - a.amount);
  }

  // ➕ Add / ✏ Edit
  const handleSubmit = (newTx) => {
    if (editData) {
      setTransactions(
        transactions.map((tx) =>
          tx.id === editData.id ? { ...tx, ...newTx } : tx
        )
      );
    } else {
      setTransactions([
        ...transactions,
        { ...newTx, id: Date.now() },
      ]);
    }

    setShowForm(false);
    setEditData(null);
  };

  return (
    //<div className="container-fluid mt-4 px-4">
      <div className="container-fluid mt-4 px-4" style={{ paddingBottom: "90px" }}>

      <h2 className="mb-4">Transactions</h2>

      {/* 🔥 EXPORT BUTTONS */}
      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-outline-primary" onClick={exportCSV}>
          Export CSV
        </button>
        <button className="btn btn-outline-success" onClick={exportJSON}>
          Export JSON
        </button>
      </div>

      {/* 🔍 Filters */}
      <div className="row mb-4 g-3">

        <div className="col-12 col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-3">
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="col-12 col-md-3">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort by Amount</option>
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </div>

      </div>

      {/* Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                {role === "admin" && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td className={item.type === "income" ? "text-success" : "text-danger"}>
                    ₹{item.amount}
                  </td>
                  <td>{item.category}</td>
                  <td>{item.type}</td>

                  {role === "admin" && (
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                          setEditData(item);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Add Button */}
      {role === "admin" && (
        <button
          className="btn btn-primary mt-4"
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
        >
          + Add Transaction
        </button>
      )}

      

      {/* 🔥 MODAL (FIXED) */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h5>{editData ? "Edit" : "Add"} Transaction</h5>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                handleSubmit({
                  date: formData.get("date"),
                  amount: Number(formData.get("amount")),
                  category: formData.get("category"),
                  type: formData.get("type"),
                });
              }}
            >

              <input name="date" type="date" defaultValue={editData?.date || ""} className="form-control mb-2" required />
              <input name="amount" type="number" defaultValue={editData?.amount || ""} className="form-control mb-2" required />

              <select name="category" defaultValue={editData?.category || ""} className="form-select mb-2" required>
                <option value="">Select Category</option>
                <option>Food</option>
                <option>Rent</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Health</option>
                <option>Education</option>
              </select>

              <select name="type" defaultValue={editData?.type || ""} className="form-select mb-3" required>
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <button className="btn btn-success me-2">
                {editData ? "Update" : "Add"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Transactions;