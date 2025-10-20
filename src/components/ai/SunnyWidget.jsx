// src/components/chat/SunnyWidget.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunnyChatbot from "./SunnyChatbot";

const SunnyWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating button */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#f79436] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#ca523b] transition text-sm flex items-center gap-2"
        >
          💬 Hi, I'm Sunny — your solar assistant!
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="w-80 h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 mt-3 flex flex-col overflow-hidden"
            style={{ position: "fixed", bottom: "6rem", right: "1.5rem" }} // keeps consistent position during close animation
          >
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h3 className="font-semibold text-[#144404] text-sm flex items-center gap-1">
                ☀️ Sunny Chat
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                ✖
              </button>
            </div>

            <SunnyChatbot />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SunnyWidget;
