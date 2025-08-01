import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedBackground from "./AnimatedBackground";
import { Github, Linkedin, Mail, ExternalLink, Code, Briefcase, User, Download } from "lucide-react";

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "🛒",
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      tech: ["Vue.js", "Firebase", "Tailwind"],
      image: "📋",
      link: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts",
      tech: ["React", "API Integration", "CSS3"],
      image: "🌤️",
      link: "#"
    }
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Vue.js", "Node.js", 
    "Python", "MongoDB", "PostgreSQL", "AWS", "Docker"
  ];

  return (
    <div className="bg-animated min-h-screen relative">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-6xl animate-pulse-glow">
              👨‍💻
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              John Developer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
              Full-Stack Developer & UI/UX Enthusiast
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Crafting beautiful, functional, and user-centered digital experiences with modern technologies and creative problem-solving.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button className="hover-glow group" size="lg">
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Get In Touch
            </Button>
            <Button variant="outline" className="hover-glow group" size="lg">
              <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Download CV
            </Button>
          </div>
          
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="icon" className="hover-glow rounded-full">
              <Github className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-glow rounded-full">
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-glow rounded-full">
              <Mail className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <User className="h-8 w-8 text-primary" />
              About Me
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate developer with 5+ years of experience building scalable web applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="glass-card hover-glow p-8">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Started as a curious computer science student and evolved into a passionate full-stack developer. 
                I love turning complex problems into simple, beautiful solutions that make a difference.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                or sharing knowledge with the developer community.
              </p>
            </Card>
            
            <Card className="glass-card hover-glow p-8">
              <h3 className="text-2xl font-semibold mb-6">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="hover-glow transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Briefcase className="h-8 w-8 text-primary" />
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg">
              Some of my recent work that I'm proud of
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.title} 
                className="glass-card hover-glow group cursor-pointer transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="group/btn">
                    <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    View Project
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-card hover-glow p-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Code className="h-8 w-8 text-primary" />
              Let's Build Something Amazing
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it and help bring your ideas to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="hover-glow group">
                <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start a Conversation
              </Button>
              <Button variant="outline" size="lg" className="hover-glow group">
                <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                View GitHub
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;