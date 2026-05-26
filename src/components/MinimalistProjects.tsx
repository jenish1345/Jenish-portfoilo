import { useState } from "react";
import { ExternalLink, Folder, FolderOpen, Terminal } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const MinimalistProjects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>("elleora-luxury");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const freelanceProjects = portfolioData.projects.filter(p => p.category === "Freelance");
  const otherProjects = portfolioData.projects.filter(p => p.category !== "Freelance");

  const allProjects = [...freelanceProjects, ...otherProjects];
  const currentProject = allProjects.find(p => p.id === selectedProject);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.1s both" }}>
        <p className="text-sm text-emerald-400 font-mono mb-2 tracking-wider">PORTFOLIO</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          FEATURED PROJECTS
        </h2>
        <p className="text-zinc-500 text-lg">Click to explore. Pop out to compare.</p>
      </div>

      {/* Terminal-style Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-on-scroll" style={{ animation: "animationIn 0.8s ease-out 0.2s both" }}>
        
        {/* Left Sidebar - Explorer */}
        <div className="lg:col-span-4 bg-[#0a0a0a] border border-emerald-500/20 rounded-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-[#0d0d0d] border-b border-emerald-500/20 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400">~/mithilesh/projects</span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            </div>
          </div>

          {/* Explorer Content */}
          <div className="p-4">
            <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">Explorer</div>
            
            {/* Freelancing Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 text-zinc-400">
                <FolderOpen className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-mono">Freelancing</span>
              </div>
              <div className="ml-6 space-y-1">
                {freelanceProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-all ${
                      selectedProject === project.id
                        ? "bg-emerald-500/20 text-emerald-400 border-l-2 border-emerald-400"
                        : hoveredProject === project.id
                        ? "bg-white/5 text-zinc-300"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {project.emoji} {project.title.split("•")[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-zinc-400">
                <FolderOpen className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-mono">Projects</span>
              </div>
              <div className="ml-6 space-y-1">
                {otherProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-all ${
                      selectedProject === project.id
                        ? "bg-emerald-500/20 text-emerald-400 border-l-2 border-emerald-400"
                        : hoveredProject === project.id
                        ? "bg-white/5 text-zinc-300"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {project.emoji} {project.title.split("•")[0].trim()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Project Details */}
        <div className="lg:col-span-8 bg-[#0a0a0a] border border-emerald-500/20 rounded-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-[#0d0d0d] border-b border-emerald-500/20 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-500">
                {currentProject?.id || "select-project"}
              </span>
              {currentProject && (
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30 font-mono">
                  {currentProject.category}
                </span>
              )}
            </div>
            <button className="text-zinc-500 hover:text-emerald-400 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Project Content */}
          {currentProject ? (
            <div className="p-8 space-y-6">
              {/* Project Header */}
              <div className="flex items-start gap-4">
                <div className="text-5xl">{currentProject.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                    {currentProject.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              {currentProject.metrics && (
                <div className="grid grid-cols-3 gap-4 py-4">
                  {Object.entries(currentProject.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-xs text-emerald-400 font-mono mb-1 uppercase">
                        &gt; {key.replace(/([A-Z])/g, '_$1').toLowerCase()}:
                      </div>
                      <div className="text-lg font-bold text-white">{value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-3">
                <div className="text-xs text-emerald-400 font-mono uppercase tracking-wider">
                  &gt; stack:
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs font-mono text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-sm font-mono">
                  <span className="text-emerald-400">&gt; status:</span>
                  <span className="text-zinc-400">Completed</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-mono">
                  <span className="text-emerald-400">&gt; impact:</span>
                  <span className="text-zinc-400">
                    {currentProject.metrics?.impact || "High-quality production deployment"}
                  </span>
                </div>
              </div>

              {/* View Project Button */}
              <div className="pt-6">
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Live Project
                </a>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Folder className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 font-mono">Select a project from the explorer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistProjects;
