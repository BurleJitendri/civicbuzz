import React, { useEffect, useState } from "react";
import { fetchIssues } from "../api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Statistics = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues()
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.issues || [];
        setIssues(data);
      })
      .catch((err) => console.error("Error fetching issues:", err));
  }, []);

  // 🧠 Calculations
  const totalIssues = issues.length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved").length;
  const pendingCount = totalIssues - resolvedCount;
  const resolvedPercentage =
    totalIssues === 0 ? 0 : Math.round((resolvedCount / totalIssues) * 100);

  // 🥧 Pie chart data
  const pieData = [
    { name: "Pending", value: pendingCount },
    { name: "Resolved", value: resolvedCount },
  ];
  const COLORS = ["#f87171", "#4ade80"];

  // 📊 Bar chart (issues by date)
  const issuesByDate = issues.reduce((acc, issue) => {
    const date = new Date(issue.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.keys(issuesByDate).map((date) => ({
    date,
    count: issuesByDate[date],
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">📊 Civic Statistics</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-8">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Issues</h2>
          <p className="text-3xl font-bold text-blue-600">{totalIssues}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
          <p className="text-3xl font-bold text-red-500">{pendingCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">Resolved</h2>
          <p className="text-3xl font-bold text-green-500">{resolvedCount}</p>
        </div>
      </div>

      {/* 📈 Progress Bar */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-xl mx-auto">
        <p className="font-medium mb-2 text-center">
          Resolved: {resolvedCount}/{totalIssues} issues ({resolvedPercentage}%)
        </p>
        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-4 transition-all duration-500"
            style={{ width: `${resolvedPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 🥧 Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-center mb-4">
          Issue Distribution
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-center mb-4">
          Issues Reported by Date
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
