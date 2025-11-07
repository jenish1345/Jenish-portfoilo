import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedBackground from "./AnimatedBackground";
import ProjectCard from "./project/ProjectCard";
import { portfolioData } from "@/data/portfolioData";
import { Linkedin, Mail, Code, Briefcase, User, Download } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Destructure data from portfolioData
  const { personal, education, skills, areasOfInterest, languages, projects, contact } = portfolioData;

  useEffect(() => {
    setIsVisible(true);
    
    // GSAP Hero animations
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-avatar", 
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(".hero-title", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5"
    )
    .fromTo(".hero-subtitle", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3"
    )
    .fromTo(".hero-description", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2"
    )
    .fromTo(".hero-buttons", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.1"
    )
    .fromTo(".hero-social", 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1 }, "-=0.2"
    );

    // GSAP ScrollTrigger animations for sections
    gsap.fromTo(".about-card", 
      { y: 100, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(".project-card", 
      { y: 80, opacity: 0, rotationY: 45 },
      { 
        y: 0, 
        opacity: 1, 
        rotationY: 0, 
        duration: 0.7, 
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(".contact-card", 
      { scale: 0.8, opacity: 0, y: 50 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating animation for cards
    gsap.to(".floating-card", {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

  }, []);



  return (
    <div className="bg-animated min-h-screen relative">
      <AnimatedBackground />
      
      {/* Enhanced Background Elements */}
      <div className="geometric-shapes">
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
        <div className="geometric-shape shape-4"></div>
      </div>
      
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      
      <div className="wave-background"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <div className="hero-avatar w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={personal.profileImage} 
                alt={personal.name} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent shimmer-text">
              {personal.name}
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8">
              {personal.title}
            </p>
            <p className="hero-description text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {personal.summary}
            </p>
          </div>
          
          <div className="hero-buttons flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              className="hover-glow group" 
              size="lg"
              onClick={() => window.open(contact.linkedIn, '_blank', 'noopener,noreferrer')}
            >
              <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Connect on LinkedIn
            </Button>
            <Button 
              variant="outline" 
              className="hover-glow group" 
              size="lg"
              onClick={() => window.location.href = `mailto:${contact.email}`}
            >
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Get In Touch
            </Button>
          </div>
          
          <div className="hero-social flex justify-center gap-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover-glow rounded-full"
              onClick={() => window.open(contact.linkedIn, '_blank', 'noopener,noreferrer')}
            >
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover-glow rounded-full"
              onClick={() => window.location.href = `mailto:${contact.email}`}
            >
              <Mail className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <User className="h-8 w-8 text-primary" />
              About Me
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {education[0].degree} Student at {education[0].institution}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="about-card floating-card glass-card hover-glow p-8">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Currently pursuing {education[0].degree} at {education[0].institution} ({education[0].years}). 
                Completed {education[1].stream} at {education[1].institution} ({education[1].years}).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {personal.summary}
              </p>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Languages:</strong> {languages.join(", ")}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Location:</strong> {contact.location}
                </p>
              </div>
            </Card>
            
            <Card className="about-card floating-card glass-card hover-glow p-8">
              <h3 className="text-2xl font-semibold mb-6">Skills & Areas of Interest</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium mb-3 text-primary">Core Skills</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
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
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-3 text-primary">Areas of Interest</h4>
                  <div className="flex flex-wrap gap-2">
                    {areasOfInterest.map((interest, index) => (
                      <Badge 
                        key={interest} 
                        variant="outline" 
                        className="hover-glow transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${(index + skills.length) * 0.1}s` }}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Briefcase className="h-8 w-8 text-primary" />
              Experience
            </h2>
            <p className="text-muted-foreground text-lg">
              Professional internships and hands-on experience
            </p>
          </div>
          
          <Card className="about-card floating-card glass-card hover-glow p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="text-5xl">🚢</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-semibold">Intern</h3>
                  <Badge variant="secondary" className="hover-glow">Internship</Badge>
                </div>
                <p className="text-primary font-medium text-lg mb-2">V.O. Chidambaranar Port Trust</p>
                <p className="text-muted-foreground mb-4">
                  Gained hands-on experience in port operations, logistics management, and maritime technology systems at one of India's major ports.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Port Operations</Badge>
                  <Badge variant="outline">Logistics</Badge>
                  <Badge variant="outline">Maritime Tech</Badge>
                  <Badge variant="outline">Industrial Training</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section relative z-10 py-20 px-6">
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
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="contact-card floating-card glass-card hover-glow p-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Code className="h-8 w-8 text-primary" />
              Let's Connect & Collaborate
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Interested in internships, projects, or tech discussions? I'd love to connect and explore opportunities together.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="hover-glow group"
              onClick={() => window.location.href = `mailto:${contact.email}`}
            >
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {contact.email}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="hover-glow group"
              onClick={() => window.location.href = `tel:${contact.phone.replace(/\s/g, '')}`}
            >
              <span className="mr-2">📱</span>
              {contact.phone}
            </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {contact.location} | Open to opportunities and collaborations
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;