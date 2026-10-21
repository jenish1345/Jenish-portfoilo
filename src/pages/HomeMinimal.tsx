import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import {
  ExternalLink, ArrowRight, Github, CheckCircle, Star, Quote,
  Globe, GraduationCap, UtensilsCrossed, UserCircle, Zap, ShoppingCart,
  Building2, BrainCircuit, Wrench, TrendingUp, Smartphone, Palette,
  Gauge, Code2, Search, Users, ShieldCheck, BadgeCheck, Layout,
  Server, Database, Clock, ChevronDown,
} from "lucide-react";
import Lenis from "lenis";
import ContactFormSection from "@/components/ContactFormSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import { trackProjectClick, trackEmailClick, trackSocialClick } from "@/components/Analytics";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingContactButton from "@/components/FloatingContactButton";
import ThemeToggle from "@/components/ThemeToggle";
import TypingAnimation from "@/components/TypingAnimation";
import CustomCursorTrail from "@/components/CustomCursorTrail";
import HelloLoadingScreen from "@/components/HelloLoadingScreen";
import QuoteSection from "@/components/QuoteSection";
import ParticleCanvas from "@/components/ParticleCanvas";
import MorphingOrb from "@/components/MorphingOrb";
import ScrollRevealText from "@/components/ScrollRevealText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Utility: Count-up hook ────────────────────────────────────────────────
function useCountUp(target: number, duration = 1.5, startOnView = true) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { value, ref };
}

// ─── Animated stat number ─────────────────────────────────────────────────
const AnimatedStat = ({ value, label }: { value: string; label: string }) => {
  const numericPart = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const { value: counted, ref } = useCountUp(numericPart);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {counted}{suffix}
      </div>
      <div className="text-sm text-black/60 dark:text-white/60 transition-colors">{label}</div>
    </div>
  );
};

// ─── Marquee strip ────────────────────────────────────────────────────────
const MarqueeStrip = ({ items }: { items: string[] }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative w-full">
      <div className="flex gap-12 animate-marquee whitespace-nowrap py-1">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm md:text-base font-bold opacity-50 tracking-widest uppercase shrink-0">
            {item}
            <span className="ml-12 text-black/20 dark:text-white/20">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Timeline line drawing component ─────────────────────────────────────
const TimelineLine = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom 20%",
      onUpdate: (self) => {
        el.style.height = `${self.progress * 100}%`;
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className="absolute left-0 top-0 w-[2px] bg-black/5 dark:bg-white/5 h-full rounded-full">
      <div
        ref={lineRef}
        className="w-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full transition-none"
        style={{ height: "0%" }}
      />
    </div>
  );
};

// ─── Process ring counter ─────────────────────────────────────────────────
const ProcessStep = ({ step, title, description, index }: {
  step: string; title: string; description: string; index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: visible ? "translateX(0) scale(1)" : "translateX(-30px) scale(0.97)",
        opacity: visible ? 1 : 0,
        transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
      }}
      className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors flex items-start gap-6 group"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center transition-colors group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500">
        <span className="text-sm font-bold text-white dark:text-black group-hover:text-white transition-colors">{step}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed transition-colors">{description}</p>
      </div>
    </div>
  );
};

// ─── Staggered card reveal ─────────────────────────────────────────────────
const RevealCard = ({
  children, delay = 0, direction = "up", className = ""
}: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right"; className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const startTransform =
    direction === "up" ? "translateY(40px)"
    : direction === "left" ? "translateX(-40px)"
    : "translateX(40px)";

  return (
    <div
      ref={ref}
      style={{
        transform: visible ? "translate(0,0) scale(1)" : `${startTransform} scale(0.96)`,
        opacity: visible ? 1 : 0,
        transition: `transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 0.6s ease ${delay}s`,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────
const HomeMinimal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { contact } = portfolioData;
  const [showHello, setShowHello] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const springY = useSpring(heroY, { stiffness: 60, damping: 20 });

  // Track raw scrollY for particle canvas drift
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHelloComplete = useCallback(() => {
    setShowHello(false);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });

    // Wire Lenis to GSAP ScrollTrigger (single raf source — no double call)
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    const gsapTickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(gsapTickerFn);

    return () => {
      gsap.ticker.remove(gsapTickerFn);
      lenis.destroy();
    };
  }, []);

  // ─── DATA ──────────────────────────────────────────────────────────────────

  const services = [
    { icon: "Globe", title: "Business Websites", description: "Professional websites that represent your brand and convert visitors into customers." },
    { icon: "GraduationCap", title: "School Websites", description: "Modern, accessible school portals with student portals and information management." },
    { icon: "UtensilsCrossed", title: "Restaurant Websites", description: "Appetizing digital menus, reservations, and ordering platforms for restaurants." },
    { icon: "UserCircle", title: "Portfolio Websites", description: "Clean, impressive portfolios that showcase your work and attract opportunities." },
    { icon: "Zap", title: "Landing Pages", description: "High-converting landing pages designed to capture leads and drive sales." },
    { icon: "ShoppingCart", title: "E-Commerce", description: "Complete online stores with product management, cart, and payment integration." },
    { icon: "Building2", title: "Oracle APEX Applications", description: "Enterprise-grade business applications built on Oracle APEX with PL/SQL." },
    { icon: "BrainCircuit", title: "AI Integration", description: "Integrate AI capabilities like chatbots, recommendations, and data intelligence." },
    { icon: "Wrench", title: "Website Maintenance", description: "Ongoing support, updates, and performance optimization for your website." },
    { icon: "TrendingUp", title: "SEO Optimization", description: "Technical SEO and content strategies to help your website rank higher on Google." },
  ];

  const internships = [
    {
      company: "V.O. Chidambaranar Port Trust (VOC Port)",
      role: "IT & Software Intern",
      period: "2024",
      duration: "1 Month",
      location: "Tuticorin, Tamil Nadu",
      status: "completed",
      description: "Worked within the IT department of one of India's major port authorities, assisting with internal software systems, data management, and digitization initiatives.",
      responsibilities: ["IT Systems Support", "Data Management", "Software Maintenance", "Internal Tools", "Documentation", "Process Digitization"],
      tags: ["Government IT", "Data Management", "Enterprise Systems", "Tamil Nadu"]
    },
    {
      company: "Freight Global Networks",
      role: "Oracle APEX Developer Intern",
      period: "2026",
      duration: "1 Month",
      location: "India",
      status: "completed",
      description: "Developed enterprise-grade Oracle APEX applications, automated business processes, and built analytics dashboards for logistics operations.",
      responsibilities: ["Oracle APEX Development", "PL/SQL Development", "Database Design", "Business Process Automation", "Dashboard Development", "Enterprise Applications"],
      tags: ["Oracle APEX", "PL/SQL", "Oracle DB", "Enterprise"]
    },
    {
      company: "Ontographica",
      role: "AI Engineering & Knowledge Graph Intern",
      period: "2026 — Present",
      duration: "3 Months",
      location: "Remote",
      status: "current",
      description: "Currently building knowledge graph systems, semantic web ontologies, and AI data pipelines. Working with cutting-edge semantic web technologies to integrate structured knowledge into AI workflows.",
      responsibilities: ["Knowledge Graph Engineering", "RDF & OWL Ontologies", "SPARQL Queries", "Semantic Web Development", "Python AI Pipelines", "Data Integration & Automation"],
      tags: ["Knowledge Graphs", "RDF", "OWL", "SPARQL", "Python", "AI"]
    }
  ];

  const whyChooseMe = [
    { icon: "Smartphone", title: "Mobile Responsive", description: "Every project works flawlessly across all devices and screen sizes." },
    { icon: "Palette", title: "Modern UI/UX", description: "Clean, premium designs that impress users, clients, and stakeholders alike." },
    { icon: "Gauge", title: "Fast Performance", description: "Optimized for speed — sub-second load times as standard practice." },
    { icon: "Code2", title: "Clean Code", description: "Readable, maintainable, well-documented code following industry best practices." },
    { icon: "Search", title: "SEO Friendly", description: "Built with search engine visibility and accessibility from the ground up." },
    { icon: "Users", title: "Collaborative", description: "Clear communication, proactive updates, and a team-player mindset on every project." },
    { icon: "ShieldCheck", title: "Secure Development", description: "Security best practices applied throughout the full development lifecycle." },
    { icon: "BadgeCheck", title: "Reliable Delivery", description: "Consistent, on-time delivery with thorough testing before any handoff." },
  ];

  const processSteps = [
    { step: "01", title: "Discovery", description: "Understanding goals, audience, and requirements thoroughly — asking the right questions before writing a single line of code." },
    { step: "02", title: "Planning", description: "A detailed project plan, timeline, and technical specification is defined, tailored to the specific problem space." },
    { step: "03", title: "Design", description: "Wireframes and visual designs are created and reviewed first — nothing is built without a clear, approved direction." },
    { step: "04", title: "Development", description: "Clean, efficient code written using modern technologies, with regular progress updates throughout the build." },
    { step: "05", title: "Testing", description: "Thorough testing across devices and browsers ensures everything functions perfectly before delivery." },
    { step: "06", title: "Delivery", description: "Full deployment support, domain setup, and performance verification — ensuring a smooth, successful handoff." },
    { step: "07", title: "Support", description: "Post-launch availability to handle issues, tweaks, or questions — reliable communication doesn't stop at delivery." },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Jenish built our House of Elleora e-commerce platform from scratch and delivered beyond our expectations. The design was premium, the experience was smooth, and the whole process was seamless. Highly recommend him for any serious web project.",
      author: "Antony Jeyakumar",
      role: "Founder",
      company: "House of Elleora",
      stars: 5
    }
  ];

  const statistics = [
    { value: "12+", label: "Projects Delivered" },
    { value: "3", label: "Professional Internships" },
    { value: "10+", label: "Technologies Mastered" },
    { value: "4+", label: "Domains of Expertise" },
  ];

  const skillCategories = [
    { icon: "Code2", title: "Programming", color: "emerald", skills: ["Python", "Java", "JavaScript", "TypeScript"] },
    { icon: "Layout", title: "Frontend", color: "blue", skills: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"] },
    { icon: "Server", title: "Backend", color: "purple", skills: ["Node.js", "Express.js"] },
    { icon: "Database", title: "Database", color: "orange", skills: ["MySQL", "PostgreSQL", "Oracle Database", "MongoDB"] },
    { icon: "Building2", title: "Enterprise", color: "red", skills: ["Oracle APEX", "PL/SQL", "Semantic Web", "RDF", "OWL", "SPARQL", "Knowledge Graphs"] },
    { icon: "BrainCircuit", title: "AI & Data Science", color: "pink", skills: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"] },
    { icon: "Wrench", title: "Developer Tools", color: "zinc", skills: ["Git", "GitHub", "Docker", "VS Code", "Figma", "Postman", "Vercel", "Netlify"] },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
    blue: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
    purple: "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
    orange: "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/30",
    red: "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30",
    pink: "bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-500/30",
    zinc: "bg-zinc-100 dark:bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 border-zinc-200 dark:border-zinc-500/30",
  };

  const iconMap: Record<string, React.ReactElement> = {
    Globe: <Globe className="w-6 h-6" />, GraduationCap: <GraduationCap className="w-6 h-6" />,
    UtensilsCrossed: <UtensilsCrossed className="w-6 h-6" />, UserCircle: <UserCircle className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />, ShoppingCart: <ShoppingCart className="w-6 h-6" />,
    Building2: <Building2 className="w-6 h-6" />, BrainCircuit: <BrainCircuit className="w-6 h-6" />,
    Wrench: <Wrench className="w-6 h-6" />, TrendingUp: <TrendingUp className="w-6 h-6" />,
    Smartphone: <Smartphone className="w-6 h-6" />, Palette: <Palette className="w-6 h-6" />,
    Gauge: <Gauge className="w-6 h-6" />, Code2: <Code2 className="w-6 h-6" />,
    Search: <Search className="w-6 h-6" />, Users: <Users className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />, BadgeCheck: <BadgeCheck className="w-6 h-6" />,
    Layout: <Layout className="w-6 h-6" />, Server: <Server className="w-6 h-6" />,
    Database: <Database className="w-6 h-6" />,
  };

  return (
    <>
      {/* Hello Loading Screen */}
      <AnimatePresence>
        {showHello && <HelloLoadingScreen onComplete={handleHelloComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {showContent && (
        <div ref={containerRef} className="bg-[#f5f5f0] dark:bg-[#0a0a0a] text-[#1a1a1a] dark:text-[#f5f5f0] transition-colors duration-300">
          {/* Scroll Progress */}
          <ScrollProgress />

          {/* Custom Cursor Trail */}
          <CustomCursorTrail />

          {/* Floating Contact Button */}
          <FloatingContactButton />

          {/* ── Navigation ──────────────────────────────────────────────── */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f0]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors duration-300"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-black dark:border-white rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-sm font-bold">AJ</span>
                </div>
                <span className="text-lg font-semibold tracking-tight">ANTONY JENISH</span>
              </div>

              <div className="hidden md:flex items-center gap-8 text-sm">
                {["Work", "Services", "About", "Contact"].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="relative group hover:opacity-80 transition-opacity">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-current group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 dark:hover:bg-white/80 transition-colors flex items-center gap-2"
                >
                  Let's Talk
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.nav>

          {/* ── Hero Section ─────────────────────────────────────────────── */}
          <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden"
          >
            {/* Particle field background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <ParticleCanvas
                count={55}
                color="100,100,120"
                scrollY={scrollY}
                className="opacity-40 dark:opacity-20"
              />
            </div>

            {/* Gradient orbs — parallax at slower speed */}
            <motion.div
              style={{ y: springY }}
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden
            >
              <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-400/10 dark:bg-indigo-600/8 blur-[100px]" />
              <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full bg-purple-400/10 dark:bg-purple-600/8 blur-[100px]" />
            </motion.div>

            {/* 3D Orb — desktop only, top-right background */}
            <div className="hidden lg:block absolute top-20 right-0 w-[420px] h-[420px] pointer-events-none" aria-hidden>
              <MorphingOrb scrollY={scrollY} color="#6366f1" className="w-full h-full" />
            </div>

            {/* Hero content */}
            <motion.div
              style={{ opacity: heroOpacity, scale: heroScale }}
              className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm uppercase tracking-wider text-black/60 dark:text-white/60 mb-6 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Open to Full-Time Roles, Internships &amp; Freelance
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-6xl md:text-8xl font-bold mb-6 leading-none"
                >
                  Antony<br />Jenish.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4 max-w-xl leading-relaxed"
                >
                  <TypingAnimation />
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-base text-black/60 dark:text-white/60 mb-8 max-w-xl leading-relaxed transition-colors"
                >
                  Final-year B.Tech IT student at Loyola-ICAM. I build AI-agent systems and full-stack products, and I've interned on Oracle APEX and knowledge-graph projects.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="flex flex-wrap gap-3 mb-10"
                >
                  <a
                    href="#work"
                    className="inline-flex min-h-[44px] items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
                  >
                    View projects
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/Antony_Jenish_Fernando_Resume_Final.pdf"
                    className="inline-flex min-h-[44px] items-center gap-2 border border-black/20 dark:border-white/20 px-6 py-2.5 rounded-full text-sm font-medium hover:border-black dark:hover:border-white transition-colors"
                  >
                    Résumé (PDF)
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-6"
                >
                  <div>
                    <div className="text-4xl font-bold">6</div>
                    <div className="text-sm text-black/60 dark:text-white/60 transition-colors">Featured Projects</div>
                  </div>
                  <div className="w-px h-12 bg-black/20 dark:bg-white/20 transition-colors" />
                  <div>
                    <div className="text-4xl font-bold">3</div>
                    <div className="text-sm text-black/60 dark:text-white/60 transition-colors">Internships</div>
                  </div>
                  <div className="w-px h-12 bg-black/20 dark:bg-white/20 transition-colors" />
                  <div>
                    <div className="text-4xl font-bold">4</div>
                    <div className="text-sm text-black/60 dark:text-white/60 transition-colors">Hackathon Builds</div>
                  </div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex items-center gap-2 mt-10 text-black/30 dark:text-white/30 text-xs uppercase tracking-widest"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                  Scroll to explore
                </motion.div>
              </motion.div>

              {/* Right: Profile card with parallax tilt */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ rotateY: 4, rotateX: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="relative w-full max-w-[500px] aspect-[3/4] rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 shadow-2xl group cursor-pointer p-8 transition-colors"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src="/profile.jpg"
                    alt="Portrait of Antony Jenish Fernando"
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 rounded-2xl"
                  />

                  {/* Shine overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[3rem]" />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-8 left-8 bg-white dark:bg-zinc-900 rounded-full px-6 py-3 shadow-xl flex items-center gap-3 border border-black/5 dark:border-white/10 transition-colors"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 rounded-full border-2 border-black dark:border-white flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                  <div className="text-left">
                    <div className="text-xs font-medium">Scroll down</div>
                    <div className="text-xs text-black/50 dark:text-white/50 transition-colors">to explore</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* ── Statistics Section ────────────────────────────────────────── */}
          <section className="py-16 px-6 border-t border-black/10 dark:border-white/10 transition-colors bg-white dark:bg-[#111111]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                {statistics.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  >
                    <AnimatedStat value={stat.value} label={stat.label} />
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-sm text-black/40 dark:text-white/40 mt-8 flex items-center justify-center gap-2 transition-colors"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Currently Interning at Ontographica · Open to Full-Time &amp; Freelance
              </motion.p>
            </div>
          </section>

          {/* ── Tech Stack Marquee ────────────────────────────────────────── */}
          <section className="py-12 px-6 border-t border-black/10 dark:border-white/10 transition-colors overflow-hidden">
            <div className="max-w-7xl mx-auto mb-6">
              <p className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40 text-center transition-colors">
                Tech Stack &amp; Tools
              </p>
            </div>
            <MarqueeStrip
              items={["React", "Next.js", "Oracle APEX", "Python", "Node.js", "TypeScript", "TensorFlow", "PostgreSQL", "Docker", "GSAP"]}
            />
          </section>

          {/* ── Quote 1 ──────────────────────────────────────────────────── */}
          <QuoteSection
            quote="The best way to predict the future is to build it."
            author="Alan Kay"
          />

          {/* ── Services Section ──────────────────────────────────────────── */}
          <section id="services" className="py-24 px-6 bg-white dark:bg-[#0a0a0a] transition-colors">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <p className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40 mb-4 transition-colors">Capabilities &amp; Expertise</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  <ScrollRevealText text="What I Do" mode="words" />
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                  <RevealCard
                    key={i}
                    delay={i * 0.06}
                    direction={i % 2 === 0 ? "left" : "right"}
                    className="bg-[#f5f5f0] dark:bg-[#1a1a1a] rounded-2xl p-6 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all group cursor-default hover:-translate-y-1"
                  >
                    <div className="mb-4 text-black/70 dark:text-white/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{iconMap[service.icon]}</div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed transition-colors">{service.description}</p>
                  </RevealCard>
                ))}
              </div>
            </div>
          </section>

          {/* ── Selected Works ────────────────────────────────────────────── */}
          <section id="work" className="py-24 px-6 bg-white dark:bg-[#0a0a0a] transition-colors">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm text-emerald-500 font-mono mb-2 tracking-wider">PORTFOLIO</p>
                <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white transition-colors">
                  <ScrollRevealText text="FEATURED PROJECTS" mode="words" />
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg transition-colors">
                  Six projects. Each one says what I built, and when it was a hackathon, a team effort or built on someone else's code.
                </p>
              </div>

              <FeaturedProjects />
            </div>
          </section>

          {/* ── Quote 2 ──────────────────────────────────────────────────── */}
          <QuoteSection
            quote="In God we trust. All others must bring data."
            author="W. Edwards Deming"
          />

          {/* ── About Section ─────────────────────────────────────────────── */}
          <section id="about" className="py-24 px-6 bg-[#f5f5f0] dark:bg-[#0a0a0a] transition-colors">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40 mb-8 transition-colors">About Me</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">
                  <ScrollRevealText text="Versatile technology professional — building modern web experiences, enterprise applications, and AI-powered solutions." mode="words" delay={0.1} />
                </h2>

                <div className="prose prose-lg max-w-none mb-16">
                  <p className="text-xl text-black/70 dark:text-white/70 leading-relaxed mb-6 transition-colors">
                    I'm Antony Jenish Fernando — a Full Stack Developer, Oracle APEX Developer, and AI Engineer pursuing B.Tech in Information Technology at Loyola-ICAM College of Engineering and Technology in Chennai, India.
                  </p>
                  <p className="text-lg text-black/60 dark:text-white/60 leading-relaxed mb-6 transition-colors">
                    I'm actively seeking full-time roles, internships, and freelance collaborations in Software Engineering, AI/ML, Oracle APEX, and Data. I build modern responsive websites, enterprise Oracle APEX applications, and AI-powered systems — bringing both technical depth and a product mindset to every engagement.
                  </p>
                  <p className="text-lg text-black/60 dark:text-white/60 leading-relaxed transition-colors">
                    Through my internship at Ontographica, I work on Knowledge Graph engineering, Semantic Web technologies (RDF, OWL, SPARQL), and AI data pipelines. My project portfolio spans luxury e-commerce platforms, AI-powered SaaS systems, and ML dashboards — each driven by real business outcomes.
                  </p>
                </div>

                {/* Experience Timeline with animated line */}
                <p className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40 mb-8 transition-colors">Professional Experience</p>
                <div className="relative pl-6 mb-16">
                  <TimelineLine />
                  <div className="space-y-6">
                    {internships.map((exp, i) => (
                      <RevealCard
                        key={i}
                        delay={i * 0.18}
                        direction="left"
                        className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-2xl font-semibold">{exp.role}</h3>
                              {exp.status === "current" && (
                                <span className="flex items-center gap-1 text-xs px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 rounded-full font-medium">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                  Currently Working
                                </span>
                              )}
                            </div>
                            <p className="text-black/60 dark:text-white/60 mb-3 font-medium transition-colors">{exp.company}</p>
                            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-4 transition-colors">{exp.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {exp.responsibilities.map((r, j) => (
                                <span key={j} className="text-xs px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded-lg flex items-center gap-1.5 transition-colors">
                                  <span className="w-1 h-1 bg-black/40 dark:bg-white/40 rounded-full" />
                                  {r}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-medium whitespace-nowrap">{exp.period}</p>
                            <p className="text-sm text-black/60 dark:text-white/60 transition-colors">{exp.location}</p>
                            {exp.duration && (
                              <span className="inline-block mt-2 text-xs px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full font-medium transition-colors">
                                <Clock className="w-3 h-3 inline-block mr-1" />{exp.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {exp.tags.map((tag) => (
                            <span key={tag} className="text-xs px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full transition-colors">{tag}</span>
                          ))}
                        </div>
                      </RevealCard>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <p className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40 mb-8 transition-colors">Education</p>
                <div className="space-y-6">
                  {[{
                    role: "B.Tech Information Technology",
                    company: "Loyola-ICAM College of Engineering",
                    period: "2023 — 2027",
                    location: "Chennai, India",
                    description: "Specializing in Data Science, Machine Learning, and AI. Active participant in tech events, hackathons, and collaborative projects. Strong foundation in algorithms, data structures, and statistical analysis.",
                    tags: ["Education", "AI/ML", "Data Science", "Full Stack"]
                  }].map((exp, i) => (
                    <RevealCard key={i} delay={0.1} direction="up" className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold mb-1">{exp.role}</h3>
                          <p className="text-black/60 dark:text-white/60 mb-3 transition-colors">{exp.company}</p>
                          <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed transition-colors">{exp.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-medium whitespace-nowrap">{exp.period}</p>
                          <p className="text-sm text-black/60 dark:text-white/60 transition-colors">{exp.location}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full transition-colors">{tag}</span>
                        ))}
                      </div>
                    </RevealCard>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Technical Skills Section ──────────────────────────────────── */}
          <section className="py-20 px-6 bg-zinc-50 dark:bg-[#0a0a0a] transition-colors">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 transition-colors">Expertise</p>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white transition-colors">
                  <ScrollRevealText text="Technical Skills" mode="words" />
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((category, i) => (
                  <RevealCard
                    key={i}
                    delay={i * 0.08}
                    direction="up"
                    className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 border border-zinc-200 dark:border-white/10 transition-colors group"
                  >
                    <div className="mb-4 text-black/70 dark:text-white/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors transform group-hover:rotate-12 duration-300">
                      {iconMap[category.icon]}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white transition-colors">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, si) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 + si * 0.05, type: "spring", stiffness: 300 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.08, y: -2 }}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-colors cursor-default ${colorMap[category.color]}`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </RevealCard>
                ))}
              </div>
            </div>
          </section>

          {/* ── Why Choose Me Section ────────────────────────────────────── */}
          <section className="py-24 px-6 bg-white dark:bg-[#111111] transition-colors">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <p className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40 mb-4 transition-colors">Why Work With Me</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  <ScrollRevealText text="What I Bring to the Table" mode="words" />
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyChooseMe.map((item, i) => (
                  <RevealCard
                    key={i}
                    delay={i * 0.07}
                    direction="up"
                    className="bg-[#f5f5f0] dark:bg-[#1a1a1a] rounded-2xl p-6 border border-black/5 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all group hover:-translate-y-1 cursor-default"
                  >
                    <div className="mb-3 text-black/70 dark:text-white/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{iconMap[item.icon]}</div>
                    <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item.title}
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed transition-colors">{item.description}</p>
                  </RevealCard>
                ))}
              </div>
            </div>
          </section>

          {/* ── Process Section ───────────────────────────────────────────── */}
          <section className="py-24 px-6 bg-[#f5f5f0] dark:bg-[#0a0a0a] transition-colors">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <p className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40 mb-4 transition-colors">How I Operate</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  <ScrollRevealText text="My Approach" mode="words" />
                </h2>
              </motion.div>

              <div className="space-y-6">
                {processSteps.map((step, i) => (
                  <ProcessStep key={i} {...step} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* ── Quote 3 ──────────────────────────────────────────────────── */}
          <QuoteSection
            quote="Without data, you're just another person with an opinion."
            author="W. Edwards Deming"
          />

          {/* ── Testimonials Section ─────────────────────────────────────── */}
          <section className="py-24 px-6 bg-white dark:bg-[#111111] transition-colors">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <p className="text-sm uppercase tracking-wider text-black/40 dark:text-white/40 mb-4 transition-colors">Voices of Collaboration</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Testimonials</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, i) => (
                  <RevealCard
                    key={testimonial.id}
                    delay={i * 0.12}
                    direction="up"
                    className="bg-[#f5f5f0] dark:bg-[#1a1a1a] rounded-2xl p-8 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all hover:-translate-y-2 cursor-default"
                  >
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.stars }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-black dark:fill-white text-black dark:text-white" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-black/20 dark:text-white/20 mb-4" />
                    <p className="text-black/70 dark:text-white/70 mb-6 leading-relaxed transition-colors">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t border-black/5 dark:border-white/10 pt-4">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-black/60 dark:text-white/60 transition-colors">{testimonial.role}</p>
                      <p className="text-xs text-black/40 dark:text-white/40 mt-1 transition-colors">{testimonial.company}</p>
                    </div>
                  </RevealCard>
                ))}
              </div>
            </div>
          </section>

          {/* ── Contact Section ───────────────────────────────────────────── */}
          <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-black text-white overflow-hidden">
            {/* Animated gradient mesh */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600 blur-[160px] animate-pulse" style={{ animationDuration: "4s" }} />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600 blur-[140px] animate-pulse" style={{ animationDuration: "6s", animationDelay: "2s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-700 blur-[120px] animate-pulse" style={{ animationDuration: "5s", animationDelay: "1s" }} />
              </div>
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "80px 80px",
                }}
              />
            </div>
            <div className="relative z-10">
              <ContactFormSection contact={contact} />
            </div>
          </section>
        </div>
      )}

      {/* Global marquee animation */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: max-content;
        }
      `}</style>
    </>
  );
};

export default HomeMinimal;
