import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Database, 
  Globe,
  Check,
  ArrowRight,
  Mail,
  ExternalLink
} from "lucide-react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const { projects, contact } = portfolioData;

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#09090b] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-7xl md:text-9xl font-medium text-white/95 mb-6 tracking-tight">JA</h1>
          <p className="text-zinc-400 text-base mb-8">Loading Experience</p>
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-white/80 transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-white/10 text-white bg-[#09090b] relative">
      
      {/* Background Glow Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[60vh] bg-gradient-to-b from-zinc-400/30 via-zinc-500/5 to-transparent z-10" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 h-56 bg-zinc-400/10 blur-[100px] rounded-full z-10" />
        <div className="absolute -top-[50vh] w-[150vw] h-[100vh] rounded-[100%] border border-zinc-500/10 shadow-[0_0_120px_rgba(161,161,170,0.1)]" />
        <div className="absolute top-[20vh] w-[120vw] h-[120vh] rounded-[100%] border border-zinc-600/5 shadow-[0_0_80px_rgba(161,161,170,0.05)]" />
        <div className="absolute top-[30%] left-[15%] w-64 h-64 bg-zinc-500/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-zinc-400/5 blur-[100px] rounded-full" />
      </div>

      {/* Navigation */}
      <header className="fixed flex md:px-12 z-50 pointer-events-auto pt-6 pr-6 pb-6 pl-6 top-0 right-0 left-0 items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 text-xl tracking-tight font-medium text-white hover:opacity-80 transition-opacity">
          Antony Jenish
        </a>
        
        <nav className="hidden md:flex items-center gap-10 text-base font-normal text-zinc-400">
          <a href="#about" className="hover:text-zinc-200 transition-colors">About</a>
          <a href="#projects" className="hover:text-zinc-200 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-zinc-200 transition-colors">Contact</a>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <a href={`mailto:${contact.email}`} className="text-base font-normal text-zinc-300 hover:text-white transition-colors px-4 py-2 bg-black/50 backdrop-blur-sm border border-zinc-700/50 rounded-full">
            Resume
          </a>
          
          <button className="group relative inline-flex min-w-[120px] cursor-pointer transition-all duration-1000 hover:-translate-y-[2px] hover:text-white shadow-[0_2.8px_2.2px_rgba(0,0,0,0.3),_0_6.7px_5.3px_rgba(0,0,0,0.35),_0_12.5px_10px_rgba(0,0,0,0.4)] overflow-hidden font-normal text-zinc-300 tracking-tight bg-[#09090b]/80 backdrop-blur-md border border-zinc-700/80 rounded-full px-5 py-2.5 items-center justify-center text-sm">
            <span className="relative z-10 flex items-center gap-2 rounded-full transition-all duration-500 ease-out group-hover:translate-y-8 group-hover:opacity-0 group-hover:blur-md">
              Hire Me Today
              <ArrowRight className="w-4 h-4" />
            </span>
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out transform -translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none opacity-0 rounded-full blur-md">
              Hire Me Today
              <ArrowRight className="w-4 h-4" />
            </span>
            <span className="absolute bottom-0 left-1/2 h-[1px] w-[70%] -translate-x-1/2 transition-all duration-1000 opacity-0 group-hover:opacity-80 bg-gradient-to-r from-transparent via-neutral-200 to-transparent rounded-full blur-[2px]" />
            <span className="absolute bottom-0 left-0 right-0 h-full opacity-0 group-hover:opacity-60 transition-all duration-1000 pointer-events-none bg-gradient-to-t from-white/20 via-white/10 to-transparent rounded-full" />
          </button>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center pt-32 pb-10 md:pb-16 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 pointer-events-auto min-h-[70vh] gap-x-16 gap-y-16 items-center">
          
          {/* Left Side */}
          <div className="flex flex-col gap-10 lg:pr-8 text-left">
            <h1 className="sm:text-6xl md:text-7xl leading-[1.1] animate-on-scroll text-5xl font-medium text-white/95 tracking-tight" style={{ animation: "animationIn 0.8s ease-out 0.1s both" }}>
              Antony Jenish <br />
              Full-Stack Developer <br />
              <span className="text-zinc-500">Digital Experiences</span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.2s both" }}>
              <button className="group relative inline-flex min-w-[120px] cursor-pointer transition-all duration-1000 hover:-translate-y-[3px] hover:text-white shadow-[0_2.8px_2.2px_rgba(0,0,0,0.3),_0_6.7px_5.3px_rgba(0,0,0,0.35),_0_12.5px_10px_rgba(0,0,0,0.4)] overflow-hidden font-normal text-zinc-300 tracking-tight bg-zinc-900 border border-zinc-700/80 rounded-full px-8 py-3.5 items-center justify-center text-lg">
                <span className="relative z-10 flex items-center gap-2 rounded-full transition-all duration-500 ease-out group-hover:translate-y-8 group-hover:opacity-0 group-hover:blur-md">
                  View My Work
                  <ArrowRight className="w-5 h-5" />
                </span>
                <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out transform -translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none font-medium opacity-0 rounded-full blur-md">
                  View My Work
                  <ArrowRight className="w-5 h-5" />
                </span>
                <span className="absolute bottom-0 left-1/2 h-[1px] w-[70%] -translate-x-1/2 transition-all duration-1000 opacity-0 group-hover:opacity-80 bg-gradient-to-r from-transparent via-neutral-200 to-transparent rounded-full blur-[2px]" />
                <span className="absolute bottom-0 left-0 right-0 h-full opacity-0 group-hover:opacity-60 transition-all duration-1000 pointer-events-none bg-gradient-to-t from-white/20 via-white/10 to-transparent rounded-full" />
              </button>

              <a href="#contact" className="px-8 py-3.5 rounded-full border border-zinc-800 bg-transparent text-lg font-normal text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-colors backdrop-blur-sm inline-flex items-center justify-center">
                Contact Me
              </a>
            </div>

            {/* Features List */}
            <div className="flex flex-col gap-5 pt-4 animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.3s both" }}>
              {[
                { label: "Frontend", desc: "React, Next.js, Tailwind" },
                { label: "Backend", desc: "Node.js, PostgreSQL, APIs" },
                { label: "Design", desc: "Pixel-perfect UI/UX" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 text-lg font-normal text-zinc-400 group">
                  <CheckCircle2 className="w-6 h-6 text-zinc-500 mt-0.5 group-hover:text-zinc-300 transition-colors flex-shrink-0" strokeWidth={1.5} />
                  <span>
                    <span className="text-zinc-200 font-medium">{item.label}:</span> {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Floating Image Cluster */}
          <div className="lg:h-[650px] hidden md:block animate-on-scroll w-full h-[500px] z-50 pointer-events-auto relative" style={{ animation: "animationIn 0.8s ease-out 0.4s both" }}>
            {[
              { top: "5%", left: "5%", rotate: -4, size: "w-40 lg:w-48", aspect: "aspect-square", z: 61 },
              { top: "15%", right: "5%", rotate: 3, size: "w-48 lg:w-56", aspect: "aspect-[4/3]", z: 62 },
              { top: "40%", left: "0%", rotate: -2, size: "w-36 lg:w-44", aspect: "aspect-[3/4]", z: 63 },
              { top: "35%", right: "15%", rotate: 2, size: "w-52 lg:w-64", aspect: "aspect-square", z: 64 },
              { bottom: "5%", left: "20%", rotate: 4, size: "w-44 lg:w-52", aspect: "aspect-square", z: 62 },
              { bottom: "0%", right: "10%", rotate: -3, size: "w-36 lg:w-44", aspect: "aspect-[4/3]", z: 61 }
            ].map((card, i) => (
              <div
                key={i}
                className={`glass-card absolute ${card.size} ${card.aspect} p-2 md:p-3 transition-all duration-500 ease-out hover:scale-105 hover:z-[100]`}
                style={{
                  top: card.top,
                  left: card.left,
                  right: card.right,
                  bottom: card.bottom,
                  transform: `rotate(${card.rotate}deg)`,
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
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Expertise & Skills Section */}
      <section id="about" className="z-20 container md:px-12 pointer-events-auto mx-auto pt-16 px-6 pb-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Frontend Excellence",
              desc: "Building responsive, accessible, and performant user interfaces with modern web technologies",
              icon: ShieldCheck,
              items: ["Performance", "Accessibility", "Best Practices", "SEO Ready"]
            },
            {
              title: "Robust Backend",
              desc: "Designing scalable APIs, database schemas, and secure server-side logic",
              icon: Database,
              items: ["API Gateway", "Database Cluster", "Authentication", "Security"]
            },
            {
              title: "UI/UX Integration",
              desc: "Translating pixel-perfect designs into interactive and fluid web experiences",
              icon: Globe,
              items: ["Core UI Kit", "Animations", "Responsive", "Testing"]
            }
          ].map((skill, i) => (
            <div
              key={i}
              className="flex flex-col bg-[#0e0e11] border border-white/5 rounded-3xl p-1.5 hover:bg-white/[0.02] transition-all duration-500 ease-out hover:scale-[1.02] hover:z-10 relative group shadow-[0_20px_40px_rgba(0,0,0,0.3)] animate-on-scroll"
              style={{ animation: `animationIn 0.8s ease-out ${0.1 + i * 0.1}s both` }}
            >
              <div className="h-64 rounded-[1.25rem] relative overflow-hidden flex items-center justify-center bg-[#131316] border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_60%)] pointer-events-none" />
                
                <div className="relative w-[85%] max-w-[260px] bg-[#09090b] border border-white/10 rounded-xl p-4 shadow-2xl z-10 flex flex-col group-hover:-translate-y-1 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <skill.icon className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-zinc-200">{skill.title}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-400/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-400/20 font-medium">Active</span>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {skill.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-[11px] text-zinc-400 font-medium">{item}</span>
                        <Check className={`w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors duration-500 delay-${(idx + 1) * 100}`} strokeWidth={2} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="px-5 py-6 flex flex-col gap-2">
                <h3 className="text-xl font-medium text-white tracking-tight">{skill.title}</h3>
                <p className="text-base font-normal text-zinc-400 leading-relaxed">{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-20 container mx-auto px-6 md:px-8 py-24 pointer-events-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16 relative animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.1s both" }}>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">Featured Projects</h2>
          <p className="text-lg font-normal text-zinc-400 max-w-2xl">Building scalable applications and exploring AI-driven solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project, i) => (
            <div
              key={project.id}
              className="flex flex-col bg-[#0e0e11] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition-all duration-500 ease-out hover:scale-[1.02] relative group shadow-[0_20px_40px_rgba(0,0,0,0.3)] animate-on-scroll"
              style={{ animation: `animationIn 0.8s ease-out ${0.1 + i * 0.1}s both` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{project.emoji}</div>
                <div className="w-2 h-2 bg-white/20 rounded-full" />
              </div>
              
              <h3 className="text-xl font-medium text-white tracking-tight mb-3">{project.title}</h3>
              <p className="text-base text-zinc-400 leading-relaxed mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400 font-medium">
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
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-20 container mx-auto px-6 md:px-12 py-24 pointer-events-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16 relative animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.1s both" }}>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">Get In Touch</h2>
          <p className="text-lg font-normal text-zinc-400 max-w-2xl">Let's collaborate on your next project or discuss opportunities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="flex flex-col gap-8 animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.2s both" }}>
            <div className="bg-[#0e0e11] border border-white/5 rounded-3xl p-8">
              <h3 className="text-2xl font-medium text-white mb-6">Contact Information</h3>
              
              <div className="flex flex-col gap-6">
                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-500 mb-1">Email</span>
                    <a href={`mailto:${contact.email}`} className="text-base text-zinc-200 hover:text-white transition-colors break-all">
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-500 mb-1">Phone</span>
                    <a href={`tel:${contact.phone}`} className="text-base text-zinc-200 hover:text-white transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-500 mb-1">Location</span>
                    <span className="text-base text-zinc-200">{contact.location}</span>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-500 mb-1">LinkedIn</span>
                    <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" className="text-base text-zinc-200 hover:text-white transition-colors inline-flex items-center gap-2">
                      Connect with me
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-500 mb-1">GitHub</span>
                    <a href="https://github.com/jenish1345" target="_blank" rel="noopener noreferrer" className="text-base text-zinc-200 hover:text-white transition-colors inline-flex items-center gap-2">
                      View my work
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.3s both" }}>
            <div className="bg-[#0e0e11] border border-white/5 rounded-3xl p-8">
              <h3 className="text-2xl font-medium text-white mb-6">Send a Message</h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
              }} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-zinc-400">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-zinc-400">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-zinc-400">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="group relative inline-flex w-full cursor-pointer transition-all duration-500 hover:-translate-y-[2px] hover:text-white shadow-[0_2.8px_2.2px_rgba(0,0,0,0.3),_0_6.7px_5.3px_rgba(0,0,0,0.35),_0_12.5px_10px_rgba(0,0,0,0.4)] overflow-hidden font-medium text-zinc-300 tracking-tight bg-white/5 border border-white/10 rounded-xl px-6 py-3.5 items-center justify-center text-base"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center rounded-xl transition-all duration-500 ease-out group-hover:translate-y-8 group-hover:opacity-0 group-hover:blur-md">
                    <Mail className="w-5 h-5" />
                    Send Message
                  </span>
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out transform -translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none opacity-0 rounded-xl blur-md">
                    <Mail className="w-5 h-5" />
                    Send Message
                  </span>
                  <span className="absolute bottom-0 left-1/2 h-[1px] w-[70%] -translate-x-1/2 transition-all duration-1000 opacity-0 group-hover:opacity-80 bg-gradient-to-r from-transparent via-neutral-200 to-transparent rounded-full blur-[2px]" />
                  <span className="absolute bottom-0 left-0 right-0 h-full opacity-0 group-hover:opacity-60 transition-all duration-1000 pointer-events-none bg-gradient-to-t from-white/20 via-white/10 to-transparent rounded-xl" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="relative z-20 py-12 px-6 md:px-12 border-t border-white/5">
        <div className="container mx-auto text-center">
          <p className="text-zinc-400">© 2026 Antony Jenish. Crafted with passion and precision.</p>
        </div>
      </footer>

      <style>{`
        @keyframes animationIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        .animate-on-scroll {
          animation-play-state: paused !important;
        }

        .animate-on-scroll.animate {
          animation-play-state: running !important;
        }

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
