import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { GraduationCap, Briefcase, Github, Linkedin, Mail, Send, Code2, Sparkles, Rocket } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import AIAssistant from "@/components/AIAssistant";
import ContactForm from "@/components/ContactForm";
import AnimatedBackground from "@/components/AnimatedBackground";
import OceanBubbles from "@/components/OceanBubbles";

const greetings = ["Hello", "Vanakkam", "Hola", "Bonjour", "Hallo", "Ciao", "こんにちは"];

const Home = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showGreetings, setShowGreetings] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (showGreetings && greetingIndex < greetings.length) {
      const timer = setTimeout(() => setGreetingIndex(greetingIndex + 1), 700);
      return () => clearTimeout(timer);
    } else if (showGreetings && greetingIndex >= greetings.length) {
      const timer = setTimeout(() => setShowGreetings(false), 500);
      return () => clearTimeout(timer);
    }
  }, [greetingIndex, showGreetings]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { personal, education, areasOfInterest, projects, contact, languages } = portfolioData;

  const skillCategories = {
    Frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    Backend: ["Java", "Spring Boot", "Node.js", "Python"],
    "Data / AI": ["Python", "Machine Learning", "Data Science", "Data Analytics"],
    Tools: ["Git", "Docker", "VS Code", "Figma"]
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (showGreetings) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-200/30 via-transparent to-pink-200/30"></div>
        {greetings.map((greeting, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={index === greetingIndex ? { opacity: 1, scale: 1, rotateX: 0 } : index < greetingIndex ? { opacity: 0, scale: 1.5, rotateX: 90 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          >
            {greeting}
          </motion.p>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 relative overflow-x-hidden">
      <AnimatedBackground />
      
      {/* Soft cursor glow effect */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10 transition-all duration-500"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)',
        }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-2xl border-b border-white/30 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 tracking-tight cursor-pointer" 
            onClick={() => scrollToSection('hero')}
          >
            Antony Jenish Fernando
          </motion.h1>
          <div className="hidden md:flex gap-8">
            {['About', 'Skills', 'Projects', 'AI Chat', 'Contact'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.1 }}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-8 py-32 relative">
        <div className="absolute inset-0 bg-gradient-radial from-purple-200/30 via-transparent to-pink-200/20"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-6xl mx-auto relative z-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-6 animate-pulse" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-purple-600 mb-8 font-light tracking-widest uppercase"
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-9xl font-black mb-8 tracking-tight leading-tight"
          >
            <span className="text-gray-800">Antony </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 animate-gradient text-glow">
              Jenish
            </span>
            <span className="text-gray-800"> Fernando</span>
          </motion.h1>
          
          <div className="h-20 mb-10">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Java Developer',
                2000,
                'Machine Learning Enthusiast',
                2000,
                'Information Technology Student',
                2000,
              ]}
              wrapper="p"
              speed={50}
              className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-light tracking-wide"
              repeat={Infinity}
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed font-light"
          >
            Information Technology student passionate about building scalable applications and exploring AI-driven solutions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-5"
          >
            <motion.div whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white/60 backdrop-blur-xl hover:bg-white/80 text-purple-700 px-10 py-8 text-lg rounded-full font-semibold shadow-xl border-2 border-white/40 hover:shadow-2xl hover:shadow-purple-300/50 transition-all" onClick={() => scrollToSection('projects')}>
                <Rocket className="mr-2 h-5 w-5" />
                View Projects
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-2 border-purple-300/60 bg-white/40 backdrop-blur-xl text-purple-700 hover:bg-white/60 hover:shadow-xl hover:shadow-pink-300/50 px-10 py-8 text-lg rounded-full font-semibold transition-all" onClick={() => scrollToSection('contact')}>
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating elements with soft glow */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 text-6xl opacity-20"
        >
          💻
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 text-6xl opacity-20"
        >
          🚀
        </motion.div>
      </section>

      {/* About Section - Glassmorphism Cards */}
      <section id="about" className="min-h-screen py-32 px-8 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-100/30 to-transparent"></div>
        
        {/* Soft floating orbs */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 15 + i * 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-96 h-96 rounded-full blur-3xl"
              style={{
                background: i === 0 ? 'radial-gradient(circle, rgba(167, 139, 250, 0.3), transparent)' :
                           i === 1 ? 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent)' :
                           'radial-gradient(circle, rgba(147, 197, 253, 0.3), transparent)',
                top: `${20 + i * 25}%`,
                left: `${10 + i * 30}%`
              }}
            ></motion.div>
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/60 backdrop-blur-xl flex items-center justify-center shadow-2xl border-2 border-white/40">
                  <Code2 className="h-12 w-12 text-purple-600" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-purple-400"
                ></motion.div>
              </div>
            </motion.div>
            <h2 className="text-7xl md:text-9xl font-black mb-6 text-gray-800 tracking-tight">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">ME</span>
            </h2>
          </motion.div>

          {/* Code Block with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-300/40 via-pink-300/40 to-blue-300/40 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-white/60 backdrop-blur-2xl rounded-3xl p-12 border-2 border-white/50 shadow-2xl overflow-hidden max-w-4xl mx-auto">
                {/* Subtle shimmer effect */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                ></motion.div>
                
                <pre className="text-base md:text-lg text-purple-700 font-mono leading-relaxed overflow-x-auto relative z-10">
{`const jenish = {
  role: "Information Technology Student",
  skills: ["Java", "Python", "ML", "Web Design"],
  interests: ["AI", "IoT", "Blockchain"],
  passion: "Building impactful solutions",
  currentFocus: "AI-driven applications",
  location: "Chennai, India",
  status: "Available for opportunities"
};

console.log(jenish.passion); // 🚀`}
                </pre>
              </div>
            </motion.div>
          </motion.div>

          {/* Split Layout - Education & Experience */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-white/70 backdrop-blur-xl flex items-center justify-center shadow-xl border-2 border-white/50">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Education</h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ 
                      x: 10,
                      y: -5,
                      boxShadow: '0 20px 40px rgba(167, 139, 250, 0.3)'
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 to-transparent rounded-2xl blur-xl"></div>
                    <div className="relative bg-white/70 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-purple-500 shadow-lg border border-white/50">
                      <h4 className="text-xl font-bold text-gray-800 mb-2">{edu.degree}</h4>
                      <p className="text-purple-600 font-medium mb-1">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">{edu.years}</p>
                      {edu.stream && <p className="text-gray-400 text-sm mt-1">{edu.stream}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="pt-8 border-t-2 border-purple-300/50"
              >
                <div className="flex gap-8">
                  <div className="flex-1">
                    <p className="text-purple-600 font-bold mb-2 text-sm tracking-wider">LANGUAGES</p>
                    <p className="text-gray-700">{languages.join(" • ")}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-pink-600 font-bold mb-2 text-sm tracking-wider">LOCATION</p>
                    <p className="text-gray-700">{contact.location}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-white/70 backdrop-blur-xl flex items-center justify-center shadow-xl border-2 border-white/50">
                  <Briefcase className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500">Experience</h3>
              </div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  y: -10
                }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-pink-300/40 to-blue-300/40 rounded-3xl blur-2xl"></div>
                
                <div className="relative bg-white/70 backdrop-blur-2xl p-8 rounded-3xl border-2 border-white/50 shadow-2xl overflow-hidden">
                  <div className="relative z-10">
                    <div className="mb-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">Intern</h4>
                      <p className="text-pink-600 font-semibold text-lg">V.O. Chidambaranar Port Trust</p>
                    </div>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Gained hands-on experience in port operations, logistics management, and maritime technology systems.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['Port Operations', 'Logistics', 'Maritime Tech'].map((skill, i) => (
                        <motion.div
                          key={skill}
                          whileHover={{ scale: 1.1, y: -3 }}
                        >
                          <Badge className={`px-4 py-2 font-medium border-2 ${
                            i === 0 ? 'bg-purple-100/80 text-purple-700 border-purple-300/60' :
                            i === 1 ? 'bg-pink-100/80 text-pink-700 border-pink-300/60' :
                            'bg-blue-100/80 text-blue-700 border-blue-300/60'
                          }`}>
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section - Glass Cards */}
      <section id="skills" className="min-h-screen py-32 px-8 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100/30 to-transparent"></div>
        <OceanBubbles />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-white/70 backdrop-blur-xl flex items-center justify-center shadow-2xl border-2 border-white/50">
                <Code2 className="h-12 w-12 text-blue-600" />
              </div>
            </motion.div>
            <h2 className="text-7xl md:text-9xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 tracking-tight">
              SKILLS
            </h2>
          </motion.div>

          <div className="mb-32">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-16 text-center text-purple-700"
            >
              Tech Arsenal
            </motion.h3>
            
            <div className="grid md:grid-cols-2 gap-12">
              {Object.entries(skillCategories).map(([category, skills], catIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.2, duration: 0.8 }}
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 via-pink-300/30 to-blue-300/30 rounded-3xl blur-2xl"></div>
                    
                    <div className="relative bg-white/60 backdrop-blur-2xl rounded-3xl p-8 border-2 border-white/50 shadow-2xl overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">{catIndex + 1}</span>
                          </div>
                          <h4 className="text-3xl font-bold text-gray-800">{category}</h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {skills.map((skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              whileHover={{ scale: 1.1, y: -5 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1, type: "spring" }}
                            >
                              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-purple-200/60 hover:border-purple-400/80 hover:shadow-lg transition-all text-center cursor-pointer">
                                <span className="text-gray-700 font-medium hover:text-purple-700 transition-colors">{skill}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Areas of Interest */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="text-center mb-16">
              <motion.h3 
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 inline-block mb-4"
              >
                Areas of Interest
              </motion.h3>
              <motion.div
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-1 w-64 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto rounded-full"
              ></motion.div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
              {areasOfInterest.map((interest, index) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
                  className="relative group"
                >
                  <div className="relative w-64 h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-300/40 to-pink-300/40 blur-2xl rounded-3xl"></div>
                    
                    <div className="relative h-full bg-white/60 backdrop-blur-2xl rounded-3xl border-2 border-white/50 shadow-2xl flex items-center justify-center p-6">
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {index + 1}
                      </div>
                      
                      <div className="relative z-10 text-center">
                        <p className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors leading-relaxed">
                          {interest}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-32 px-8 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-8"
            >
              <Rocket className="h-20 w-20 text-pink-500" />
            </motion.div>
            <h2 className="text-7xl md:text-9xl font-black mb-6 text-gray-800 tracking-tight">
              PROJECTS
            </h2>
            <p className="text-xl text-purple-600 font-light">
              Innovative solutions showcasing technical expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="ai-chat" className="py-32 px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <AIAssistant />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-32 px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-6 text-gray-800 tracking-tight">Let's Connect</h2>
            <p className="text-xl text-gray-600 font-light">Interested in collaborations or tech discussions?</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-8">Contact Information</h3>
              <motion.a
                whileHover={{ scale: 1.05, x: 10 }}
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-xl rounded-2xl hover:shadow-xl hover:shadow-purple-200/50 transition-all group border-2 border-white/50"
              >
                <Mail className="h-6 w-6 text-purple-500 group-hover:text-purple-700 transition-colors" />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{contact.email}</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, x: 10 }}
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-xl rounded-2xl hover:shadow-xl hover:shadow-pink-200/50 transition-all group border-2 border-white/50"
              >
                <span className="text-xl text-pink-500 group-hover:text-pink-700 transition-colors">📱</span>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{contact.phone}</span>
              </motion.a>
              <div className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-white/50 shadow-lg">
                <span className="text-xl text-blue-500">📍</span>
                <span className="text-gray-700">{contact.location}</span>
              </div>
              <div className="flex gap-4 pt-4">
                <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100/80 hover:text-purple-700 w-12 h-12 transition-all border-2 border-purple-200/60" onClick={() => window.open(contact.linkedIn, '_blank')}>
                    <Linkedin className="h-6 w-6" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-100/80 hover:text-pink-700 w-12 h-12 transition-all border-2 border-pink-200/60" onClick={() => window.open('https://github.com/jenish1345', '_blank')}>
                    <Github className="h-6 w-6" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-xl border-t border-white/30 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-600 text-sm font-light">
            © 2026 Antony Jenish Fernando. Built with React + TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
