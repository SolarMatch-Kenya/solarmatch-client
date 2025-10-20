import React, { useState } from "react";
import SunnyChatbot from "./SunnyChatbot";

const SunnyWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-2">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-semibold text-[#144404]">☀️ Sunny Chat</h3>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✖
            </button>
          </div>
          <SunnyChatbot />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-[#f79436] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#ca523b] transition"
        >
          💬 Hi, I'm Sunny — your solar assistant!
        </button>
      )}
    </div>
  );
};

export default SunnyWidget;