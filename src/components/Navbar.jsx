import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">🌱 Smart Farm</div>

      <div className="navbar-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/recommendation">Recommendation</NavLink>
        <NavLink to="/expenses">Expenses</NavLink>
        <NavLink to="/soil">Soil</NavLink>
        <NavLink to="/addnewcrop">Add new Crop</NavLink>
      </div>

      <div className="navbar-profile">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="profile"
            className="profile-pic"
          />
        ) : (
          <span className="profile-placeholder">
            {user?.name?.charAt(0)}
          </span>
        )}

        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
