import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import AIAssistant from "@/components/AIAssistant";
import ContactForm from "@/components/ContactForm";

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
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        {greetings.map((greeting, index) => (
          <motion.h1
            key={index}
            initial={{ opacity: 0 }}
            animate={index === greetingIndex ? { opacity: 1 } : index < greetingIndex ? { opacity: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="absolute text-7xl md:text-9xl font-black text-black tracking-tighter"
          >
            {greeting}
          </motion.h1>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 
            className="text-2xl font-black tracking-tighter cursor-pointer hover:italic transition-all" 
            onClick={() => scrollToSection('hero')}
          >
            JENISH
          </h1>
          <div className="hidden md:flex gap-10">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-bold tracking-wider hover:italic transition-all relative group uppercase"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-8 py-32 relative border-b-4 border-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none mb-6">
              ANTONY
            </h1>
            <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none">
              JENISH
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-4xl font-bold mb-8 tracking-tight"
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Information Technology student passionate about building scalable applications and exploring AI-driven solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-10 py-5 bg-black text-white text-lg font-bold hover:bg-white hover:text-black border-4 border-black transition-all flex items-center gap-3"
            >
              VIEW WORK
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-10 py-5 bg-white text-black text-lg font-bold hover:bg-black hover:text-white border-4 border-black transition-all"
            >
              CONTACT
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-black" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-black" />
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 relative border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">
              ABOUT
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-4 border-black p-8 bg-white"
            >
              <h3 className="text-3xl font-black mb-6 tracking-tight">WHO I AM</h3>
              <p className="text-lg leading-relaxed mb-6">
                {personal.summary}
              </p>
              <div className="flex gap-4 mt-8">
                <div className="w-16 h-16 bg-black" />
                <div className="w-16 h-16 border-4 border-black" />
              </div>
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
                  className="border-4 border-black p-6 bg-white hover:bg-black hover:text-white transition-all group"
                >
                  <GraduationCap className="w-8 h-8 mb-4" />
                  <h4 className="text-xl font-bold mb-2">{edu.degree}</h4>
                  <p className="font-semibold">{edu.institution}</p>
                  <p className="text-sm mt-2">{edu.years}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-8 relative border-b-4 border-black bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">
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
                className="border-4 border-white p-8 hover:bg-white hover:text-black transition-all group"
              >
                <h3 className="text-3xl font-black mb-6 tracking-tight">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 border-2 border-white text-sm font-bold group-hover:border-black"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-8 relative border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">
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
                className="border-4 border-black p-8 hover:bg-black hover:text-white transition-all group"
              >
                <div className="w-16 h-16 bg-black group-hover:bg-white mb-6" />
                <h3 className="text-2xl font-black mb-4 tracking-tight">{project.title}</h3>
                <p className="mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} className="border-2 border-black group-hover:border-white bg-transparent font-bold">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="ai-chat" className="py-32 px-8 relative border-b-4 border-black bg-black">
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
            className="mb-20"
          >
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">
              CONTACT
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-black mb-8 tracking-tight">GET IN TOUCH</h3>
              
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 p-6 border-4 border-black hover:bg-black hover:text-white transition-all group"
              >
                <Mail className="w-6 h-6" />
                <span className="font-bold">{contact.email}</span>
              </a>

              <a
                href={contact.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 border-4 border-black hover:bg-black hover:text-white transition-all group"
              >
                <Linkedin className="w-6 h-6" />
                <span className="font-bold">LinkedIn</span>
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 border-4 border-black hover:bg-black hover:text-white transition-all group"
              >
                <Github className="w-6 h-6" />
                <span className="font-bold">GitHub</span>
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
      <footer className="py-12 px-8 border-t-4 border-black bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-bold tracking-wider">© 2026 ANTONY JENISH FERNANDO</p>
          <p className="mt-2">ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
