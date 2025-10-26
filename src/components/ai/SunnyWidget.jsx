// src/components/chat/SunnyWidget.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunnyChatbot from "./SunnyChatbot";
import DotLottie from "../ui/dotLottie";

const SunnyWidget = () => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  // Auto "wave" after page load
  useEffect(() => {
    const timer1 = setTimeout(() => setHover(true), 3000); // open hover after 3s
    const timer2 = setTimeout(() => setHover(false), 7000); // close hover after 7s total
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating button (when closed) */}
      {!open && (
        <motion.div
          onClick={() => setOpen(true)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          animate={{
            backgroundColor: hover
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0)",
            borderColor: hover ? "#f79436" : "rgba(247, 148, 54, 0)",
            borderWidth: hover ? "2px" : "0px",
            padding: hover ? "10px 16px" : "0px",
            borderRadius: hover ? "12px" : "50%",
            boxShadow: hover ? "0 0 15px rgba(247,148,54,0.3)" : "none",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="cursor-pointer flex items-center justify-center overflow-hidden"
        >
          <motion.div
            animate={{
              scale: hover ? 1 : 1.5,
              x: hover ? 0 : 10,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex items-center gap-2"
          >
            {/* Clean Lottie container */}
            <div
              className="pointer-events-none"
              style={{
                background: "transparent",
                boxShadow: "none",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DotLottie />
            </div>

            <AnimatePresence>
              {hover && (
                <motion.span
                  key="sunny-text"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.4 }}
                  className="text-[#f79436] font-medium text-sm whitespace-nowrap"
                >
                  Hi, I’m Sunny — your solar assistant!
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}

      {/* Chat window */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="w-80 h-[450px] bg-white rounded-[10px] shadow-2xl border border-gray-200 mt-3 flex flex-col overflow-hidden"
            style={{ position: "fixed", bottom: "6rem", right: "1.5rem" }}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-[#fdfcf6]">
              <h3 className="text-base font-bold text-[#144404] flex items-center gap-1">
                <DotLottie /> Sunny Chat
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                <img src="src/assets/icons/close_24dp_144404_FILL0_wght400_GRAD0_opsz24.svg" />
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
