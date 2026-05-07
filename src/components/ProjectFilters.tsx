import { useState } from "react";

interface ProjectFiltersProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

const ProjectFilters = ({ onFilterChange, activeFilter }: ProjectFiltersProps) => {
  const filters = [
    { id: "all", label: "All Projects", icon: "🎯" },
    { id: "AI/ML", label: "AI & ML", icon: "🤖" },
    { id: "Web", label: "Web Apps", icon: "🌐" },
    { id: "Mobile", label: "Mobile", icon: "📱" }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
            activeFilter === filter.id
              ? "bg-white/10 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
          }`}
        >
          <span className="text-base">{filter.icon}</span>
          <span>{filter.label}</span>
          {activeFilter === filter.id && (
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-50 animate-pulse" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilters;
