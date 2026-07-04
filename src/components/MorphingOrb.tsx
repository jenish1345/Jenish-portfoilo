import React, { useEffect, useRef, useState } from "react";

interface MorphingOrbProps {
  scrollY?: number;
  className?: string;
  color?: string;
}

/**
 * CSS-only morphing orb — same visual effect as Three.js blob but with zero
 * runtime dependencies and perfect cross-device performance.
 */
const MorphingOrb: React.FC<MorphingOrbProps> = ({
  scrollY = 0,
  className = "",
}) => {
  const orbRef = useRef<HTMLDivElement>(null);

  // Subtle scroll-driven vertical shift
  useEffect(() => {
    const el = orbRef.current;
    if (!el) return;
    el.style.transform = `translateY(${scrollY * 0.08}px) translateZ(0)`;
  }, [scrollY]);

  return (
    <div ref={orbRef} className={`pointer-events-none select-none ${className}`} aria-hidden>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Core orb */}
        <div
          className="w-4/5 h-4/5 rounded-full animate-morph-orb"
          style={{
            background: "radial-gradient(ellipse at 40% 40%, rgba(139,92,246,0.55) 0%, rgba(99,102,241,0.4) 40%, rgba(168,85,247,0.2) 70%, transparent 100%)",
            filter: "blur(2px)",
          }}
        />
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full animate-morph-orb-slow"
          style={{
            background: "radial-gradient(ellipse at 60% 60%, rgba(99,102,241,0.15) 0%, transparent 70%)",
            filter: "blur(20px)",
            animationDirection: "reverse",
          }}
        />
      </div>

      <style>{`
        @keyframes morph-orb {
          0%,100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: rotate(0deg) scale(1);
          }
          20% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: rotate(72deg) scale(1.04);
          }
          40% {
            border-radius: 50% 60% 30% 40% / 50% 30% 70% 60%;
            transform: rotate(144deg) scale(0.96);
          }
          60% {
            border-radius: 60% 30% 50% 70% / 30% 50% 60% 70%;
            transform: rotate(216deg) scale(1.02);
          }
          80% {
            border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
            transform: rotate(288deg) scale(0.98);
          }
        }
        @keyframes morph-orb-slow {
          0%,100% { border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%; transform: rotate(0deg); }
          50% { border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%; transform: rotate(180deg); }
        }
        .animate-morph-orb {
          animation: morph-orb 12s ease-in-out infinite;
        }
        .animate-morph-orb-slow {
          animation: morph-orb-slow 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MorphingOrb;
