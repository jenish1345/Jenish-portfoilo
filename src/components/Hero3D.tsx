import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero3D = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStage(1), 1000),  // Remove sunglasses
      setTimeout(() => setAnimationStage(2), 2500),  // Wink
      setTimeout(() => setAnimationStage(3), 3500),  // Wave
      setTimeout(() => setAnimationStage(4), 5000),  // Idle
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#09090b]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
      >
        {/* 3D Character Container */}
        <div className="relative mb-12">
          {/* Rotating Ring */}
          <motion.div
            className="absolute inset-0 -m-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full border-2 border-dashed border-cyan-500/30" />
          </motion.div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 -m-10 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Main Photo Container */}
          <motion.div
            className="relative w-80 h-80 md:w-96 md:h-96"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Hexagon Frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-3xl animate-pulse" style={{ padding: "3px" }}>
              <div className="w-full h-full bg-[#0a0a0f] rounded-3xl overflow-hidden">
                {/* Profile Photo */}
                <motion.div
                  className="relative w-full h-full"
                  animate={animationStage >= 4 ? {
                    y: [0, -5, 0],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img
                    src="/profile-photo.jpg"
                    alt="Antony Jenish"
                    className="w-full h-full object-cover"
                  />

                  {/* Sunglasses Overlay - Animated removal */}
                  <motion.div
                    className="absolute top-[35%] left-1/2 -translate-x-1/2 w-48 h-24"
                    initial={{ opacity: 1, y: 0, scale: 1 }}
                    animate={animationStage >= 1 ? { 
                      opacity: 0, 
                      y: -150, 
                      rotate: -45,
                      scale: 0.5,
                      x: -100
                    } : {}}
                    transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <div className="text-8xl filter drop-shadow-2xl">🕶️</div>
                  </motion.div>

                  {/* Wink Effect - Big animated wink */}
                  {animationStage === 2 && (
                    <motion.div
                      className="absolute top-[38%] left-[55%] -translate-x-1/2 text-7xl z-20"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ 
                        scale: [0, 1.8, 1.5, 0],
                        rotate: [-20, 10, -10, 20]
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      😉
                    </motion.div>
                  )}

                  {/* Wave Hand - Matches the photo's wave gesture */}
                  <motion.div
                    className="absolute bottom-[15%] right-[20%] text-8xl z-20 filter drop-shadow-2xl"
                    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                    animate={animationStage >= 3 ? {
                      opacity: [0, 1, 1, 1, 0],
                      scale: [0.5, 1.3, 1.2, 1.3, 0.8],
                      rotate: [0, -15, 15, -15, 15, 0],
                    } : {}}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  >
                    👋
                  </motion.div>

                  {/* Cool Emoji Reactions */}
                  {animationStage >= 3 && (
                    <>
                      <motion.div
                        className="absolute top-[20%] left-[15%] text-4xl z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          scale: [0, 1.5, 1.5, 0],
                          y: [0, -40],
                          rotate: [0, 360]
                        }}
                        transition={{ duration: 2, delay: 0.5 }}
                      >
                        😎
                      </motion.div>

                      <motion.div
                        className="absolute top-[25%] right-[15%] text-4xl z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          scale: [0, 1.5, 1.5, 0],
                          y: [0, -40],
                          rotate: [0, -360]
                        }}
                        transition={{ duration: 2, delay: 0.8 }}
                      >
                        🔥
                      </motion.div>
                    </>
                  )}

                  {/* Sparkles - More dynamic */}
                  {animationStage >= 1 && (
                    <>
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-3xl z-10"
                          style={{
                            left: `${10 + (i % 4) * 25}%`,
                            top: `${20 + Math.floor(i / 4) * 25}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1.8, 1.5, 0],
                            y: [0, -60],
                            rotate: [0, 180],
                          }}
                          transition={{
                            duration: 2,
                            delay: 0.5 + i * 0.15,
                            repeat: Infinity,
                            repeatDelay: 4,
                          }}
                        >
                          ✨
                        </motion.div>
                      ))}
                    </>
                  )}

                  {/* Hearts floating up */}
                  {animationStage >= 4 && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`heart-${i}`}
                          className="absolute text-4xl z-10"
                          style={{
                            left: `${30 + i * 20}%`,
                            bottom: '10%',
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1.2, 1, 0],
                            y: [0, -150],
                          }}
                          transition={{
                            duration: 3,
                            delay: i * 0.5,
                            repeat: Infinity,
                            repeatDelay: 5,
                          }}
                        >
                          ❤️
                        </motion.div>
                      ))}
                    </>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Floating Icons */}
            <motion.div
              className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-3xl">💻</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20"
              animate={{
                y: [0, -15, 0],
                rotate: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <span className="text-3xl">🚀</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-12 w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20"
              animate={{
                x: [0, 10, 0],
                rotate: [0, 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            >
              <span className="text-2xl">⚡</span>
            </motion.div>

            <motion.div
              className="absolute top-1/4 -left-10 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20"
              animate={{
                x: [0, -10, 0],
                rotate: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
            >
              <span className="text-2xl">🎯</span>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 -right-10 w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20"
              animate={{
                y: [0, 12, 0],
                rotate: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3.2, repeat: Infinity, delay: 0.8 }}
            >
              <span className="text-2xl">🔥</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Name Animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {["A", "n", "t", "o", "n", "y", " ", "J", "e", "n", "i", "s", "h"].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2 + i * 0.1,
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-zinc-400 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
          >
            Full Stack Developer & Creative Technologist
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-6 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium shadow-lg shadow-cyan-500/50"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-white/20 rounded-full text-white font-medium backdrop-blur-sm hover:bg-white/10"
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 5, duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero3D;
