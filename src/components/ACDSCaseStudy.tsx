import { ArrowRight, CheckCircle2, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";

const ACDSCaseStudy = () => {
  return (
    <section className="relative z-20 container mx-auto px-6 md:px-12 py-24 pointer-events-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 relative animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.1s both" }}>
          <div className="text-6xl mb-6">🎓</div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
            ACDS Case Study
          </h2>
          <p className="text-lg font-normal text-zinc-400 max-w-2xl">
            Autonomous Company Diagnostic System - AI-powered business intelligence platform
          </p>
        </div>

        {/* Problem Statement */}
        <div className="mb-12 animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.2s both" }}>
          <div className="bg-[#0e0e11] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium text-white tracking-tight">The Problem</h3>
            </div>
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">
              Most companies rely on traditional dashboards that only show <span className="text-white font-medium">what is happening</span>, not <span className="text-white font-medium">why it's happening</span>. Business leaders struggle to:
            </p>
            <ul className="space-y-3">
              {[
                "Identify hidden risks before they become critical issues",
                "Understand root causes of operational inefficiencies",
                "Get actionable insights from massive amounts of data",
                "Make data-driven decisions quickly and confidently"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Solution */}
        <div className="mb-12 animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.3s both" }}>
          <div className="bg-[#0e0e11] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium text-white tracking-tight">The Solution</h3>
            </div>
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              ACDS is an AI-powered SaaS platform that transforms raw business data into strategic intelligence using <span className="text-emerald-400 font-medium">Groq Llama 3.3 70B</span> for advanced analysis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: "🔍",
                  title: "AI-Driven Anomaly Detection",
                  desc: "Automatically identifies unusual patterns and potential risks across all departments"
                },
                {
                  icon: "🧠",
                  title: "Root Cause Analysis",
                  desc: "Pinpoints the underlying reasons behind business issues using ML algorithms"
                },
                {
                  icon: "📊",
                  title: "Real-Time Health Monitoring",
                  desc: "Calculates company health scores with live updates from multiple data sources"
                },
                {
                  icon: "💡",
                  title: "Strategic Recommendations",
                  desc: "Provides actionable insights and improvement strategies for leadership teams"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-medium text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="mb-12 animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.4s both" }}>
          <div className="bg-[#0e0e11] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium text-white tracking-tight">Technical Stack</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "AI Model", value: "Groq Llama 3.3 70B" },
                { label: "Backend", value: "Node.js + Python" },
                { label: "Database", value: "PostgreSQL" },
                { label: "Frontend", value: "React + TypeScript" },
                { label: "Analytics", value: "Custom ML Pipeline" },
                { label: "Deployment", value: "Cloud Infrastructure" },
                { label: "Security", value: "Enterprise-grade" },
                { label: "API", value: "RESTful + GraphQL" }
              ].map((tech, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300">
                  <p className="text-xs text-zinc-500 mb-1">{tech.label}</p>
                  <p className="text-sm font-medium text-white">{tech.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Impact */}
        <div className="animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.5s both" }}>
          <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium text-white tracking-tight">Results & Impact</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[
                { metric: "10,000+", label: "Data Points Analyzed", icon: "📈" },
                { metric: "94%", label: "Detection Accuracy", icon: "🎯" },
                { metric: "70%", label: "Faster Risk Assessment", icon: "⚡" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-medium text-white mb-2">{stat.metric}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-lg font-medium text-white mb-4">Key Achievements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Reduced manual analysis time from days to minutes",
                  "Identified critical risks 3 weeks before traditional methods",
                  "Improved decision-making confidence by 85%",
                  "Automated executive reporting with AI-generated insights"
                ].map((achievement, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-base text-zinc-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <a
                href="https://github.com/jenish1345/acds_platform"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                View Project on GitHub
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ACDSCaseStudy;
