import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowRight, ArrowUpRight, CheckCircle } from "lucide-react";
import { Project } from "@/types/portfolio.types";

interface ProjectShowcaseProps {
  projects: Project[];
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  Web: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", glow: "rgba(59,130,246,0.3)" },
  "AI/ML": { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/30", glow: "rgba(139,92,246,0.3)" },
  Mobile: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", glow: "rgba(16,185,129,0.3)" },
  Enterprise: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", glow: "rgba(245,158,11,0.3)" },
};

const getCategoryStyle = (category = "Web") =>
  CATEGORY_COLORS[category] ?? CATEGORY_COLORS["Web"];

// ── Tilt card ──────────────────────────────────────────────────────────────
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Main showcase ──────────────────────────────────────────────────────────
const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<string>("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category ?? "Web")))];

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const active = filtered[activeIndex] ?? filtered[0];
  const catStyle = getCategoryStyle(active?.category);

  // Clamp activeIndex when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  if (!active) return null;

  return (
    <div className="relative">
      {/* ── Category filters ── */}
      <div className="flex items-center gap-3 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border tracking-wide transition-all duration-300 ${
              filter === cat
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/50 border-white/15 hover:border-white/40 hover:text-white/80"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-white/20 text-xs font-mono">{filtered.length} projects</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.6fr] gap-8 items-start">

        {/* ── Left: stacked list ── */}
        <div className="space-y-2">
          {filtered.map((project, i) => {
            const cs = getCategoryStyle(project.category);
            const isActive = i === activeIndex;
            return (
              <motion.button
                key={project.id}
                onClick={() => setActiveIndex(i)}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full text-left group relative rounded-xl p-4 border transition-all duration-300 ${
                  isActive
                    ? "bg-white/[0.08] border-white/20"
                    : "bg-transparent border-white/5 hover:bg-white/[0.04] hover:border-white/12"
                }`}
              >
                {/* Active accent bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-violet-400 to-blue-400"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}

                <div className="flex items-center gap-3 pl-2">
                  {/* Large number */}
                  <span className={`text-3xl font-black leading-none transition-colors duration-300 ${isActive ? "text-white/20" : "text-white/8 group-hover:text-white/12"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${cs.bg} ${cs.text} ${cs.border}`}>
                        {project.category}
                      </span>
                      {project.duration && (
                        <span className="text-xs text-white/30 font-mono">{project.duration}</span>
                      )}
                    </div>
                    <p className={`text-sm font-semibold truncate transition-colors duration-300 ${isActive ? "text-white" : "text-white/60 group-hover:text-white/80"}`}>
                      {project.title.split("•")[0].trim()}
                    </p>
                    <p className="text-xs text-white/30 truncate mt-0.5">
                      {project.technologies.slice(0, 3).join(" · ")}
                    </p>
                  </div>

                  <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${isActive ? "text-white/60 translate-x-0" : "text-white/0 group-hover:text-white/30 -translate-x-1 group-hover:translate-x-0"}`} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ── Right: full detail panel ── */}
        <div className="sticky top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f14]">
                {/* Glow behind card */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none rounded-2xl transition-all duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${catStyle.glow} 0%, transparent 70%)`,
                  }}
                />

                {/* Header bar */}
                <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/8">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{active.emoji}</span>
                    <div>
                      <p className="text-white/40 text-xs font-mono mb-0.5">
                        {String(activeIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                        {active.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {active.liveUrl && active.liveUrl !== active.githubUrl && (
                      <a
                        href={active.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all duration-200 group"
                      >
                        <span>Live</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    <a
                      href={active.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all duration-200"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

                {/* Body */}
                <div className="relative p-6 space-y-6">
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                      {active.title.replace("•", "·")}
                    </h3>
                    <p className="text-white/55 leading-relaxed text-sm">
                      {active.description}
                    </p>
                  </div>

                  {/* Impact metric highlight */}
                  {active.businessImpact && (
                    <div className={`rounded-xl p-4 border ${catStyle.bg} ${catStyle.border} flex items-start gap-3`}>
                      <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${catStyle.text.replace("text-", "bg-")}`} />
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${catStyle.text}`}>Business Impact</p>
                        <p className="text-white/80 text-sm font-medium">{active.businessImpact}</p>
                      </div>
                    </div>
                  )}

                  {/* Problem / Solution */}
                  {(active.problem || active.solution) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {active.problem && (
                        <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
                          <p className="text-xs font-mono text-red-400/80 mb-2 uppercase tracking-wider">Problem</p>
                          <p className="text-white/50 text-xs leading-relaxed">{active.problem}</p>
                        </div>
                      )}
                      {active.solution && (
                        <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
                          <p className="text-xs font-mono text-emerald-400/80 mb-2 uppercase tracking-wider">Solution</p>
                          <p className="text-white/50 text-xs leading-relaxed">{active.solution}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  {active.features && active.features.length > 0 && (
                    <div>
                      <p className="text-xs text-white/30 uppercase tracking-wider mb-3 font-mono">Key Features</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {active.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-3 font-mono">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {active.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/25 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  {active.duration && (
                    <div className="flex items-center justify-between pt-4 border-t border-white/8 text-xs text-white/30">
                      <span className="font-mono">Build time: {active.duration}</span>
                      {active.metrics && (
                        <div className="flex gap-4">
                          {Object.entries(active.metrics).slice(0, 2).map(([k, v]) => (
                            <span key={k} className="font-mono">
                              <span className="text-white/60 font-semibold">{v}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Prev/Next navigation ── */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
        <button
          onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Previous
        </button>
        <div className="flex gap-1.5">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setActiveIndex(Math.min(filtered.length - 1, activeIndex + 1))}
          disabled={activeIndex === filtered.length - 1}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all group"
        >
          Next
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ProjectShowcase;
