import { CheckCircle2 } from "lucide-react";

const Timeline = () => {
  const milestones = [
    {
      year: "2023",
      title: "Started B.Tech Journey",
      description: "Began Information Technology degree at Loyola-ICAM College",
      icon: "🎓",
      status: "completed"
    },
    {
      year: "2024",
      title: "First Freelance Project",
      description: "Delivered House of Elleora - Premium e-commerce platform",
      icon: "🛍️",
      status: "completed"
    },
    {
      year: "2024",
      title: "AI/ML Exploration",
      description: "Built ACDS platform with Groq Llama 3.3 70B integration",
      icon: "🤖",
      status: "completed"
    },
    {
      year: "2025",
      title: "Port Trust Internship",
      description: "Gained industry experience at V.O. Chidambaranar Port Trust",
      icon: "⚓",
      status: "completed"
    },
    {
      year: "2025",
      title: "Full-Stack Mastery",
      description: "Mastered React, Next.js, Node.js, and modern web technologies",
      icon: "💻",
      status: "current"
    },
    {
      year: "2027",
      title: "Future Goals",
      description: "Aiming for impactful roles in AI-driven product development",
      icon: "🚀",
      status: "upcoming"
    }
  ];

  return (
    <section className="relative z-20 container mx-auto px-6 md:px-12 py-24 pointer-events-auto">
      <div className="flex flex-col items-center justify-center text-center mb-16 relative animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.1s both" }}>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">My Journey</h2>
        <p className="text-lg font-normal text-zinc-400 max-w-2xl">From student to developer - tracking my growth and milestones</p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

        <div className="space-y-12">
          {milestones.map((milestone, i) => (
            <div
              key={i}
              className={`relative flex items-start gap-8 animate-on-scroll ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              style={{ animation: `animationIn 0.8s ease-out ${0.1 + i * 0.1}s both` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#0e0e11] border-2 border-white/20 flex items-center justify-center text-2xl z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                {milestone.icon}
              </div>

              {/* Content Card */}
              <div className={`flex-1 ml-24 md:ml-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                <div className="bg-[#0e0e11] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-all duration-500 hover:scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.3)] group">
                  <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                    <span className="text-sm font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                      {milestone.year}
                    </span>
                    {milestone.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" strokeWidth={2} />
                    )}
                    {milestone.status === "current" && (
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    )}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2 tracking-tight">{milestone.title}</h3>
                  <p className="text-base text-zinc-400 leading-relaxed">{milestone.description}</p>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
