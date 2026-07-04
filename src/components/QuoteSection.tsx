import { useRef, useEffect, useState } from "react";

interface QuoteSectionProps {
  quote: string;
  author: string;
}

const QuoteSection = ({ quote, author }: QuoteSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = quote.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-36 px-6 overflow-hidden bg-[#f5f5f0] dark:bg-[#0a0a0a] transition-colors"
    >
      {/* Subtle animated gradient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className={`w-[600px] h-[400px] rounded-full blur-[120px] transition-all duration-[2000ms] ${
            visible
              ? "opacity-30 scale-100"
              : "opacity-0 scale-75"
          } bg-gradient-to-br from-indigo-400/40 via-purple-400/20 to-transparent dark:from-indigo-600/30 dark:via-purple-600/20`}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Big decorative quote mark */}
        <div
          className={`text-8xl md:text-[10rem] leading-none mb-4 transition-all duration-700 ${
            visible ? "opacity-15 translate-y-0" : "opacity-0 -translate-y-4"
          } bg-gradient-to-b from-black/60 to-transparent dark:from-white/60 bg-clip-text text-transparent select-none`}
        >
          "
        </div>

        {/* Word-by-word reveal */}
        <p
          className="text-2xl md:text-4xl font-light leading-relaxed mb-10 text-black/85 dark:text-white/85"
          aria-label={quote}
        >
          {words.map((word, i) => (
            <span
              key={i}
              aria-hidden
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.3em" }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: visible ? "translateY(0)" : "translateY(120%)",
                  opacity: visible ? 1 : 0,
                  transition: `transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s, opacity 0.5s ease ${i * 0.06}s`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </p>

        {/* Author */}
        <div
          style={{
            transform: visible ? "translateY(0)" : "translateY(16px)",
            opacity: visible ? 1 : 0,
            transition: `transform 0.8s cubic-bezier(0.22,1,0.36,1) ${words.length * 0.06 + 0.2}s, opacity 0.6s ease ${words.length * 0.06 + 0.2}s`,
          }}
          className="flex items-center justify-center gap-4"
        >
          <div className="w-10 h-px bg-black/30 dark:bg-white/30" />
          <p className="text-sm uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-medium">
            {author}
          </p>
          <div className="w-10 h-px bg-black/30 dark:bg-white/30" />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
