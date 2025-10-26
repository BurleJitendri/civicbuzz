import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I'm CivicBot — how can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMsg = { from: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { from: "bot", text: data.reply || "🤖 Sorry, I didn’t get that." }]);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [...prev, { from: "bot", text: "⚠️ Something went wrong connecting to AI." }]);
  }
};

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 p-3 rounded-xl max-w-xs ${
              msg.from === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="flex p-3 bg-white border-t shadow-md"
      >
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 mr-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
