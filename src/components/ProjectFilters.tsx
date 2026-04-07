import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectFiltersProps {
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'data', label: 'Data Science' },
  { id: 'web', label: 'Web Development' },
];

const ProjectFilters = ({ onFilterChange }: ProjectFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="flex items-center gap-6 mb-12 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className="relative text-sm font-medium whitespace-nowrap transition-colors hover:text-black/80"
        >
          <span className={activeFilter === filter.id ? 'text-black' : 'text-black/40'}>
            {filter.label}
          </span>
          {activeFilter === filter.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-black"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilters;
