import axios from "axios";

const API = axios.create({
  baseURL: "https://civicbuzz-backend.onrender.com", // Your backend base URL
});

// ✅ Public endpoints
export const fetchIssues = () => API.get("/issues"); // used in Dashboard & Statistics
export const addIssue = (data) => API.post("/issues", data);

// ✅ User-only endpoints (require token)
export const fetchMyIssues = () => {
  const token = localStorage.getItem("token");
  return API.get("/issues/my", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateIssue = (id, data) => {
  const token = localStorage.getItem("token");
  return API.put(`/issues/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteIssue = (id) => {
  const token = localStorage.getItem("token");
  return API.delete(`/issues/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default API;
