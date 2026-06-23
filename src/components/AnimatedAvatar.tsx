import { motion } from "framer-motion";

interface AnimatedAvatarProps {
  size?: "small" | "medium" | "large";
  imagePath?: string;
  className?: string;
}

const AnimatedAvatar = ({ 
  size = "large", 
  imagePath = "/your-bitmoji.png",
  className = "" 
}: AnimatedAvatarProps) => {
  
  const sizeClasses = {
    small: "w-24 h-24 md:w-32 md:h-32",
    medium: "w-40 h-40 md:w-48 md:h-48",
    large: "w-64 h-64 md:w-80 md:h-80"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.2 
      }}
      className={`relative ${className}`}
    >
      {/* Floating Animation */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Glow effect on hover */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          {/* Background circle with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-purple-100 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-full blur-2xl opacity-60" />
          
          {/* Avatar container */}
          <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-white dark:bg-zinc-900 border-4 border-black/5 dark:border-white/10 shadow-2xl`}>
            {/* Your bitmoji image goes here */}
            <img 
              src={imagePath}
              alt="Antony Jenish Avatar" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image doesn't exist
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = 
                  '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-blue-500 text-white text-6xl font-bold">AJ</div>';
              }}
            />
          </div>

          {/* Rotating ring animation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(16, 185, 129, 0.3) 10%, transparent 20%)"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Status indicator - "Available for work" */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="absolute bottom-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-2 border-2 border-white dark:border-zinc-900"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-white rounded-full"
        />
        Available
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAvatar;
