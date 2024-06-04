import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS file for styling

function Navbar() {
  const handleLogout = () => {
    // Clear local storage or perform any other necessary logout actions
    window.localStorage.clear();
    // Redirect to the login page
    window.location.href = "/sign-in";
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
        <Link to="/ReportMain">Report</Link>
      </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
