import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

import "../styles/Dashboard.css";

const data = [
  { name: "Jan", balance: 20000 },
  { name: "Feb", balance: 30000 },
  { name: "Mar", balance: 25000 },
  { name: "Apr", balance: 40000 },
  { name: "May", balance: 50000 },
];

 const pieData = [
  { name: "Food", value: 4000 },
  { name: "Rent", value: 12000 },
  { name: "Transport", value: 3000 },
  { name: "Shopping", value: 5000 },
  { name: "Health", value: 2000 },
  { name: "Education", value: 3500 },
];

const COLORS = [
  "#0088FE", // Food
  "#00C49F", // Rent
  "#FFBB28", // Transport
  "#FF8042", // Shopping
  "#A28CFF", // Health
  "#FF6699", // Education
];

function Dashboard() {
  return (
    <div className="container-fluid mt-4 px-4">

      {/* Title */}
      <h2 className="mb-4">Dashboard</h2>

      {/* Summary Cards */}
     <div className="row g-4 mb-4">
        
        
          <div className="col-12 col-md-4">
          <div className="card p-4 shadow-sm">
            <h6>Total Balance</h6>
            <h3>₹50,000</h3>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card p-4 shadow-sm">
            <h6>Income</h6>
            <h3 className="text-success">₹80,000</h3>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card p-4 shadow-sm">
            <h6>Expenses</h6>
            <h3 className="text-danger">₹30,000</h3>
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="row g-4">

        {/* Line Chart */}
        <div className="col-12 col-md-8">
          <div className="card p-4 shadow-sm">
            <h6 className="mb-3">Balance Trend</h6>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#007bff" />
              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-12 col-md-4">
          <div className="card p-4 shadow-sm">
            <h6 className="mb-3">Spending Breakdown</h6>

            <ResponsiveContainer width="100%" height={300}>
  <PieChart>

    {/* Tooltip (IMPORTANT) */}
    <Tooltip
      formatter={(value, name) => [`₹${value}`, name]}
    />

    <Pie
      data={pieData}
      dataKey="value"
      nameKey="name"   // 👈 VERY IMPORTANT
      outerRadius={100}
    >
      {pieData.map((entry, index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>

  </PieChart>
</ResponsiveContainer>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;