
import "../styles/MobileNav.css";

import { NavLink } from "react-router-dom";

function MobileNav({ role, setRole }) {
  return (
    <div className="mobile-nav d-md-none">

      <NavLink to="/" className="nav-item">
        🏠
        <small>Home</small>
      </NavLink>

      <NavLink to="/transactions" className="nav-item">
        💳
        <small>Txns</small>
      </NavLink>

      <NavLink to="/insights" className="nav-item">
        📊
        <small>Insights</small>
      </NavLink>

   

    </div>
  );
}

export default MobileNav;