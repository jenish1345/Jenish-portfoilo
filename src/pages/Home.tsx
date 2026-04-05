import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, ExternalLink, ArrowRight, Briefcase, Code2, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [scrolled, setScrolled] = useState(false);
  
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const { personal, education, projects, contact } = portfolioData;

  // Loading animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    if (loading) return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loading]);

  // GSAP ScrollTrigger
  useEffect(() => {
    if (loading) return;

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((elem) => {
      gsap.fromTo(
        elem,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Timeline animation
    const timelineItems = gsap.utils.toArray<HTMLElement>(".timeline-item");
    timelineItems.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [loading]);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".cursor-hover")) {
        setCursorVariant("hover");
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll(".cursor-hover").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [loading]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -80 });
    }
  };

  if (loading) {
    return (
      <motion.div
        exit={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] bg-[#0B0F19] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#1a1f3a] to-[#0B0F19]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F5FF]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[120px] animate-pulse" />
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-[#00F5FF] via-white to-[#8A2BE2] bg-clip-text text-transparent mb-6">
              JA
            </h1>
            <p className="text-gray-400 text-lg mb-8">Loading Experience</p>
          </motion.div>
          
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-500 mt-4 text-sm"
          >
            {progress}%
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E6EDF3] relative overflow-hidden cursor-none">
      
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: cursorVariant === "hover" ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ background: "rgba(0, 245, 255, 0.8)" }}
      />
      
      <motion.div
        className="fixed w-10 h-10 rounded-full border-2 border-[#00F5FF]/50 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: cursorVariant === "hover" ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#1a1f3a] to-[#0B0F19]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-[500px] h-[500px] bg-[#00F5FF]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#8A2BE2]/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black cursor-pointer cursor-hover"
            onClick={() => scrollToSection("hero")}
          >
            <span className="bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] bg-clip-text text-transparent">
              JA
            </span>
          </motion.div>
          
          <div className="hidden md:flex gap-8">
            {["About", "Experience", "Projects", "Contact"].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-gray-400 hover:text-[#00F5FF] transition-colors relative group cursor-hover"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 md:px-8 pt-20 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.p
              className="text-[#00F5FF] text-sm md:text-base font-medium mb-4 tracking-wider uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Welcome to my portfolio
            </motion.p>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-[#00F5FF] via-white to-[#8A2BE2] bg-clip-text text-transparent">
                JENISH ANTONY
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-3xl text-gray-400 mb-4 font-light"
            >
              Full Stack Developer & AI Enthusiast
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-12"
            >
              Crafting scalable applications and exploring the frontiers of artificial intelligence
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                className="px-8 py-4 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] rounded-full text-white font-semibold shadow-lg shadow-[#00F5FF]/20 cursor-hover flex items-center gap-2"
              >
                View My Work
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 border-2 border-[#00F5FF] rounded-full text-[#00F5FF] font-semibold hover:bg-[#00F5FF]/10 transition-colors cursor-hover"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-600"
            >
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-2 bg-gray-600 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 md:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-20">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-[#00F5FF]" />
              <span className="text-sm text-gray-400">About Me</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] bg-clip-text text-transparent">
                Who I Am
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {personal.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="reveal p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 cursor-hover"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#8A2BE2] flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                <p className="text-gray-400 mb-2">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.years}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="relative py-32 px-6 md:px-8 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-20">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Briefcase className="w-4 h-4 text-[#00F5FF]" />
              <span className="text-sm text-gray-400">Experience</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black">
              <span className="bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] bg-clip-text text-transparent">
                My Journey
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00F5FF] to-[#8A2BE2]" />
            
            {education.map((edu, i) => (
              <div
                key={i}
                className={`timeline-item relative mb-16 ${
                  i % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                }`}
              >
                <div className="absolute left-1/2 top-8 w-4 h-4 bg-[#00F5FF] rounded-full -translate-x-1/2 shadow-lg shadow-[#00F5FF]/50" />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 cursor-hover"
                >
                  <span className="text-sm text-[#00F5FF] font-medium">{edu.years}</span>
                  <h3 className="text-xl font-bold mt-2 mb-1">{edu.degree}</h3>
                  <p className="text-gray-400">{edu.institution}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="relative py-32 px-6 md:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-20">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Code2 className="w-4 h-4 text-[#00F5FF]" />
              <span className="text-sm text-gray-400">Portfolio</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 md:px-8 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-20">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Mail className="w-4 h-4 text-[#00F5FF]" />
              <span className="text-sm text-gray-400">Get in Touch</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Have a project in mind? Let's build something amazing together.
            </p>
          </div>

          <div className="reveal grid md:grid-cols-3 gap-6">
            <motion.a
              href={`mailto:${contact.email}`}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-center cursor-hover group"
            >
              <Mail className="w-8 h-8 text-[#00F5FF] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-gray-400">Send me a message</p>
            </motion.a>

            <motion.a
              href={contact.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-center cursor-hover group"
            >
              <Linkedin className="w-8 h-8 text-[#00F5FF] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-400">Connect with me</p>
            </motion.a>

            <motion.a
              href={`https://github.com/${personal.name.toLowerCase().replace(/\s+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-center cursor-hover group"
            >
              <Github className="w-8 h-8 text-[#00F5FF] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-sm text-gray-400">View my code</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 md:px-8 border-t border-white/10 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 Jenish Antony. Crafted with passion and precision.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -8);
    setRotateY(((x - centerX) / centerX) * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className="reveal group cursor-hover"
    >
      <div className="relative h-full">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        
        <div className="relative h-full p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">{project.emoji}</div>
            <div className="w-2 h-2 bg-[#00F5FF] rounded-full animate-pulse" />
          </div>
          
          <h3 className="text-xl font-bold mb-3 group-hover:text-[#00F5FF] transition-colors">
            {project.title}
          </h3>
          
          <p className="text-sm text-gray-400 mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-[#00F5FF] text-sm font-medium group-hover:gap-3 transition-all"
          >
            View Project
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
