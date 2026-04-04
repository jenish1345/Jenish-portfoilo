import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";

export const themes = [
  {
    id: "monochrome",
    name: "Monochrome Elegant",
    colors: { primary: "#000000", secondary: "#ffffff", accent: "#000000" },
    css: {
      "--background": "0 0% 100%",
      "--foreground": "0 0% 0%",
      "--primary": "0 0% 0%",
      "--border": "0 0% 0%",
      "--radius": "0rem"
    }
  },
  {
    id: "neomorphism",
    name: "Neomorphism Soft",
    colors: { primary: "#e0e5ec", secondary: "#ffffff", accent: "#a0a5b2" },
    css: {
      "--background": "220 14% 92%",
      "--foreground": "220 10% 20%",
      "--primary": "220 10% 50%",
      "--border": "220 10% 80%",
      "--radius": "1.5rem"
    }
  },
  {
    id: "gradient-mesh",
    name: "Gradient Mesh Modern",
    colors: { primary: "#8b5cf6", secondary: "#ec4899", accent: "#3b82f6" },
    css: {
      "--background": "270 50% 98%",
      "--foreground": "270 10% 10%",
      "--primary": "270 80% 60%",
      "--border": "270 30% 85%",
      "--radius": "1.5rem"
    }
  },
  {
    id: "terminal",
    name: "Terminal Hacker",
    colors: { primary: "#00ff00", secondary: "#000000", accent: "#00ff00" },
    css: {
      "--background": "0 0% 0%",
      "--foreground": "120 100% 50%",
      "--primary": "120 100% 50%",
      "--border": "120 100% 30%",
      "--radius": "0rem"
    }
  },
  {
    id: "apple",
    name: "Apple Inspired",
    colors: { primary: "#007aff", secondary: "#f5f5f7", accent: "#0071e3" },
    css: {
      "--background": "0 0% 98%",
      "--foreground": "0 0% 10%",
      "--primary": "211 100% 50%",
      "--border": "0 0% 90%",
      "--radius": "1rem"
    }
  },
  {
    id: "tokyo-night",
    name: "Neon Tokyo Night",
    colors: { primary: "#bb9af7", secondary: "#1a1b26", accent: "#7aa2f7" },
    css: {
      "--background": "235 18% 13%",
      "--foreground": "235 16% 83%",
      "--primary": "267 84% 81%",
      "--border": "235 18% 25%",
      "--radius": "0.75rem"
    }
  },
  {
    id: "sunset",
    name: "Warm Sunset",
    colors: { primary: "#ff6b35", secondary: "#f72585", accent: "#ffd60a" },
    css: {
      "--background": "25 100% 97%",
      "--foreground": "25 30% 15%",
      "--primary": "15 100% 60%",
      "--border": "25 50% 85%",
      "--radius": "1.5rem"
    }
  },
  {
    id: "navy",
    name: "Dark Blue Professional",
    colors: { primary: "#64ffda", secondary: "#0a192f", accent: "#64ffda" },
    css: {
      "--background": "219 28% 12%",
      "--foreground": "219 14% 71%",
      "--primary": "167 100% 70%",
      "--border": "219 28% 20%",
      "--radius": "0.5rem"
    }
  },
  {
    id: "pastel",
    name: "Pastel Dreamy",
    colors: { primary: "#ffc6ff", secondary: "#bdb2ff", accent: "#a0c4ff" },
    css: {
      "--background": "300 100% 98%",
      "--foreground": "300 10% 20%",
      "--primary": "300 100% 88%",
      "--border": "300 50% 90%",
      "--radius": "2rem"
    }
  },
  {
    id: "industrial",
    name: "Industrial Dark",
    colors: { primary: "#ff6b35", secondary: "#1e1e1e", accent: "#ff6b35" },
    css: {
      "--background": "0 0% 12%",
      "--foreground": "0 0% 90%",
      "--primary": "15 100% 60%",
      "--border": "0 0% 25%",
      "--radius": "0.25rem"
    }
  },
  {
    id: "retro",
    name: "Retro 90s Web",
    colors: { primary: "#ff00ff", secondary: "#00ffff", accent: "#ffff00" },
    css: {
      "--background": "0 0% 95%",
      "--foreground": "0 0% 10%",
      "--primary": "300 100% 50%",
      "--border": "0 0% 50%",
      "--radius": "0rem"
    }
  },
  {
    id: "frosted-dark",
    name: "Frosted Glass Dark",
    colors: { primary: "#8b5cf6", secondary: "#1e1b4b", accent: "#ec4899" },
    css: {
      "--background": "250 50% 15%",
      "--foreground": "250 20% 95%",
      "--primary": "270 80% 60%",
      "--border": "250 30% 25%",
      "--radius": "1.5rem"
    }
  },
  {
    id: "swiss",
    name: "Minimalist Swiss",
    colors: { primary: "#ff0000", secondary: "#ffffff", accent: "#000000" },
    css: {
      "--background": "0 0% 100%",
      "--foreground": "0 0% 0%",
      "--primary": "0 100% 50%",
      "--border": "0 0% 0%",
      "--radius": "0rem"
    }
  },
  {
    id: "cosmic",
    name: "Cosmic Space",
    colors: { primary: "#9d4edd", secondary: "#10002b", accent: "#7209b7" },
    css: {
      "--background": "280 100% 8%",
      "--foreground": "280 20% 90%",
      "--primary": "280 70% 60%",
      "--border": "280 50% 20%",
      "--radius": "1rem"
    }
  },
  {
    id: "earthy",
    name: "Earthy Natural",
    colors: { primary: "#606c38", secondary: "#fefae0", accent: "#bc6c25" },
    css: {
      "--background": "54 44% 94%",
      "--foreground": "84 20% 25%",
      "--primary": "84 30% 40%",
      "--border": "54 30% 80%",
      "--radius": "1.5rem"
    }
  }
];

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);

  const applyTheme = (index: number) => {
    const theme = themes[index];
    const root = document.documentElement;
    
    Object.entries(theme.css).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    setCurrentTheme(index);
    setIsOpen(false);
    
    // Store preference
    localStorage.setItem('portfolio-theme', index.toString());
  };

  // Load saved theme on mount
  useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      applyTheme(parseInt(saved));
    }
  });

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl flex items-center justify-center text-white border-2 border-white/20"
      >
        {isOpen ? <X className="w-7 h-7" /> : <Palette className="w-7 h-7" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 max-h-[70vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border-2 border-gray-200"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900">Choose Theme</h3>
            <div className="space-y-3">
              {themes.map((theme, index) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => applyTheme(index)}
                  className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                    currentTheme === index
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  <div className="flex gap-1">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white/50"
                      style={{ background: theme.colors.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white/50"
                      style={{ background: theme.colors.secondary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white/50"
                      style={{ background: theme.colors.accent }}
                    />
                  </div>
                  <span className="text-sm font-semibold flex-1 text-left">
                    {theme.name}
                  </span>
                  {currentTheme === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
