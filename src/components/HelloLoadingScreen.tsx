import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "こんにちは",
  "안녕하세요",
  "你好",
  "Привет",
  "مرحبا",
  "नमस्ते",
  "வணக்கம்",
];

interface HelloLoadingScreenProps {
  onComplete: () => void;
}

const HelloLoadingScreen = ({ onComplete }: HelloLoadingScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-skip after 7 seconds max
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 7000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Cycle through greetings smoothly
  useEffect(() => {
    if (currentIndex < greetings.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 550); // fast transition between greetings
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-zinc-950 text-white flex flex-col items-center justify-center gap-0"
    >
      {/* Ambient glow behind text */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* Greeting */}
      <div className="relative text-center flex flex-col items-center">
        <div className="flex items-center justify-center h-40 mb-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-6xl md:text-8xl font-light tracking-tight"
            >
              {greetings[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Skip button — centered below the greeting, styled as hero content */}
        <motion.button
          onClick={onComplete}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 px-8 py-2.5 text-xs font-medium text-white/40 hover:text-white/80 border border-white/10 hover:border-white/25 rounded-full uppercase tracking-[0.25em] transition-colors duration-300 backdrop-blur-sm bg-white/[0.03]"
        >
          Skip Intro
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HelloLoadingScreen;
