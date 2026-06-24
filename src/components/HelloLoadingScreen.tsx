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
      className="fixed inset-0 z-[100] bg-zinc-950 text-white flex flex-col items-center justify-center"
    >
      <button
        onClick={onComplete}
        className="absolute top-8 right-8 px-4 py-2 text-xs font-medium text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em]"
      >
        Skip
      </button>

      <div className="text-center flex items-center justify-center h-40">
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
    </motion.div>
  );
};

export default HelloLoadingScreen;
