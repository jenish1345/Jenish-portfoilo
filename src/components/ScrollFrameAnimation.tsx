import { motion } from "framer-motion";

const ScrollFrameAnimation = () => {
  const photos = [
    { src: "/scroll-frames/photo1.png", title: "ANTONY", subtitle: "JENISH" },
    { src: "/scroll-frames/photo2.png", title: "DATA", subtitle: "SCIENTIST" },
    { src: "/scroll-frames/photo3.png", title: "AI/ML", subtitle: "ENGINEER" },
    { src: "/scroll-frames/photo4.png", title: "PORTFOLIO", subtitle: "2026" }
  ];

  return (
    <>
      {photos.map((photo, index) => (
        <section
          key={index}
          className="relative h-screen w-full overflow-hidden snap-start snap-always"
        >
          {/* Full Screen Image */}
          <div className="absolute inset-0">
            <img
              src={photo.src}
              alt={`${photo.title} ${photo.subtitle}`}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
          </div>

          {/* Text Overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tight drop-shadow-2xl">
                {photo.title}
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold text-white/90 tracking-tight drop-shadow-2xl">
                {photo.subtitle}
              </h2>
            </motion.div>

            {/* Scroll Indicator - Only on first slide */}
            {index === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 text-sm flex flex-col items-center gap-2"
              >
                <span>SCROLL DOWN</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            )}

            {/* Slide Number */}
            <div className="absolute bottom-8 right-8 text-white/50 text-sm font-mono">
              {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default ScrollFrameAnimation;
