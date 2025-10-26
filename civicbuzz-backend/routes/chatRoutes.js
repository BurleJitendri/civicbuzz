import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // Send the user's message to OpenAI
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // free-tier capable model
        messages: [
          { role: "system", content: "You are CivicBot, a helpful civic assistant." },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("AI Chat Error:", err.response?.data || err.message);
    res.status(500).json({ error: "AI chat failed" });
  }
});

export default router;
