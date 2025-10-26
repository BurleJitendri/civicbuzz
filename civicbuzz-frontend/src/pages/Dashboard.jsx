import React, { useEffect, useState } from "react";
import { fetchIssues } from "../api";
import IssueCard from "../components/IssueCard";
import MapView from "../components/MapView";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const navigate = useNavigate();

  // ✅ Step 3: Redirect if not logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please log in to access the dashboard.");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Load issues
  const loadIssues = () => {
    fetchIssues()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.issues || [];
        setIssues(data);
        setFilteredIssues(data);
      })
      .catch((err) => console.error("Error fetching issues:", err));
  };

  useEffect(() => {
    loadIssues();
  }, []);

  // ✅ Filter + Sort Logic
  useEffect(() => {
    let data = [...issues];

    // Filter
    if (filter !== "All") {
      data = data.filter((issue) => issue.status === filter);
    }

    // Sort
    if (sortOrder === "Newest") {
      data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else {
      data.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    }

    setFilteredIssues(data);
  }, [filter, sortOrder, issues]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">
          🗺️ CivicBuzz Dashboard
        </h1>

        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded shadow-sm"
        >
          <option value="All">All Issues</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded shadow-sm"
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>

        <button
          onClick={loadIssues}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Map */}
      <MapView issues={filteredIssues} />

      {/* Issue Cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} onUpdate={loadIssues} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No issues found for this filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
