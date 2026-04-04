import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Github, Linkedin, Mail, ArrowRight, Sparkles, Code2 } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import AIAssistant from "@/components/AIAssistant";
import ContactForm from "@/components/ContactForm";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const greetings = ["Hello", "Vanakkam", "Hola", "Bonjour", "Hallo"];

const Home = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showGreetings, setShowGreetings] = useState(true);

  useEffect(() => {
    if (showGreetings && greetingIndex < greetings.length) {
      const timer = setTimeout(() => setGreetingIndex(greetingIndex + 1), 600);
      return () => clearTimeout(timer);
    } else if (showGreetings && greetingIndex >= greetings.length) {
      const timer = setTimeout(() => setShowGreetings(false), 400);
      return () => clearTimeout(timer);
    }
  }, [greetingIndex, showGreetings]);

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
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
        {greetings.map((greeting, index) => (
          <motion.h1
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={index === greetingIndex ? { opacity: 1, scale: 1 } : index < greetingIndex ? { opacity: 0, scale: 1.2 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute text-7xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent"
          >
            {greeting}
          </motion.h1>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 relative overflow-x-hidden">
      
      <ThemeSwitcher />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-purple-200/50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform" 
            onClick={() => scrollToSection('hero')}
          >
            JENISH ANTONY
          </h1>
          <div className="hidden md:flex gap-10">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-8 py-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <Sparkles className="h-16 w-16 text-purple-500 mx-auto mb-6 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent leading-tight"
          >
            ANTONY JENISH
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-8"
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Information Technology student passionate about building scalable applications and exploring AI-driven solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button
              onClick={() => scrollToSection('projects')}
              className="group px-10 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="px-10 py-6 text-lg border-2 border-purple-500 text-purple-600 hover:bg-purple-50 rounded-full shadow-lg"
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-10 text-6xl opacity-20"
        >
          💻
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/4 right-10 text-6xl opacity-20"
        >
          🚀
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ABOUT ME
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-200 shadow-xl"
            >
              <h3 className="text-3xl font-bold mb-6 text-gray-800">Who I Am</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {personal.summary}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
                >
                  <GraduationCap className="w-10 h-10 mb-4" />
                  <h4 className="text-2xl font-bold mb-2">{edu.degree}</h4>
                  <p className="font-semibold text-purple-100">{edu.institution}</p>
                  <p className="text-sm mt-2 text-purple-100">{edu.years}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SKILLS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skillCategories).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all"
              >
                <h3 className="text-3xl font-bold mb-6 text-gray-800">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <Badge
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-sm font-semibold hover:scale-110 transition-transform"
                    >
                      {skill}
                    </Badge>
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              PROJECTS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <AIAssistant />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              GET IN TOUCH
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all group"
              >
                <Mail className="w-6 h-6 text-purple-600" />
                <span className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{contact.email}</span>
              </a>

              <a
                href={contact.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all group"
              >
                <Linkedin className="w-6 h-6 text-purple-600" />
                <span className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">LinkedIn</span>
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all group"
              >
                <Github className="w-6 h-6 text-purple-600" />
                <span className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">GitHub</span>
              </a>
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
      <footer className="py-12 px-8 border-t-2 border-purple-200 bg-white/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            © 2026 ANTONY JENISH FERNANDO
          </p>
          <p className="mt-2 text-gray-600">All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
