import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

// Greeting + language label. Order ends on Tamil, then the name card.
const greetings = [
  { text: "Hello", lang: "English", code: "en" },
  { text: "Bonjour", lang: "French", code: "fr" },
  { text: "Hola", lang: "Spanish", code: "es" },
  { text: "Ciao", lang: "Italian", code: "it" },
  { text: "こんにちは", lang: "Japanese", code: "ja" },
  { text: "안녕하세요", lang: "Korean", code: "ko" },
  { text: "你好", lang: "Chinese", code: "zh" },
  { text: "Привет", lang: "Russian", code: "ru" },
  { text: "مرحبا", lang: "Arabic", code: "ar" },
  { text: "नमस्ते", lang: "Hindi", code: "hi" },
  { text: "வணக்கம்", lang: "Tamil", code: "ta" },
];

const STEP_MS = 380;
const FINALE_MS = 1300;
const STEP_MS_REDUCED = 220;
const FINALE_MS_REDUCED = 900;
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

interface HelloLoadingScreenProps {
  onComplete: () => void;
}

const HelloLoadingScreen = ({ onComplete }: HelloLoadingScreenProps) => {
  const reduce = useReducedMotion();
  const step = reduce ? STEP_MS_REDUCED : STEP_MS;
  const finale = reduce ? FINALE_MS_REDUCED : FINALE_MS;
  const total = greetings.length * step + finale;

  const [index, setIndex] = useState(0);
  const [showName, setShowName] = useState(false);

  const done = useCallback(() => onComplete(), [onComplete]);

  // Cycle the greetings, then show the name card, then hand over.
  useEffect(() => {
    if (showName) {
      const t = setTimeout(done, finale);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (index < greetings.length - 1) setIndex(index + 1);
      else setShowName(true);
    }, step);
    return () => clearTimeout(t);
  }, [index, showName, step, finale, done]);

  // Keyboard skip.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") done();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done]);

  const progress = showName ? 100 : Math.round(((index + 1) / (greetings.length + 1)) * 100);
  const current = greetings[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Intro"
      initial={{ y: 0, opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { y: "-100%" }}
      transition={reduce ? { duration: 0.4 } : { duration: 0.95, ease: CURTAIN_EASE }}
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#0a0a0a] text-[#f5f5f0]"
    >
      <p className="sr-only">Loading the portfolio of Antony Jenish Fernando. Press Escape to skip.</p>

      {/* Dotted grid + soft spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: "radial-gradient(rgba(245,245,240,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[520px] w-[520px] rounded-full bg-emerald-500/[0.07] blur-[120px]" />
      </div>

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#f5f5f0]">
            <span className="text-sm font-bold">AJ</span>
          </div>
          <span className="text-sm font-semibold tracking-tight md:text-lg">ANTONY JENISH</span>
        </div>
        <span aria-hidden className="font-mono text-xs tracking-widest text-[#f5f5f0]/50">
          {showName ? "READY" : `${String(index + 1).padStart(2, "0")} / ${greetings.length}`}
        </span>
      </div>

      {/* Center stage */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {!showName ? (
            <motion.div
              key={current.text}
              aria-hidden
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, filter: "blur(6px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -36, filter: "blur(6px)" }}
              transition={{ duration: reduce ? 0.12 : 0.2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <span
                lang={current.code}
                dir={current.code === "ar" ? "rtl" : "ltr"}
                className="text-6xl font-light leading-tight tracking-tight md:text-9xl"
              >
                {current.text}
              </span>
              <span className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-400/80">
                <span className="h-px w-6 bg-emerald-400/60" />
                {current.lang}
                <span className="h-px w-6 bg-emerald-400/60" />
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="name"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#f5f5f0]/60">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Open to roles
              </span>
              <p className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight md:text-8xl">
                Antony Jenish
                <br />
                Fernando
              </p>
              <p className="mt-5 text-base text-[#f5f5f0]/60 md:text-xl">
                AI systems · Full stack · Oracle APEX
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar: counter, progress, skip */}
      <div className="relative px-6 pb-6 md:px-12 md:pb-8">
        <div className="flex items-end justify-between">
          <span aria-hidden className="font-mono text-5xl font-light tabular-nums leading-none md:text-7xl">
            {String(progress).padStart(3, "0")}
          </span>
          <button
            type="button"
            onClick={done}
            className="min-h-[44px] rounded-full border border-[#f5f5f0]/20 bg-[#f5f5f0]/[0.04] px-7 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-[#f5f5f0]/70 transition-colors hover:border-[#f5f5f0]/50 hover:text-[#f5f5f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
          >
            Skip intro
          </button>
        </div>
        <div aria-hidden className="mt-5 h-px w-full bg-[#f5f5f0]/15">
          <motion.div
            className="h-full origin-left bg-emerald-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: total / 1000, ease: "linear" }}
          />
        </div>
      </div>

      {/* Curved lower edge that leads the curtain as it lifts */}
      {!reduce && (
        <div
          aria-hidden
          className="absolute left-0 right-0 top-full h-[14vh] bg-[#0a0a0a]"
          style={{ borderRadius: "0 0 50% 50% / 0 0 100% 100%" }}
        />
      )}
    </motion.div>
  );
};

export default HelloLoadingScreen;
