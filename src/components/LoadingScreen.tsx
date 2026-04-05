import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      className="fixed inset-0 z-[10000] bg-[#0B0F19] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#1a1f3a] to-[#0B0F19]" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#00F5FF]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[120px]" />
      
      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-[#00F5FF] via-white to-[#8A2BE2] bg-clip-text text-transparent mb-4">
            JENISH
          </h1>
          <p className="text-gray-400 text-lg">Loading Experience...</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto backdrop-blur-xl border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 mt-4 text-sm"
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
