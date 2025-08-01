import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedBackground from "./AnimatedBackground";
import { Github, Linkedin, Mail, ExternalLink, Code, Briefcase, User, Download } from "lucide-react";
import antonyPhoto from "@/assets/antony-photo.jpg";

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      title: "Habit Tracker Application",
      description: "Object-oriented habit tracking application built with Java, implementing OOP concepts for efficient habit management and progress tracking",
      tech: ["Java", "OOP", "GUI Design", "Data Structures"],
      image: "📋",
      link: "#"
    },
    {
      title: "News Scraping & Analysis",
      description: "Data science project using Python for web scraping news articles and performing sentiment analysis and trend detection",
      tech: ["Python", "Data Science", "Web Scraping", "Analytics"],
      image: "📰",
      link: "#"
    },
    {
      title: "IoT Smart Solutions",
      description: "Exploring Internet of Things applications with sensor integration and real-time data monitoring systems",
      tech: ["IoT", "Sensors", "Real-time Data", "Arduino"],
      image: "🌐",
      link: "#"
    }
  ];

  const skills = [
    "Java", "Python", "Web Design", "Data Science", "Machine Learning", 
    "Artificial Intelligence", "IoT", "Blockchain", "Big Data Analytics", 
    "Graphic Design", "Branding", "Marketing"
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
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse-glow overflow-hidden">
              <img 
                src={antonyPhoto} 
                alt="Antony Jenish Fernando J" 
                className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Antony Jenish Fernando J
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
              Computer Science Student & Tech Enthusiast
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Enthusiastic and detail-oriented computer science student with a strong foundation in programming, software development, and problem-solving. Passionate about AI, machine learning, and creating innovative solutions.
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
              B.Tech Information Technology Student at Loyola-ICAM College of Engineering and Technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="glass-card hover-glow p-8">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Currently pursuing B.Tech in Information Technology at Loyola-ICAM College of Engineering and Technology (2023-2027). 
                Completed Computer Science stream at BNC Matriculation Higher Secondary School (2016-2023).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I am eager to apply my technical skills and gain hands-on experience through internships. 
                My interests include artificial intelligence, machine learning, and full-stack web development.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Languages:</strong> English, Tamil
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Location:</strong> Nungambakkam, Chennai
                </p>
              </div>
            </Card>
            
            <Card className="glass-card hover-glow p-8">
              <h3 className="text-2xl font-semibold mb-6">Skills & Areas of Interest</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium mb-3 text-primary">Core Skills</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.slice(0, 6).map((skill, index) => (
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
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-3 text-primary">Areas of Interest</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.slice(6).map((skill, index) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="hover-glow transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${(index + 6) * 0.1}s` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
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
              Academic and personal projects showcasing technical skills and innovation
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
              Let's Connect & Collaborate
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Interested in internships, projects, or tech discussions? I'd love to connect and explore opportunities together.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" className="hover-glow group">
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              jenfdo134@gmail.com
            </Button>
            <Button variant="outline" size="lg" className="hover-glow group">
              <span className="mr-2">📱</span>
              +91 9042679134
            </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Nungambakkam, Chennai | Open to opportunities and collaborations
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;