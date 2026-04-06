import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Database, 
  Globe, 
  CreditCard, 
  Building, 
  Fingerprint,
  Loader2,
  Check,
  X,
  Plus,
  ChevronDown,
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  ExternalLink
} from "lucide-react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const { personal, education, projects, contact } = portfolioData;

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
          <a href="#services" className="hover:text-zinc-200 transition-colors">Services</a>
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

              <button className="px-8 py-3.5 rounded-full border border-zinc-800 bg-transparent text-lg font-normal text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-colors backdrop-blur-sm">
                Contact Me
              </button>
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
