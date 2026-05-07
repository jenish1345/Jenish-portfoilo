import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero3D from "@/components/Hero3D";
import { portfolioData } from "@/data/portfolioData";
import { Mail, ExternalLink, Github, Linkedin as LinkedinIcon } from "lucide-react";

const HomePremium = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const { projects, contact } = portfolioData;

  return (
    <div ref={containerRef} className="relative bg-[#09090b] text-white overflow-x-hidden">
      {/* Hero Section */}
      <Hero3D />

      {/* About Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-[#09090b] to-[#0f0f1a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl mx-auto mb-12">
              I'm a passionate Full Stack Developer and Machine Learning enthusiast, currently pursuing B.Tech in Information Technology. 
              I love building scalable applications and exploring AI-driven solutions that make a real impact.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: "🎓", title: "Education", desc: "B.Tech IT Student" },
                { icon: "💼", title: "Experience", desc: "9+ Projects Delivered" },
                { icon: "🚀", title: "Passion", desc: "AI & Web Development" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all"
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-[#0f0f1a] to-[#09090b]">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: "Frontend", icon: "🎨", skills: ["React", "Next.js", "Tailwind", "TypeScript"], color: "from-cyan-500 to-blue-500" },
                { category: "Backend", icon: "⚙️", skills: ["Node.js", "Express", "PostgreSQL", "APIs"], color: "from-purple-500 to-pink-500" },
                { category: "AI/ML", icon: "🤖", skills: ["Python", "ML Models", "Data Science", "Analytics"], color: "from-green-500 to-emerald-500" },
                { category: "Tools", icon: "🛠️", skills: ["Git", "VS Code", "Netlify", "Figma"], color: "from-orange-500 to-red-500" },
              ].map((skillSet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${skillSet.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                    {skillSet.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{skillSet.category}</h3>
                  <ul className="space-y-2">
                    {skillSet.skills.map((skill, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="text-zinc-400 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-[#09090b] to-[#0f0f1a]">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 6).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all overflow-hidden"
                >
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{project.emoji}</div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-zinc-400 mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-3 py-1 bg-white/10 border border-white/20 rounded-full text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-[#0f0f1a] to-[#09090b]">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

                  <div className="space-y-4">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500">Email</div>
                        <div className="font-medium">{contact.email}</div>
                      </div>
                    </a>

                    <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <LinkedinIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500">LinkedIn</div>
                        <div className="font-medium">Connect with me</div>
                      </div>
                    </a>

                    <a href="https://github.com/jenish1345" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-zinc-300 hover:text-cyan-400 transition-colors group">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Github className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500">GitHub</div>
                        <div className="font-medium">View my work</div>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const message = formData.get('message');
                    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
                    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
                  }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6"
                >
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10 bg-[#09090b]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-400">© 2026 Antony Jenish. Crafted with passion and precision.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePremium;
