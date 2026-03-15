import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-100 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <h1 
          className="text-xl font-semibold text-gray-900 tracking-tight cursor-pointer hover:text-gray-700 transition-colors"
          onClick={() => navigate('/')}
        >
          Jenish Fernando
        </h1>
        <div className="hidden md:flex gap-10">
          <button 
            onClick={() => navigate('/')} 
            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/about')} 
            className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            About
          </button>
          <button 
            onClick={() => navigate('/skills')} 
            className={`text-sm font-medium transition-colors ${isActive('/skills') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Skills
          </button>
          <button 
            onClick={() => navigate('/projects')} 
            className={`text-sm font-medium transition-colors ${isActive('/projects') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Projects
          </button>
          <button 
            onClick={() => navigate('/terminal')} 
            className={`text-sm font-medium transition-colors ${isActive('/terminal') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Terminal
          </button>
          <button 
            onClick={() => navigate('/ai-chat')} 
            className={`text-sm font-medium transition-colors ${isActive('/ai-chat') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            AI Chat
          </button>
          <button 
            onClick={() => navigate('/contact')} 
            className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
