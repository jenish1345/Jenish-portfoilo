import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/portfolio.types";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { toast } = useToast();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -8; // Max 8 degrees
    const rotateYValue = ((x - centerX) / centerX) * 8; // Max 8 degrees
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleViewProject = () => {
    try {
      const newWindow = window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        toast({
          title: "Popup Blocked",
          description: "Please allow popups to view this project on GitHub.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to open GitHub link:", error);
    }
  };

  return (
    <motion.div
      data-project-card
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.3 
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      className="relative group h-full"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-[#00F5FF]/20 via-[#8A2BE2]/20 to-[#00F5FF]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <Card 
        className="relative cursor-pointer h-full transition-all duration-300 border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#00F5FF]/10" 
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="p-6 relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#8A2BE2] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">{project.emoji}</span>
            </div>
            <div className="w-2 h-2 bg-[#00F5FF] rounded-full animate-pulse shadow-lg shadow-[#00F5FF]/50" />
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00F5FF] group-hover:to-[#8A2BE2] transition-all">
            {project.title}
          </h3>
          
          <p className="text-gray-400 mb-4 leading-relaxed text-sm flex-grow">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge 
                key={tech} 
                className="text-xs px-3 py-1 rounded-full font-medium bg-white/5 text-[#00F5FF] border border-[#00F5FF]/30 hover:bg-[#00F5FF]/10 transition-colors"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge className="text-xs px-3 py-1 rounded-full font-medium bg-white/5 text-gray-400 border border-white/10">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
          
          <Button 
            onClick={handleViewProject}
            className="w-full bg-white/5 backdrop-blur-xl hover:bg-gradient-to-r hover:from-[#00F5FF] hover:to-[#8A2BE2] text-white rounded-full py-5 font-semibold transition-all hover:scale-105 shadow-lg border border-white/10 hover:border-transparent group/btn"
          >
            <span className="group-hover/btn:scale-110 transition-transform inline-flex items-center gap-2">
              View Project
              <ExternalLink className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
