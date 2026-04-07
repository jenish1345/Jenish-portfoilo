import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  { text: "Hello", lang: "English" },
  { text: "Bonjour", lang: "French" },
  { text: "Hola", lang: "Spanish" },
  { text: "Ciao", lang: "Italian" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "你好", lang: "Chinese" },
  { text: "Привет", lang: "Russian" },
  { text: "مرحبا", lang: "Arabic" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "வணக்கம்", lang: "Tamil" },
];

interface HelloLoadingScreenProps {
  onComplete: () => void;
}

const HelloLoadingScreen = ({ onComplete }: HelloLoadingScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < greetings.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 500);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-white dark:bg-black flex items-center justify-center"
        >
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-6xl md:text-8xl font-light tracking-tight"
              >
                {greetings[currentIndex].text}
              </motion.div>
            </AnimatePresence>
            
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-12">
              {greetings.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0.3 }}
                  animate={{
                    scale: index === currentIndex ? 1.2 : 0.8,
                    opacity: index <= currentIndex ? 1 : 0.3,
                  }}
                  className="w-2 h-2 rounded-full bg-black dark:bg-white"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelloLoadingScreen;
