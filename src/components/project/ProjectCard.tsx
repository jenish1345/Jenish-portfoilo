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
    const rotateXValue = (y - centerY) / 10;
    const rotateYValue = (centerX - x) / 10;
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative group"
    >
      {/* Soft glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-purple-300/30 via-pink-300/30 to-blue-300/30 rounded-3xl blur-xl"></div>
      
      <Card className="relative cursor-pointer transition-all duration-500 border-2 border-white/50 bg-white/60 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-300/50" style={{ transform: 'translateZ(50px)' }}>
        <div className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg"></div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
            {project.title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed font-light">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <Badge key={tech} className={`text-xs px-3 py-1 rounded-full font-medium border-2 ${
                i % 2 === 0 ? 'bg-purple-100/80 text-purple-700 border-purple-300/60' : 'bg-pink-100/80 text-pink-700 border-pink-300/60'
              }`}>
                {tech}
              </Badge>
            ))}
          </div>
          <Button 
            onClick={handleViewProject}
            className="w-full bg-white/70 backdrop-blur-xl hover:bg-white/90 text-purple-700 rounded-full py-6 font-semibold transition-all hover:scale-105 shadow-lg border-2 border-white/50 hover:shadow-xl hover:shadow-purple-300/50"
          >
            View Project
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
