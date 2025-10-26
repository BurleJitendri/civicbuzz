import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import issueRoutes from "./routes/issueRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/chat", chatRoutes);

// ✅ Serve static files from uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/issues", issueRoutes);
app.use("/api/users", userRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Root route (optional)
app.get("/", (req, res) => res.send("CivicBuzz API is running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
