"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "about", label: "About", icon: "👤" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "certifications", label: "Certifications", icon: "🏆" },
  { id: "contact", label: "Contact", icon: "📞" },
];

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredItem, setHoveredItem] = useState("");

  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section[id]');
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDark = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDark(true);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div 
        className="rounded-full px-4 py-2 transition-all duration-500 relative overflow-hidden"
        style={{
          background: scrolled 
            ? 'rgba(144, 238, 144, 0.3)' 
            : 'rgba(144, 238, 144, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(144, 238, 144, 0.4)',
          boxShadow: scrolled 
            ? '0 8px 32px rgba(144, 238, 144, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)' 
            : '0 4px 16px rgba(144, 238, 144, 0.2)',
        }}
      >
        {/* Glass shine effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)',
            borderRadius: 'inherit',
          }}
        />
        
        <div className="flex items-center justify-between relative z-10">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 pl-2 group">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-8 h-8 rounded-full object-cover transition-all duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-300 to-emerald-400 opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <span className="text-lg font-bold text-gray-800 dark:text-white hidden sm:block group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
              Ansh Maurya
            </span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onMouseEnter={() => setHoveredItem(s.id)}
                onMouseLeave={() => setHoveredItem("")}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === s.id
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg transform scale-105"
                    : hoveredItem === s.id
                    ? "bg-white/30 dark:bg-white/10 text-green-800 dark:text-green-300 transform scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400"
                }`}
                style={{
                  backdropFilter: activeSection === s.id || hoveredItem === s.id ? 'blur(10px)' : 'none',
                  WebkitBackdropFilter: activeSection === s.id || hoveredItem === s.id ? 'blur(10px)' : 'none',
                }}
              >
                <span className="relative z-10">{s.label}</span>
                {activeSection === s.id && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse"></span>
                )}
              </a>
            ))}
            
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="ml-2 p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(144, 238, 144, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(144, 238, 144, 0.3)',
              }}
              aria-label="Toggle dark mode"
            >
              <span className="text-lg">{dark ? "☀️" : "🌙"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(144, 238, 144, 0.25)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(144, 238, 144, 0.4)',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-4 relative z-10">
            <div 
              className="rounded-2xl p-3 space-y-1 overflow-y-auto"
              style={{
                maxHeight: 'calc(100vh - 120px)',
                background: 'rgba(144, 238, 144, 0.25)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(144, 238, 144, 0.4)',
                boxShadow: '0 8px 32px rgba(144, 238, 144, 0.3)',
              }}
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeSection === s.id
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/20"
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <span className="text-lg">{s.icon}</span>
                  <span>{s.label}</span>
                </a>
              ))}
              
              <div className="border-t border-green-200/30 dark:border-green-700/30 mt-2 pt-2">
                <button
                  onClick={toggleDark}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/20 transition-all"
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <span className="text-lg">{dark ? "☀️" : "🌙"}</span>
                  <span>{dark ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
