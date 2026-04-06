import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import MobileNav from "./components/MobileNav";

function App() {

  // ✅ Role state (safe initialization)
  const [role, setRole] = useState(
    localStorage.getItem("role") ?? "viewer"
  );

  // ✅ Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // ✅ Save role
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  // ✅ Save dark mode + apply class


  useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}, [darkMode]);

  return (
    <BrowserRouter>

      {/* ✅ Pass ALL props */}
      <Navbar 
        role={role} 
        setRole={setRole} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions role={role} />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>

      <MobileNav />

    </BrowserRouter>
  );
}

export default App;