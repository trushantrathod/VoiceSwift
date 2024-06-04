import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Report"; // Import the Reports component
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/sign-in";
  };

  return (
    <Router>
      <div className="App">
        
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
          <div className="container-fluid">
          <Link className="navbar-brand voicesift" to="/">VoiceSift</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/reports">Reports</Link> {/* Update the route path for Reports */}
                    </li>
                    <li className="nav-item">
                      <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/sign-in">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/sign-up">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path="/" element={isLoggedIn === "true" ? <Dashboard /> : <Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} /> {/* Update the route for Reports component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
