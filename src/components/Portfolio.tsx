import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "./project/ProjectCard";
import AIAssistant from "./AIAssistant";
import ContactForm from "./ContactForm";
import { portfolioData } from "@/data/portfolioData";
import { Linkedin, Mail, Github, Briefcase, GraduationCap, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const welcomeText = "WELCOME";
const quotes = [
  "Code is poetry written in logic",
  "Innovation distinguishes between a leader and a follower",
  "The best way to predict the future is to create it",
  "Technology is best when it brings people together"
];

const typingPhrases = ["Information Technology Student", "Tech Enthusiast", "AI & Machine Learning Learner", "Future Full Stack Developer"];

const Portfolio = () => {
  const [letterIndex, setLetterIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [typingText, setTypingText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const { personal, education, skills, areasOfInterest, languages, projects, contact } = portfolioData;

  // Letter by letter animation
  useEffect(() => {
    if (letterIndex < welcomeText.length) {
      const timer = setTimeout(() => setLetterIndex(letterIndex + 1), 150);
      return () => clearTimeout(timer);
    } else if (quoteIndex < quotes.length) {
      const timer = setTimeout(() => setQuoteIndex(quoteIndex + 1), 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowWelcome(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [letterIndex, quoteIndex]);

  useEffect(() => {
    if (showWelcome) return;
    const currentPhrase = typingPhrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(() => {
      if (!isDeleting && typingText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typingText === "") {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % typingPhrases.length);
      } else {
        setTypingText(isDeleting ? currentPhrase.substring(0, typingText.length - 1) : currentPhrase.substring(0, typingText.length + 1));
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, phraseIndex, showWelcome]);

  useEffect(() => {
    if (showWelcome) return;
    const tl = gsap.timeline();
    tl.fromTo(".hero-greeting", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
      .fromTo(".hero-name", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .fromTo(".hero-typing", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .fromTo(".hero-description", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .fromTo(".hero-buttons", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.1");

    gsap.fromTo(".fade-in-section", { y: 50, opacity: 0 }, { 
      y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: ".fade-in-section", start: "top 80%", toggleActions: "play none none reverse" }
    });
  }, [showWelcome]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 px-6">
        <div className="flex gap-2 md:gap-4 mb-12">
          {welcomeText.split('').map((letter, index) => (
            <span
              key={index}
              className={`text-6xl md:text-9xl font-bold transition-all duration-500 ${
                index < letterIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${index === 3 ? 'text-black' : 'text-gray-900'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
        {letterIndex >= welcomeText.length && quoteIndex > 0 && (
          <p className="text-xl md:text-2xl text-gray-600 font-light italic max-w-2xl text-center animate-fade-in">
            "{quotes[quoteIndex - 1]}"
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Antony <span className="font-bold">Jenish</span> Fernando
          </h1>
          <div className="hidden md:flex gap-10">
            <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">About</button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Projects</button>
            <button onClick={() => scrollToSection('ai-assistant')} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">AI Chat</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Contact</button>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-32">
        <div className="text-center max-w-5xl mx-auto">
          <p className="hero-greeting text-xl text-gray-500 mb-8 font-light tracking-wide">Hello, I'm</p>
          <h1 className="hero-name text-6xl md:text-8xl font-bold mb-8 text-gray-900 tracking-tight leading-tight">
            Antony <span className="font-black relative inline-block">
              <span className="relative z-10">Jenish</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 -z-10 transform -skew-x-12"></span>
            </span> Fernando
          </h1>
          <div className="hero-typing h-12 mb-10">
            <p className="text-2xl md:text-3xl text-gray-600 font-light tracking-wide">{typingText}<span className="animate-pulse">|</span></p>
          </div>
          <p className="hero-description text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed font-light">{personal.summary}</p>
          <div className="hero-buttons flex flex-wrap justify-center gap-5">
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-7 text-base rounded-full font-medium" onClick={() => scrollToSection('projects')}>
              View Projects
            </Button>
            <Button variant="outline" className="border-2 border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-7 text-base rounded-full font-medium" onClick={() => scrollToSection('contact')}>
              Contact Me
            </Button>
          </div>
        </div>
        <div className="scroll-indicator absolute bottom-12 cursor-pointer" onClick={() => scrollToSection('about')}>
          <ChevronDown className="h-10 w-10 text-gray-300 hover:text-gray-600 transition-colors" />
        </div>
      </section>

      <section id="about" className="fade-in-section py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-semibold mb-6 text-gray-900 tracking-tight">About Me</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">{education[0].degree} Student at {education[0].institution}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <GraduationCap className="h-8 w-8 text-gray-900" />
                  <h3 className="text-3xl font-semibold text-gray-900">Education</h3>
                </div>
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="pl-6 border-l-2 border-gray-200 hover:border-gray-400 transition-colors">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{edu.degree}</h4>
                      <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">{edu.years}</p>
                      {edu.stream && <p className="text-gray-400 text-sm mt-1">{edu.stream}</p>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-2"><strong className="text-gray-900 font-semibold">Languages:</strong> {languages.join(", ")}</p>
                <p className="text-gray-600"><strong className="text-gray-900 font-semibold">Location:</strong> {contact.location}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="h-8 w-8 text-gray-900" />
                <h3 className="text-3xl font-semibold text-gray-900">Experience</h3>
              </div>
              <div className="pl-6 border-l-2 border-gray-200 hover:border-gray-400 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">🚢</div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">Intern</h4>
                    <p className="text-gray-700 font-medium">V.O. Chidambaranar Port Trust</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Gained hands-on experience in port operations, logistics management, and maritime technology systems at one of India's major ports.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">Port Operations</Badge>
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">Logistics</Badge>
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">Maritime Tech</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="fade-in-section py-32 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-semibold mb-6 text-gray-900 tracking-tight">Skills</h2>
          </div>
          <div className="space-y-20">
            <div>
              <h3 className="text-3xl font-semibold mb-10 text-gray-900">Technical Skills</h3>
              <div className="flex flex-wrap gap-4">
                {skills.map((skill) => (
                  <Badge key={skill} className="text-lg px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-900 transition-all cursor-pointer font-medium rounded-full shadow-sm hover:shadow-md">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-semibold mb-10 text-gray-900">Areas of Interest</h3>
              <div className="space-y-4">
                {areasOfInterest.map((interest) => (
                  <div key={interest} className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-sm transition-all">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="text-lg text-gray-700 font-light">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="fade-in-section py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-semibold mb-6 text-gray-900 tracking-tight">Projects</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">Innovative solutions showcasing technical expertise</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <AIAssistant />

      <AIAssistant />

      <section id="contact" className="fade-in-section py-32 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-semibold mb-6 text-gray-900 tracking-tight">Let's Connect</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">Interested in collaborations or tech discussions?</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-sm transition-all group">
                <Mail className="h-6 w-6 text-gray-400 group-hover:text-gray-900 transition-colors" />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{contact.email}</span>
              </a>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-sm transition-all group">
                <span className="text-2xl">📱</span>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{contact.phone}</span>
              </a>
              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl">
                <span className="text-2xl">📍</span>
                <span className="text-gray-700">{contact.location}</span>
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 w-12 h-12" onClick={() => window.open(contact.linkedIn, '_blank')}>
                  <Linkedin className="h-6 w-6 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 w-12 h-12" onClick={() => window.open('https://github.com/jenish1345', '_blank')}>
                  <Github className="h-6 w-6 text-gray-600" />
                </Button>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="py-12 px-8 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 font-light">© 2025 {personal.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
