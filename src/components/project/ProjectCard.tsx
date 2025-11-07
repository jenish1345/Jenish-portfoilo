import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/portfolio.types";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { toast } = useToast();

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
      toast({
        title: "Error",
        description: "Failed to open project link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card 
      className="project-card floating-card glass-card hover-glow group cursor-pointer transition-all duration-500"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="p-6">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {project.emoji || project.icon || "📦"}
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <Button 
          onClick={handleViewProject}
          className="w-full hover-glow group/btn"
          variant="secondary"
        >
          <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
          View Project
        </Button>
      </div>
    </Card>
  );
};

export default ProjectCard;
