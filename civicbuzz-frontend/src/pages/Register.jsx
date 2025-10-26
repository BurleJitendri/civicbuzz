import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">🧾 Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="border p-2 mb-3 w-full rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 mb-3 w-full rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 mb-3 w-full rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700"
        >
          Register
        </button>
        <p
          onClick={() => navigate("/login")}
          className="text-sm text-center text-blue-600 mt-2 cursor-pointer"
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Register;
