import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolioData";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Github, Linkedin, Mail, ArrowRight, Sparkles, Code2, Rocket, Brain, Zap } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import AIAssistant from "@/components/AIAssistant";
import ContactForm from "@/components/ContactForm";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { personal, education, projects, contact } = portfolioData;

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen text-gray-900 relative overflow-x-hidden cursor-none">
      
      <CustomCursor />
      <ThemeSwitcher />
      
      {/* Animated gradient background - Minimalistic */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-white" />
        <motion.div
          animate={{
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
        />
      </div>

      {/* Parallax mouse effect - Subtle */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10 blur-3xl"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{
          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, transparent 70%)',
        }}
      />

      {/* Navigation with glass effect - Minimalistic */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <motion.h1 
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-black text-gray-900 cursor-pointer" 
            onClick={() => scrollToSection('hero')}
          >
            JENISH ANTONY
          </motion.h1>
          <div className="hidden md:flex gap-10">
            {['About', 'Skills', 'Projects', 'Contact'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                {item}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gray-900"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D effects */}
      <motion.section 
        ref={heroRef}
        id="hero" 
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="min-h-screen flex flex-col items-center justify-center px-8 py-32 relative"
      >
        {/* Floating 3D elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(135deg, ${
                  i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#ec4899' : '#3b82f6'
                }, transparent)`
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-6xl mx-auto relative z-10"
        >
          {/* Animated icon - Minimalistic */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-20 w-20 text-gray-900 mx-auto" />
            </motion.div>
          </motion.div>

          {/* Main heading with stagger animation - BIGGER */}
          <div className="mb-8">
            {["ANTONY", "JENISH", "FERNANDO"].map((word, i) => (
              <motion.h1
                key={word}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.9 + i * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                className="text-8xl md:text-[12rem] lg:text-[14rem] font-black text-gray-900 leading-none tracking-tighter"
              >
                {word}
              </motion.h1>
            ))}
          </div>

          {/* Subtitle - Simple */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="mb-6"
          >
            <motion.p className="text-3xl md:text-5xl font-bold text-gray-700">
              Full Stack Developer
            </motion.p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Information Technology student passionate about building scalable applications and exploring AI-driven solutions.
          </motion.p>

          {/* CTA Buttons - Minimalistic Black */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection('projects')}
                className="group px-10 py-7 text-lg bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-2xl hover:shadow-gray-900/50 transition-all relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileHover={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center gap-2">
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="px-10 py-7 text-lg border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full shadow-xl transition-all"
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-gray-500">Scroll to explore</span>
            <motion.div
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-purple-500 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section with reveal animations */}
      <section id="about" className="py-32 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-7xl md:text-9xl font-black mb-6 text-gray-900">
              ABOUT ME
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -45 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200 shadow-xl hover:shadow-2xl transition-all"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Brain className="w-12 h-12 text-gray-900 mb-6" />
              <h3 className="text-4xl font-bold mb-6 text-gray-800">Who I Am</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {personal.summary}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 45 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl hover:shadow-gray-900/50 transition-all cursor-pointer"
                >
                  <GraduationCap className="w-12 h-12 mb-4" />
                  <h4 className="text-2xl font-bold mb-2">{edu.degree}</h4>
                  <p className="font-semibold text-gray-200">{edu.institution}</p>
                  <p className="text-sm mt-2 text-gray-300">{edu.years}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section with icons and quote */}
      <section id="skills" className="py-32 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-7xl md:text-9xl font-black mb-6 text-gray-900">
              SKILLS
            </h2>
          </motion.div>

          {/* Engaging Quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <motion.blockquote
              whileHover={{ scale: 1.02 }}
              className="text-3xl md:text-5xl font-bold text-gray-800 italic max-w-4xl mx-auto relative"
            >
              <span className="text-6xl text-gray-300 absolute -top-8 -left-4">"</span>
              Code is like humor. When you have to explain it, it's bad.
              <span className="text-6xl text-gray-300 absolute -bottom-8 -right-4">"</span>
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-xl text-gray-600"
            >
              — Cory House
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skillCategories).map(([category, data], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 100, rotateX: -45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200 shadow-xl transition-all"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl"
                  >
                    {data.icon}
                  </motion.div>
                  <h3 className="text-3xl font-bold text-gray-800">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {data.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + idx * 0.05 }}
                      whileHover={{ scale: 1.15, y: -5 }}
                    >
                      <Badge className="px-5 py-2 bg-gray-900 text-white border-0 text-sm font-semibold shadow-lg hover:bg-gray-800">
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
      <section id="projects" className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-7xl md:text-9xl font-black mb-6 text-gray-900">
              PROJECTS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100, rotateX: -45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -15, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="ai-chat" className="py-32 px-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <AIAssistant />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-7xl md:text-9xl font-black mb-6 text-gray-900">
              GET IN TOUCH
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
                { icon: Linkedin, label: "LinkedIn", href: contact.linkedIn },
                { icon: Github, label: "GitHub", href: contact.github }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 hover:shadow-xl transition-all group"
                >
                  <item.icon className="w-6 h-6 text-gray-900 group-hover:scale-125 transition-transform" />
                  <span className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">{item.label}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-8 border-t border-gray-200 bg-white/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black text-gray-900 mb-2"
          >
            © 2026 ANTONY JENISH FERNANDO
          </motion.p>
          <p className="text-gray-600">Crafted with passion and precision</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
