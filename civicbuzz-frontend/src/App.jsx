import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chatbot from "./pages/Chatbot";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">🌆 CivicBuzz</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/report" className="hover:underline">
          Report
        </Link>
        <Link to="/stats" className="hover:underline">
          Statistics
        </Link>
<Link to="/chatbot" className="hover:underline">Chatbot</Link>

        <button
          onClick={handleLogout}
          className="hover:underline text-red-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

function App() {
  const user = localStorage.getItem("user");

  return (
    <Router>
      {/* ✅ Navbar shows only when user is logged in */}
      {user && <Navbar />}

      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App Feature Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
