import express from "express";
import Issue from "../models/issueModel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import jwt from "jsonwebtoken";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
// ✅ Authentication Middleware
//
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "civicbuzz_secret"); // same key as in userRoutes
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

//
// ✅ Multer setup for image uploads
//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

//
// ✅ GET all issues (for dashboard / admin)
//
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error("❌ Error fetching issues:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//
// ✅ POST new issue with image + geocoding
//
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  try {
    const { title, description, location } = req.body;
    let imageURL = req.file ? `/uploads/${req.file.filename}` : null;

    // ✅ Default coordinates (Bengaluru)
    let lat = 12.9716;
    let lon = 77.5946;

    // ✅ Geocode location → coordinates using OpenStreetMap
    if (location) {
      const geoRes = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: { q: location, format: "json", limit: 1 },
      });

      if (geoRes.data && geoRes.data.length > 0) {
        lat = parseFloat(geoRes.data[0].lat);
        lon = parseFloat(geoRes.data[0].lon);
      }
    }

    // ✅ Create new issue
    const newIssue = new Issue({
      title,
      description,
      location,
      imageURL,
      latitude: lat,
      longitude: lon,
      user: req.user,
      status: "Pending",
    });

    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    console.error("❌ Error creating issue:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//
// ✅ GET issues created by the logged-in user
//
router.get("/my", authenticate, async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error("❌ Error fetching user issues:", err);
    res.status(500).json({ message: "Failed to fetch your issues" });
  }
});

//
// ✅ PATCH / PUT update issue (only by owner)
//
router.put("/:id", authenticate, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    if (issue.user.toString() !== req.user)
      return res.status(403).json({ message: "Unauthorized" });

    const updated = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating issue:", err);
    res.status(500).json({ message: "Failed to update issue" });
  }
});

//
// ✅ PATCH to update status (e.g., resolve)
//
router.patch("/:id", async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(issue);
  } catch (error) {
    console.error("❌ Error patching issue:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//
// ✅ DELETE issue (only by owner)
//
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    if (issue.user.toString() !== req.user)
      return res.status(403).json({ message: "Unauthorized" });

    await issue.deleteOne();
    res.json({ message: "✅ Issue deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting issue:", err);
    res.status(500).json({ message: "Failed to delete issue" });
  }
});

export default router;
