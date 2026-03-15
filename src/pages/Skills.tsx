import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolioData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Skills = () => {
  const { areasOfInterest } = portfolioData;

  const skillCategories = {
    Frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    Backend: ["Java", "Spring Boot", "Node.js", "Python"],
    "Data / AI": ["Python", "Machine Learning", "Data Science", "Data Analytics"],
    Tools: ["Git", "Docker", "VS Code", "Figma"]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 pb-24 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-semibold mb-6 text-gray-900 tracking-tight">Skills</h1>
          </div>
          
          <div className="space-y-20 animate-fade-in">
            <div>
              <h2 className="text-3xl font-semibold mb-10 text-gray-900">Tech Stack</h2>
              <div className="space-y-12">
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="text-xl font-medium text-gray-700 mb-6">{category}</h3>
                    <div className="flex flex-wrap gap-4">
                      {skills.map((skill) => (
                        <Badge key={skill} className="text-base px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all cursor-pointer font-medium rounded-full shadow-sm hover:shadow-md hover:scale-105">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-semibold mb-10 text-gray-900">Areas of Interest</h2>
              <div className="space-y-4">
                {areasOfInterest.map((interest) => (
                  <div key={interest} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-sm transition-all">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="text-lg text-gray-700 font-light">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Skills;
