// src/components/chat/SunnyChatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SunnyChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom automatically when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

      // 🌍 Swahili + Gen Z Vibe Prompt
      const solarPrompt = `
        You are Sunny — a Kenyan solar assistant who mixes English and Swahili naturally.
        You speak in genZ english if the user talks in english and mix english and swahili when they talk in swahili.
        You talk like a chill, Gen Z Kenyan — easy, funny, and relatable.
        You help people learn about solar in a simple, friendly way.

        Guidelines:
        - Speak in a mix of light Swahili and English (sheng or casual tone ok).
        - Mention sunlight hours, power savings (in KSh), and how solar helps the environment.
        - Encourage using clean energy and mention SDG 13 (Climate Action).
        - If user asks about installation, tell them you can connect them to a trusted installer.
        - Keep answers short, under 3 sentences. No heavy terms.
        - Be warm, helpful, and use emojis when it fits 😎☀️🇰🇪
      `;

      const result = await model.generateContent([solarPrompt, input]);
      const reply = result.response.text();

      setMessages((prev) => [...prev, { text: reply, sender: "sunny" }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Aii, Sunny ako na blackout kidogo 😅. Jaribu tena baadaye!",
          sender: "sunny",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp-style Chat UI
  return (
    <div className="flex flex-col h-full bg-[#fdfcf6] rounded-2xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-[#fdfcf6]">
        <h2 className="text-base font-bold text-[#144404] flex items-center gap-1">
          ☀️ Sunny — Your Solar Assistant
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scroll-smooth flex flex-col">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] p-2 rounded-lg text-sm leading-snug ${
              msg.sender === "user"
                ? "bg-[#f79436] text-white self-end ml-auto text-right"
                : "bg-[#e8f5e9] text-[#133b04]"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="italic text-gray-500 text-sm">Sunny is thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-gray-200 p-2 bg-[#fdfcf6]"
      >
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fbc71f]"
          placeholder="Ask about anything solar..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#f79436] text-white px-4 py-2 rounded-full hover:bg-[#ca523b] transition disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SunnyChatbot;
