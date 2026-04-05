import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolioData";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Mail, ArrowRight, Brain, Github as GithubIcon, Linkedin as LinkedinIcon } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import AIAssistant from "@/components/AIAssistant";
import ContactForm from "@/components/ContactForm";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [navBlurred, setNavBlurred] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const { personal, education, projects, contact } = portfolioData;

  // Initialize Lenis smooth scrolling
  useEffect(() => {
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

    // Navbar blur on scroll
    const handleScroll = () => {
      setNavBlurred(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (loading) return;

    // Animate sections on scroll
    gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax background elements
    gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((element) => {
      gsap.to(element, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading]);

  const skillCategories = {
    Frontend: {
      icon: "🎨",
      skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"]
    },
    Backend: {
      icon: "⚙️",
      skills: ["Java", "Spring Boot", "Node.js", "Python"]
    },
    "AI/ML": {
      icon: "🤖",
      skills: ["Python", "Machine Learning", "Data Science", "Deep Learning"]
    },
    Tools: {
      icon: "🛠️",
      skills: ["Git", "Docker", "VS Code", "Figma"]
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -80 });
    }
  };

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white relative overflow-x-hidden cursor-none">
      
      <CustomCursor />
      <ThemeSwitcher />

      {/* Parallax Background */}
      <div className="fixed inset-0 z-0 parallax-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#1a1f3a] to-[#0B0F19]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00F5FF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navBlurred 
            ? "bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10 shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex justify-between items-center">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-black text-white cursor-pointer" 
            onClick={() => scrollToSection('hero')}
          >
            JENISH ANTONY
          </motion.h1>
          <div className="hidden md:flex gap-8">
            {['About', 'Skills', 'Projects', 'Contact'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-semibold text-gray-400 hover:text-[#00F5FF] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        id="hero" 
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="relative min-h-screen flex items-center justify-center px-6 md:px-8 pt-24 pb-16 z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Animated greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <motion.p 
              className="text-lg md:text-xl text-gray-400 font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Hi, I'm
            </motion.p>
          </motion.div>

          {/* Name with gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-[#00F5FF] via-white to-[#8A2BE2] bg-clip-text text-transparent leading-none tracking-tight mb-4">
              JENISH ANTONY
            </h1>
            
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1 }}
              className="h-1 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] mx-auto max-w-md"
            />
          </motion.div>

          {/* Rotating titles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-8 h-16 flex items-center justify-center"
          >
            <motion.p
              key="title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl md:text-4xl font-bold text-gray-300"
            >
              Full Stack Developer
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Building scalable applications and exploring AI-driven solutions
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-6 text-base bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] hover:opacity-90 text-white rounded-full shadow-lg shadow-[#00F5FF]/20 group"
              >
                View Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="px-8 py-6 text-base border-2 border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF] hover:text-[#0B0F19] rounded-full"
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-500"
            >
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-2">
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-2 bg-gray-500 rounded-full" 
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6 md:px-8 z-10">
        <div className="max-w-6xl mx-auto scroll-reveal">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl"
            >
              <Brain className="w-12 h-12 text-[#00F5FF] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
              <p className="text-gray-300 leading-relaxed">
                {personal.summary}
              </p>
            </motion.div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="bg-gradient-to-br from-[#00F5FF]/10 to-[#8A2BE2]/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
                >
                  <GraduationCap className="w-10 h-10 text-[#00F5FF] mb-3" />
                  <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                  <p className="text-gray-300 font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-400 mt-1">{edu.years}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Quote */}
      <section id="skills" className="relative py-24 px-6 md:px-8 z-10">
        <div className="max-w-6xl mx-auto scroll-reveal">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
              Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] mx-auto" />
          </div>

          {/* Quote */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <blockquote className="text-2xl md:text-3xl font-semibold text-gray-300 italic relative py-8">
              <span className="text-6xl text-[#00F5FF]/30 absolute top-0 left-0">"</span>
              Code is like humor. When you have to explain it, it's bad.
              <span className="text-6xl text-[#8A2BE2]/30 absolute bottom-0 right-0">"</span>
            </blockquote>
            <p className="text-gray-400 mt-4">— Cory House</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skillCategories).map(([category, data], i) => (
              <motion.div
                key={category}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.span
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl"
                  >
                    {data.icon}
                  </motion.span>
                  <h3 className="text-2xl font-bold text-white">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge className="px-4 py-2 bg-gradient-to-r from-[#00F5FF]/20 to-[#8A2BE2]/20 border border-[#00F5FF]/30 text-white text-sm font-medium">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6 md:px-8 z-10">
        <div className="max-w-7xl mx-auto scroll-reveal">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
              Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="ai-chat" className="relative py-24 px-6 md:px-8 z-10">
        <div className="max-w-4xl mx-auto scroll-reveal">
          <AIAssistant />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6 md:px-8 z-10">
        <div className="max-w-4xl mx-auto scroll-reveal">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
              Get in Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
                { icon: LinkedinIcon, label: "LinkedIn", href: contact.linkedIn },
                { icon: GithubIcon, label: "GitHub", href: `https://github.com/${personal.name.toLowerCase().replace(/\s+/g, '')}` }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl group"
                >
                  <item.icon className="w-6 h-6 text-[#00F5FF] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-white">{item.label}</span>
                </motion.a>
              ))}
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 md:px-8 border-t border-white/10 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-bold text-white mb-2">
            © 2026 ANTONY JENISH FERNANDO
          </p>
          <p className="text-gray-400">Crafted with passion</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
