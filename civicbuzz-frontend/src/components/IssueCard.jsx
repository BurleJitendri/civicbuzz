import React, { useState } from "react";
import { updateIssue, deleteIssue } from "../api";

const IssueCard = ({ issue, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: issue.title,
    description: issue.description,
    location: issue.location,
    imageURL: issue.imageURL,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // ✅ Save edits
  const handleSave = async () => {
    try {
      await updateIssue(issue._id, editData);
      alert("✅ Issue updated successfully!");
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update issue");
    }
  };

  // ✅ Mark as resolved
  const handleResolve = async () => {
    try {
      await updateIssue(issue._id, { status: "Resolved" });
      alert("✅ Issue marked as resolved!");
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update issue");
    }
  };

  // ✅ Delete issue
  const handleDelete = async () => {
    const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this issue?");
    if (!confirmDelete) return;
    try {
      await deleteIssue(issue._id);
      alert("🗑️ Issue deleted successfully!");
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete issue");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <img
        src={
          issue.imageURL
            ? `http://localhost:5000${issue.imageURL}`
            : "https://placehold.co/600x400?text=No+Image"
        }
        alt="issue"
        className="rounded-md mb-3 w-full h-48 object-cover"
      />

      {/* View Mode */}
      {!isEditing ? (
        <>
          <h2 className="text-lg font-semibold">{issue.title}</h2>
          <p className="text-sm text-gray-500">{issue.description}</p>
          <p className="text-sm text-gray-400 mt-1">
            📍 {issue.location || "Not specified"}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full ${
                issue.status === "Resolved"
                  ? "bg-green-200 text-green-700"
                  : "bg-yellow-200 text-yellow-700"
              }`}
            >
              {issue.status || "Pending"}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => handleDelete(issue._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                🗑️ Delete
              </button>

              {issue.status !== "Resolved" && (
                <button
                  onClick={handleResolve}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  ✅ Resolve
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        // Edit Mode
        <div className="mt-2">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="border p-1 mb-2 w-full rounded"
            placeholder="Title"
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            className="border p-1 mb-2 w-full rounded"
            placeholder="Description"
          />
          <input
            type="text"
            name="location"
            value={editData.location}
            onChange={handleChange}
            className="border p-1 mb-2 w-full rounded"
            placeholder="Location"
          />
          <input
            type="text"
            name="imageURL"
            value={editData.imageURL}
            onChange={handleChange}
            className="border p-1 mb-2 w-full rounded"
            placeholder="Image URL"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueCard;
