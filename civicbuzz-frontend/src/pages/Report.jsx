import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Report = () => {
  const navigate = useNavigate();

  // ✅ Redirect if user not logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please log in to report an issue.");
      navigate("/login");
    }
  }, [navigate]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("location", form.location);
      if (form.image) formData.append("image", form.image);

      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/issues", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Issue reported successfully!");
      setForm({ title: "", description: "", location: "", image: null });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to report issue");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          📝 Report a Civic Issue
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Describe the issue"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
          rows="3"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded w-full mb-4"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700"
        >
          📍 Submit Issue
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-3 w-full p-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          🔙 Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default Report;
