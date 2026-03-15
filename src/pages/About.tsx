import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolioData";
import { GraduationCap, Briefcase } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  const { education, languages, contact } = portfolioData;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 pb-24 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-semibold mb-6 text-gray-900 tracking-tight">About Me</h1>
            <p className="text-xl text-gray-500 font-light">{education[0].degree} Student at {education[0].institution}</p>
          </div>

          {/* Code-style introduction */}
          <div className="mb-20 animate-fade-in">
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto">
              <pre className="text-sm md:text-base text-gray-100 font-mono leading-relaxed overflow-x-auto">
{`const jenish = {
  role: "Information Technology Student",
  skills: ["Java", "Python", "Machine Learning", "Web Design"],
  interests: ["AI", "IoT", "Blockchain", "Data Science"],
  passion: "Building impactful software solutions",
  currentFocus: "AI-driven applications",
  location: "Chennai, India"
};`}
              </pre>
            </div>
          </div>

          <div className="mb-16 text-center max-w-3xl mx-auto animate-fade-in">
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              I'm an enthusiastic IT student with a strong foundation in programming and software development. 
              My journey in technology is driven by curiosity and a desire to create innovative solutions that make a difference. 
              Currently exploring the intersection of AI and practical applications while building my expertise in full-stack development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 animate-fade-in">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <GraduationCap className="h-8 w-8 text-gray-900" />
                  <h2 className="text-3xl font-semibold text-gray-900">Education</h2>
                </div>
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="pl-6 border-l-2 border-gray-200 hover:border-gray-400 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{edu.degree}</h3>
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
                <h2 className="text-3xl font-semibold text-gray-900">Experience</h2>
              </div>
              <div className="pl-6 border-l-2 border-gray-200 hover:border-gray-400 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Intern</h3>
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
      </div>
      <Footer />
    </div>
  );
};

export default About;
