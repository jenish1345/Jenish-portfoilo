import ProjectCard from "@/components/project/ProjectCard";
import { portfolioData } from "@/data/portfolioData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Projects = () => {
  const { projects } = portfolioData;
  
  // Featured project (Customer Churn Dashboard)
  const featuredProject = projects.find(p => p.id === "customer-churn-dashboard");
  const otherProjects = projects.filter(p => p.id !== "customer-churn-dashboard");

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 pb-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-semibold mb-6 text-gray-900 tracking-tight">Projects</h1>
            <p className="text-xl text-gray-500 font-light">Innovative solutions showcasing technical expertise</p>
          </div>

          {/* Featured Project */}
          {featuredProject && (
            <div className="mb-24 animate-fade-in">
              <h2 className="text-3xl font-semibold mb-8 text-gray-900">Featured Project</h2>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{featuredProject.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">{featuredProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.technologies.map((tech) => (
                      <span key={tech} className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-6 transition-all hover:scale-105"
                      onClick={() => window.open(featuredProject.githubUrl, '_blank')}
                    >
                      <Github className="h-5 w-5 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Projects */}
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-gray-900">All Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
