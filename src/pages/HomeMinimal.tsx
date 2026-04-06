import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { ExternalLink, ArrowRight } from "lucide-react";
import Lenis from "lenis";
import SkillsVisualization from "@/components/SkillsVisualization";
import ContactFormSection from "@/components/ContactFormSection";
import BlogSection from "@/components/BlogSection";
import { trackProjectClick, trackEmailClick, trackSocialClick } from "@/components/Analytics";

const HomeMinimal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { projects, contact } = portfolioData;

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#f5f5f0] text-[#1a1a1a]">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f0]/80 backdrop-blur-md border-b border-black/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">AJ</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">ANTONY JENISH</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#work" className="hover:opacity-60 transition-opacity">Work</a>
            <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 transition-colors flex items-center gap-2"
          >
            Let's Talk
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm uppercase tracking-wider text-black/60 mb-6"
            >
              Available for Work
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 leading-none"
            >
              Antony<br />Jenish.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-black/70 mb-8 max-w-xl leading-relaxed"
            >
              Data Scientist & AI/ML Engineer crafting intelligent solutions that transform data into actionable insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6"
            >
              <div>
                <div className="text-4xl font-bold">9+</div>
                <div className="text-sm text-black/60">Projects Delivered</div>
              </div>
              <div className="w-px h-12 bg-black/20" />
              <div>
                <div className="text-4xl font-bold">3+</div>
                <div className="text-sm text-black/60">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Large Card Image (Julian Vance Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            {/* Main Card Container */}
            <div className="relative w-full max-w-[500px] aspect-[3/4] rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl group cursor-pointer p-8">
              {/* Photo */}
              <img
                src="/Profile-photoNEW.JPG"
                alt="Antony Jenish"
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 rounded-2xl"
              />
            </div>

            {/* Floating "Scroll down" Badge - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-8 left-8 bg-white rounded-full px-6 py-3 shadow-xl flex items-center gap-3 border border-black/5"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
              <div className="text-left">
                <div className="text-xs font-medium">Scroll down</div>
                <div className="text-xs text-black/50">to explore</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-black/40 text-center mb-12">
            Tech Stack & Tools
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {["Python", "TensorFlow", "Scikit-learn", "Pandas"].map((tech) => (
              <div key={tech} className="text-center text-2xl font-bold">{tech}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Freelancing Section */}
      <section className="py-24 px-6 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center">
                <span className="text-xs">💼</span>
              </div>
              <h2 className="text-sm uppercase tracking-wider">Freelance Projects</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.filter(p => p.id === "house-of-elleora").map((project, i) => (
              <motion.a
                key={project.id}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 mb-4">
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                    <div className="text-8xl mb-4">{project.emoji}</div>
                    <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-black/40">Freelance</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Live</span>
                  </div>
                  <h3 className="text-2xl font-semibold group-hover:opacity-60 transition-opacity">{project.title}</h3>
                  <p className="text-sm text-black/60 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 bg-white border border-black/10 rounded-full text-black/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section id="work" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center">
                <span className="text-xs">📁</span>
              </div>
              <h2 className="text-sm uppercase tracking-wider">Selected Works</h2>
            </div>
            <a href="#contact" className="text-sm hover:opacity-60 transition-opacity flex items-center gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => p.id !== "house-of-elleora").slice(0, 6).map((project, i) => (
              <motion.a
                key={project.id}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 mb-4">
                  {/* Project visual representation */}
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                    <div className="text-7xl mb-4">{project.emoji}</div>
                    <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-black/40">
                    {project.technologies[0]}
                  </p>
                  <h3 className="text-xl font-semibold group-hover:opacity-60 transition-opacity">
                    {project.title}
                  </h3>
                  <p className="text-sm text-black/60 line-clamp-2">{project.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#f5f5f0]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-wider text-black/40 mb-8">About Me</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">
              Passionate about transforming raw data into meaningful insights that drive decision-making and innovation.
            </h2>

            {/* Detailed Bio */}
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-xl text-black/70 leading-relaxed mb-6">
                I'm Antony Jenish Fernando, a Data Science enthusiast and AI/ML engineer currently pursuing B.Tech in Information Technology at Loyola-ICAM College of Engineering and Technology in Chennai, India.
              </p>
              <p className="text-lg text-black/60 leading-relaxed mb-6">
                My journey into data science began with a fascination for how data can tell stories and solve real-world problems. I specialize in building predictive models, analyzing complex datasets, and creating intelligent systems that learn and adapt. From customer churn prediction to autonomous diagnostic systems, I love working on projects that have tangible impact.
              </p>
              <p className="text-lg text-black/60 leading-relaxed mb-6">
                I'm proficient in Python, machine learning frameworks like TensorFlow and Scikit-learn, and data manipulation tools like Pandas and NumPy. I also have experience with data visualization using Matplotlib and building end-to-end ML pipelines. Beyond technical skills, I'm passionate about communicating insights effectively and collaborating with teams to turn data into actionable strategies.
              </p>
              <p className="text-lg text-black/60 leading-relaxed">
                When I'm not analyzing data or training models, you'll find me exploring new AI research papers, contributing to open-source projects, or working on personal projects that push the boundaries of what's possible with machine learning.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: "Machine Learning",
                  skills: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Neural Networks", "Model Optimization"]
                },
                {
                  title: "Data Analysis",
                  skills: ["Data Cleaning", "EDA", "Statistical Analysis", "Feature Engineering", "Data Visualization"]
                },
                {
                  title: "Tools & Frameworks",
                  skills: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "Jupyter", "Git"]
                }
              ].map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 border border-black/5"
                >
                  <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-sm text-black/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-black/30 rounded-full" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Experience Timeline */}
            <p className="text-sm uppercase tracking-wider text-black/40 mb-8">Experience & Education</p>
            <div className="space-y-6">
              {[
                {
                  role: "Data Science & AI/ML Projects",
                  company: "Independent Research & Development",
                  period: "2023 — Present",
                  location: "Chennai, India",
                  description: "Building predictive models, analyzing datasets, and creating intelligent systems. Focused on customer churn prediction, autonomous diagnostics, and machine learning applications.",
                  tags: ["Python", "ML", "Data Analysis", "AI"]
                },
                {
                  role: "B.Tech Information Technology",
                  company: "Loyola-ICAM College of Engineering",
                  period: "2023 — 2027",
                  location: "Chennai, India",
                  description: "Specializing in Data Science, Machine Learning, and AI. Active participant in tech events, hackathons, and collaborative projects. Strong foundation in algorithms, data structures, and statistical analysis.",
                  tags: ["Education", "AI/ML", "Data Science"]
                }
              ].map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="bg-white rounded-2xl p-8 border border-black/5 hover:border-black/20 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-1">{exp.role}</h3>
                      <p className="text-black/60 mb-3">{exp.company}</p>
                      <p className="text-sm text-black/60 leading-relaxed">{exp.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-medium whitespace-nowrap">{exp.period}</p>
                      <p className="text-sm text-black/60">{exp.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 bg-black/5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Visualization Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SkillsVisualization />
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section - Full Screen */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="text-sm uppercase tracking-wider text-white/40 mb-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for Work
            </p>

            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Let's create<br />something<br />extraordinary<br />together.
            </h2>
          </motion.div>

          {/* Contact Form */}
          <ContactFormSection />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 text-left">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-white/40 mb-6">Navigation</h3>
              <div className="space-y-3">
                <a href="#work" className="block hover:opacity-60 transition-opacity">Work</a>
                <a href="#about" className="block hover:opacity-60 transition-opacity">About</a>
                <a href="#contact" className="block hover:opacity-60 transition-opacity">Contact</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-white/40 mb-6">Socials</h3>
              <div className="space-y-3">
                <a 
                  href="https://github.com/jenish1345" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => trackSocialClick('GitHub')}
                  className="block hover:opacity-60 transition-opacity"
                >
                  GitHub
                </a>
                <a 
                  href={contact.linkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => trackSocialClick('LinkedIn')}
                  className="block hover:opacity-60 transition-opacity"
                >
                  LinkedIn
                </a>
                <a 
                  href={`mailto:${contact.email}`} 
                  onClick={() => trackEmailClick()}
                  className="block hover:opacity-60 transition-opacity"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-white/10 text-sm text-white/40 text-center">
            <p>© 2026 Antony Jenish. All rights reserved.</p>
            <p className="mt-2">Designed in Chennai</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeMinimal;
