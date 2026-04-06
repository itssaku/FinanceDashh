import { useLocation } from "react-router-dom";
import "../styles/MobileHeader.css";

function Header({ role, setRole }) {
  const location = useLocation();

  // Dynamic page title (optional but premium)
  const getTitle = () => {
    if (location.pathname === "/transactions") return "Transactions";
    if (location.pathname === "/insights") return "Insights";
    return "Dashboard";
  };

  return (
    <div className="app-header">

      {/* Left: Logo + Page Name */}
      <div className="d-flex align-items-center gap-2">
        <span className="logo">💸</span>
        <div>
          <div className="app-name">Finance</div>
          <small className="page-name">{getTitle()}</small>
        </div>
      </div>

      {/* Right: Role */}
      <select
        className="role-select"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

    </div>
  );
}

export default Header;  