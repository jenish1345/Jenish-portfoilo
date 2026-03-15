import { motion } from 'framer-motion';

const OceanBubbles = () => {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 6
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: -100,
            background: `radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.2), rgba(236, 72, 153, 0.1))`,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(167, 139, 250, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
          animate={{
            y: [-100, -window.innerHeight - 100],
            x: [0, Math.sin(bubble.id) * 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0, 0.6, 0.8, 0.6, 0]
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default OceanBubbles;
