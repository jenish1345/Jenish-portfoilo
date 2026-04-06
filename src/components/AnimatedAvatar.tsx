import { useEffect, useState } from "react";

const AnimatedAvatar = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="absolute w-64 h-64 rounded-full border-2 border-white/10 animate-spin-slow"
          style={{ animationDuration: "20s" }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full border-2 border-white/5 animate-spin-slow"
          style={{ animationDuration: "30s", animationDirection: "reverse" }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full border border-white/5 animate-spin-slow"
          style={{ animationDuration: "40s" }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        />
      ))}

      {/* Main Avatar Container */}
      <div
        className="relative z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Avatar Frame with Glassmorphism */}
        <div className="relative">
          {/* Rotating Border */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full opacity-75 blur-lg animate-spin-slow" 
               style={{ animationDuration: "8s" }} />
          
          {/* Inner Frame */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-full p-2 border-2 border-white/20 shadow-2xl">
            {/* Avatar Image Container */}
            <div className={`relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/30 transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}`}>
              <img
                src="/lovable-uploads/d737aef4-76c3-4c23-ab88-26d76a8d4b78.png"
                alt="Antony Jenish Fernando"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Hover Shine Effect */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
                style={{ transform: 'skewX(-20deg)' }}
              />
            </div>
          </div>

          {/* Floating Icons Around Avatar */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow border-2 border-white/30">
            <span className="text-2xl">💻</span>
          </div>
          
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow border-2 border-white/30"
               style={{ animationDelay: "0.5s" }}>
            <span className="text-2xl">🚀</span>
          </div>
          
          <div className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow border-2 border-white/30"
               style={{ animationDelay: "1s" }}>
            <span className="text-xl">⚡</span>
          </div>
          
          <div className="absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow border-2 border-white/30"
               style={{ animationDelay: "1.5s" }}>
            <span className="text-xl">🎯</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg border-2 border-white/30 animate-pulse whitespace-nowrap">
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
          Available for Work
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default AnimatedAvatar;
