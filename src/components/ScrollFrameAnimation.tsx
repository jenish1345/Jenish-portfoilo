import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollFrameAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const currentFrame = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Load images
  useEffect(() => {
    const frameCount = 4;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/scroll-frames/photo${i}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []);

  // Render frame on canvas
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const unsubscribe = currentFrame.on("change", (latest) => {
      const index = Math.min(Math.floor(latest), images.length - 1);
      const img = images[index];

      if (img && img.complete) {
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calculate dimensions to cover the canvas
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Add film grain effect
        ctx.globalAlpha = 0.03;
        for (let i = 0; i < 3000; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
          ctx.fillRect(x, y, 1, 1);
        }
        ctx.globalAlpha = 1;

        // Add vignette
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 1.5
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,0.6)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    });

    return () => unsubscribe();
  }, [currentFrame, images, imagesLoaded]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      {/* Fixed Canvas */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />

        {/* Overlay Content */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none"
        >
          {/* Title Animation */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: false }}
            className="text-center mb-8"
          >
            <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tight">
              ANTONY
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold text-white/80 tracking-tight">
              JENISH
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: false }}
            className="text-xl md:text-2xl text-white/70 font-light tracking-wider"
          >
            DATA SCIENTIST & AI/ML ENGINEER
          </motion.p>

          {/* Scroll Progress Bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-white origin-left"
            />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 text-sm"
          >
            SCROLL TO EXPLORE
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xl">Loading Experience...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollFrameAnimation;
