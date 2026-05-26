import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileCode, ExternalLink, Star } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

interface ProjectFolder {
  name: string;
  icon: string;
  projects: typeof portfolioData.projects;
  color: string;
}

const ProjectExplorer = () => {
  const [openFolders, setOpenFolders] = useState<string[]>(["Freelance Projects"]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const folders: ProjectFolder[] = [
    {
      name: "Freelance Projects",
      icon: "💼",
      color: "from-yellow-500/20 to-orange-500/20",
      projects: portfolioData.projects.filter(p => p.category === "Freelance")
    },
    {
      name: "AI & Intelligence",
      icon: "🤖",
      color: "from-purple-500/20 to-pink-500/20",
      projects: portfolioData.projects.filter(p => p.category === "AI/ML")
    },
    {
      name: "Web Applications",
      icon: "🌐",
      color: "from-blue-500/20 to-cyan-500/20",
      projects: portfolioData.projects.filter(p => p.category === "Web")
    },
    {
      name: "Mobile & Social",
      icon: "📱",
      color: "from-emerald-500/20 to-teal-500/20",
      projects: portfolioData.projects.filter(p => p.category === "Mobile")
    }
  ];

  const toggleFolder = (folderName: string) => {
    setOpenFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Explorer Header */}
      <div className="mb-8 flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
        <Folder className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-mono text-zinc-400">~/projects</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Folder Tree */}
        <div className="lg:col-span-1">
          <div className="bg-[#0e0e11] border border-white/5 rounded-2xl p-4 sticky top-24">
            <div className="space-y-2">
              {folders.map((folder) => {
                const isOpen = openFolders.includes(folder.name);
                return (
                  <div key={folder.name}>
                    {/* Folder Header */}
                    <button
                      onClick={() => toggleFolder(folder.name)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group"
                    >
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-zinc-500" />
                      )}
                      {isOpen ? (
                        <FolderOpen className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Folder className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                      )}
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                        {folder.name}
                      </span>
                      <span className="ml-auto text-xs text-zinc-600 bg-white/5 px-2 py-0.5 rounded">
                        {folder.projects.length}
                      </span>
                    </button>

                    {/* Project Files */}
                    {isOpen && (
                      <div className="ml-8 mt-1 space-y-1">
                        {folder.projects.map((project) => (
                          <button
                            key={project.id}
                            onClick={() => setSelectedProject(project.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left ${
                              selectedProject === project.id
                                ? "bg-emerald-500/10 border border-emerald-500/20"
                                : "hover:bg-white/5"
                            }`}
                          >
                            <FileCode className={`w-4 h-4 ${
                              selectedProject === project.id ? "text-emerald-400" : "text-zinc-600"
                            }`} />
                            <span className={`text-xs font-mono ${
                              selectedProject === project.id ? "text-emerald-400" : "text-zinc-400"
                            }`}>
                              {project.id}.tsx
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2">
          {selectedProject ? (
            (() => {
              const project = portfolioData.projects.find(p => p.id === selectedProject);
              if (!project) return null;

              return (
                <div className="bg-[#0e0e11] border border-white/5 rounded-2xl overflow-hidden">
                  {/* File Tab */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-mono text-zinc-300">{project.id}.tsx</span>
                    {project.featured && (
                      <Star className="w-4 h-4 text-yellow-400 ml-auto" fill="currentColor" />
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{project.emoji}</div>
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-1">{project.title}</h3>
                          <p className="text-sm text-zinc-500 font-mono">
                            Created {new Date().getFullYear() - 1} • Last updated recently
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-base text-zinc-300 leading-relaxed">{project.description}</p>
                    </div>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-white/10 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-emerald-400 mb-1">{value}</div>
                            <div className="text-xs text-zinc-500 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-zinc-300 hover:bg-white/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Live Project
                      </a>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="bg-[#0e0e11] border border-white/5 rounded-2xl p-12 text-center">
              <Folder className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 text-lg">Select a project to view details</p>
              <p className="text-zinc-600 text-sm mt-2">Click on any file in the explorer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectExplorer;
