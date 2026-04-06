import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

const skills: Skill[] = [
  // Machine Learning
  { name: "Python", level: 90, category: "ML & Programming" },
  { name: "TensorFlow", level: 85, category: "ML & Programming" },
  { name: "Scikit-learn", level: 88, category: "ML & Programming" },
  { name: "PyTorch", level: 75, category: "ML & Programming" },
  
  // Data Analysis
  { name: "Pandas", level: 92, category: "Data Analysis" },
  { name: "NumPy", level: 90, category: "Data Analysis" },
  { name: "Matplotlib", level: 85, category: "Data Analysis" },
  { name: "SQL", level: 80, category: "Data Analysis" },
  
  // Tools & Others
  { name: "Git", level: 85, category: "Tools & Others" },
  { name: "Jupyter", level: 90, category: "Tools & Others" },
  { name: "Docker", level: 70, category: "Tools & Others" },
  { name: "React", level: 75, category: "Tools & Others" },
];

const SkillsVisualization = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="w-full">
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-2">Technical Skills</h3>
        <p className="text-black/60">Proficiency levels across different technologies</p>
      </div>

      {categories.map((category, catIndex) => (
        <div key={category} className="mb-12">
          <h4 className="text-lg font-semibold mb-6 text-black/80">{category}</h4>
          <div className="space-y-6">
            {skills
              .filter(skill => skill.category === category)
              .map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: (catIndex * 0.1) + (index * 0.05), duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-black/40">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: isVisible ? `${skill.level}%` : 0 }}
                      transition={{ delay: (catIndex * 0.1) + (index * 0.05) + 0.2, duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:from-purple-600 group-hover:to-blue-600 transition-colors"
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsVisualization;
