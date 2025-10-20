// Chatbot widget for asking solar/AI questions (Swahili + English)

// src/components/chat/SunnyChatbot.jsx
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SunnyChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize Gemini client with your API key
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const solarPrompt = `
         You are Sunny — a friendly solar energy AI assistant helping Kenyan households 
         understand the benefits of solar power and sustainable energy choices.
         You are warm, encouraging, and use simple terms.
         When possible:
         - Mention how sunlight hours affect energy output.
         - Compare cost savings in Kenyan shillings.
         - Promote clean energy and SDG 13 (Climate Action).
         - If a user asks about installation, offer to connect them with a verified installer.
        `;

      const result = await model.generateContent([solarPrompt, input]);

      const reply = result.response.text();

      setMessages((prev) => [
        ...prev,
        { text: reply, sender: "sunny" },
      ]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Oops! Sunny had a cloudy moment ☁️. Try again.", sender: "sunny" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-[#fdfcf6] rounded-2xl shadow-md">
      <h2 className="text-lg font-bold text-[#144404] mb-3">
        ☀️ Sunny — Your Solar Assistant
      </h2>

      <div className="flex-1 overflow-y-auto mb-4 border border-gray-200 p-3 rounded-xl">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded-lg ${
              msg.sender === "user"
                ? "bg-[#f79436] text-white self-end text-right"
                : "bg-[#e8f5e9] text-[#133b04]"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="italic text-gray-500 text-sm">Sunny is thinking...</div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fbc71f]"
          placeholder="Ask about your solar energy savings..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#f79436] text-white px-4 py-2 rounded-xl hover:bg-[#ca523b]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SunnyChatbot;
