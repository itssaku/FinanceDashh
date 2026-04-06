import { NavLink } from "react-router-dom";

function Navbar({ role, setRole, darkMode, setDarkMode }) {
  return (
   // <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 px-md-4">
 //  <nav className={`navbar navbar-expand-lg shadow-sm ${
 // darkMode 
 //? "navbar-dark bg-dark" : "navbar-light bg-white"
//}`}>
<nav className={`navbar navbar-expand-lg px-4 ${
  darkMode ? "navbar-dark" : "navbar-light"
}`} style={{
  background: "var(--card)",
  borderBottom: "1px solid var(--border)",
  backdropFilter: "blur(10px)"
}}>

      {/* Logo */}
      <NavLink className="navbar-brand fw-bold" to="/">
        💸 Finance Dashboard
      </NavLink>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Content */}
      <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarContent">

        {/* Links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : ""}`
            }>
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/transactions" className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : ""}`
            }>
              Transactions
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/insights" className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : ""}`
            }>
              Insights
            </NavLink>
          </li>

        </ul>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">

          {/* 🌙 Dark Mode Toggle */}
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={darkMode || false}
              onChange={() => setDarkMode(prev => !prev)}
            />
            <span className="slider"></span>
          </label>

          {/* Role Switch */}
          <select
            className="form-select form-select-sm"
            style={{ width: "130px" }}
            value={role || "viewer"}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;