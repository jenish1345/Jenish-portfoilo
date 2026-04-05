import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Mail, Linkedin, Github, ExternalLink, Code2, GraduationCap, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const { personal, education, projects, contact } = portfolioData;

  // Loading
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#09090b] flex items-center justify-center">
        <div className="fixed inset-0 bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#09090b]" />
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-zinc-400/5 rounded-full blur-[100px]" />
        <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-zinc-400/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-7xl md:text-9xl font-medium text-white/95 mb-6 tracking-tight">JA</h1>
            <p className="text-zinc-400 text-base mb-8">Loading Experience</p>
          </motion.div>
          
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-white/80"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-x-hidden selection:bg-white/10">
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#09090b]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[60vh] bg-gradient-to-b from-zinc-400/30 via-zinc-500/5 to-transparent" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 h-56 bg-zinc-400/10 blur-[100px] rounded-full" />
        <div className="absolute -top-[50vh] w-[150vw] h-[100vh] rounded-[100%] border border-zinc-500/10 shadow-[0_0_120px_rgba(161,161,170,0.1)]" />
        <div className="absolute top-[20vh] w-[120vw] h-[120vh] rounded-[100%] border border-zinc-600/5 shadow-[0_0_80px_rgba(161,161,170,0.05)]" />
        <div className="absolute top-[30%] left-[15%] w-64 h-64 bg-zinc-500/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-zinc-400/5 blur-[100px] rounded-full" />
      </div>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <motion.div
            whileHover={{ opacity: 0.8 }}
            className="text-xl font-medium text-white/95 tracking-tight cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Jenish Antony
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-10 text-base font-normal text-zinc-400">
            {["About", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-zinc-200 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${contact.email}`}
              className="text-base font-normal text-zinc-300 hover:text-white transition-colors px-4 py-2 bg-black/50 backdrop-blur-sm border border-zinc-700/50 rounded-full"
            >
              Contact
            </a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-20 z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
            
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-10 text-left"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl leading-[1.1] font-medium text-white/95 tracking-tight">
                Full Stack Developer <br />
                <span className="text-zinc-500">Building the Future</span>
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ y: -3 }}
                  onClick={() => scrollToSection("projects")}
                  className="group relative inline-flex cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)] hover:-translate-y-[3px] shadow-[0_2.8px_2.2px_rgba(0,0,0,0.3),_0_6.7px_5.3px_rgba(0,0,0,0.35),_0_12.5px_10px_rgba(0,0,0,0.4)] overflow-hidden bg-zinc-900 border border-zinc-700/80 rounded-full px-8 py-3.5 items-center justify-center text-lg font-normal text-zinc-300 tracking-tight"
                >
                  <span className="relative z-10 flex items-center gap-2 transition-all duration-500 ease-out group-hover:translate-y-8 group-hover:opacity-0 group-hover:blur-md">
                    View My Work
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out transform -translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none opacity-0 blur-md font-medium">
                    View My Work
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <span className="absolute bottom-0 left-1/2 h-[1px] w-[70%] -translate-x-1/2 transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)] opacity-0 group-hover:opacity-80 bg-gradient-to-r from-transparent via-neutral-200 to-transparent rounded-full blur-[2px]" />
                  <span className="absolute bottom-0 left-0 right-0 h-full opacity-0 group-hover:opacity-60 transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)] pointer-events-none bg-gradient-to-t from-white/20 via-white/10 to-transparent rounded-full" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -3 }}
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3.5 rounded-full border border-zinc-800 bg-transparent text-lg font-normal text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-colors backdrop-blur-sm"
                >
                  Get in Touch
                </motion.button>
              </div>

              {/* Features List */}
              <div className="flex flex-col gap-5 pt-4">
                {[
                  { label: "Full Stack Development", desc: "React, Node.js, Python" },
                  { label: "AI & Machine Learning", desc: "Building intelligent solutions" },
                  { label: "Open Source", desc: "Contributing to the community" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-4 text-lg font-normal text-zinc-400 group"
                  >
                    <CheckCircle2 className="w-6 h-6 text-zinc-500 mt-0.5 group-hover:text-zinc-300 transition-colors flex-shrink-0" strokeWidth={1.5} />
                    <span>
                      <span className="text-zinc-200 font-medium">{item.label}:</span> {item.desc}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Floating Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative h-[650px] w-full"
            >
              {/* Glass Cards */}
              {[
                { top: "5%", left: "5%", rotate: -4, size: "w-48", aspect: "aspect-square", z: 61 },
                { top: "15%", right: "5%", rotate: 3, size: "w-56", aspect: "aspect-[4/3]", z: 62 },
                { top: "40%", left: "0%", rotate: -2, size: "w-44", aspect: "aspect-[3/4]", z: 63 },
                { top: "35%", right: "15%", rotate: 2, size: "w-64", aspect: "aspect-square", z: 64 },
                { bottom: "5%", left: "20%", rotate: 4, size: "w-52", aspect: "aspect-square", z: 62 },
                { bottom: "0%", right: "10%", rotate: -3, size: "w-44", aspect: "aspect-[4/3]", z: 61 }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, zIndex: 100 }}
                  className={`glass-card absolute ${card.size} ${card.aspect} p-3 transition-all duration-500 ease-out`}
                  style={{
                    top: card.top,
                    left: card.left,
                    right: card.right,
                    bottom: card.bottom,
                    rotate: `${card.rotate}deg`,
                    zIndex: card.z
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                      {["💻", "🚀", "⚡", "🎯", "🔥", "✨"][i]}
                    </div>
                  </div>
                  <div className="glass-highlight" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 md:px-12 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
              <span className="text-sm text-zinc-400">About Me</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Who I Am
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl">
              {personal.summary}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-8 transition-all duration-500 ease-out hover:scale-[1.02] relative group shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="glass-highlight" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-white tracking-tight mb-2">{edu.degree}</h3>
                  <p className="text-base text-zinc-400 mb-2">{edu.institution}</p>
                  <p className="text-sm text-zinc-500">{edu.years}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6 md:px-12 z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Code2 className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
              <span className="text-sm text-zinc-400">Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 transition-all duration-500 ease-out hover:scale-[1.02] relative group shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="glass-highlight" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{project.emoji}</div>
                    <div className="w-2 h-2 bg-white/20 rounded-full" />
                  </div>
                  
                  <h3 className="text-xl font-medium text-white tracking-tight mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-base text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-zinc-300 text-sm font-medium hover:text-white transition-colors group-hover:gap-3"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 md:px-12 z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Mail className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
              <span className="text-sm text-zinc-400">Get in Touch</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Let's Connect
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Have a project in mind? Let's build something amazing together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: "Email", href: `mailto:${contact.email}` },
              { icon: Linkedin, label: "LinkedIn", href: contact.linkedIn },
              { icon: Github, label: "GitHub", href: `https://github.com/${personal.name.toLowerCase().replace(/\s+/g, '')}` }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 text-center transition-all duration-500 ease-out hover:scale-[1.02] relative group shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="glass-highlight" />
                <div className="relative z-10">
                  <item.icon className="w-8 h-8 text-zinc-300 mx-auto mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <h3 className="font-medium text-white mb-2">{item.label}</h3>
                  <p className="text-sm text-zinc-400">Connect with me</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 md:px-12 border-t border-white/5 z-10">
        <div className="container mx-auto text-center">
          <p className="text-zinc-400">
            © 2026 Jenish Antony. Crafted with passion and precision.
          </p>
        </div>
      </footer>

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8),
                      inset 0 1px 1px rgba(255, 255, 255, 0.15),
                      inset 0 -1px 1px rgba(0, 0, 0, 0.3);
          border-radius: 1.5rem;
        }
        
        .glass-highlight {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.05) 100%);
          border-radius: 1.5rem;
          z-index: 10;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
