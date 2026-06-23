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
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [showTapPrompt, setShowTapPrompt] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  const currentGreeting = greetings[currentIndex];

  // Typing animation effect
  useEffect(() => {
    if (charIndex < currentGreeting.text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentGreeting.text.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // Finished typing current word
      if (currentIndex < greetings.length - 1) {
        // Move to next greeting after a pause
        const timer = setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setDisplayedText("");
          setCharIndex(0);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // Finished all greetings, show tap prompt
        const timer = setTimeout(() => {
          setShowTapPrompt(true);
          setCanSkip(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [charIndex, currentGreeting, currentIndex]);

  // Allow skipping after first greeting
  useEffect(() => {
    if (currentIndex > 0) {
      setCanSkip(true);
    }
  }, [currentIndex]);

  const handleClick = () => {
    if (canSkip) {
      onComplete();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        onClick={handleClick}
        className={`fixed inset-0 z-[100] bg-white dark:bg-black flex flex-col items-center justify-center ${canSkip ? 'cursor-pointer' : ''}`}
      >
        <div className="text-center">
          {/* Bitmoji/Avatar - Add your bitmoji image here */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.1 
            }}
            className="mb-8 flex items-center justify-center"
          >
            {/* Waving animation */}
            <motion.div
              animate={{ 
                rotate: [0, 14, -8, 14, -4, 10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              className="transform-gpu"
            >
              {/* Replace this div with your bitmoji image */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 flex items-center justify-center border-4 border-emerald-500/20">
                {/* Placeholder - Replace with: <img src="/your-bitmoji.png" alt="Antony Jenish" className="w-full h-full object-cover rounded-full" /> */}
                <span className="text-5xl">👋</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Typing Text */}
          <div className="text-6xl md:text-8xl font-light tracking-tight mb-4 min-h-[120px] flex items-center justify-center">
            {displayedText}
            {charIndex < currentGreeting.text.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-20 md:h-28 bg-black dark:bg-white ml-2"
              />
            )}
          </div>

          {/* Language Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40"
          >
            {currentGreeting.lang}
          </motion.p>

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

          {/* Tap to Enter Prompt */}
          <AnimatePresence>
            {showTapPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-16"
              >
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm uppercase tracking-wider text-black/60 dark:text-white/60"
                >
                  Tap anywhere to enter
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip hint (after first greeting) */}
          {canSkip && !showTapPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="mt-16"
            >
              <p className="text-xs uppercase tracking-wider text-black/40 dark:text-white/40">
                Click to skip
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HelloLoadingScreen;
