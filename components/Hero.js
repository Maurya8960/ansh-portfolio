"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = [
    "Full Stack Developer",
    "Software Developer",
    "AI Integration Specialist",
    "MERN Stack Developer"
  ];
  
  useEffect(() => {
    let currentTitle = titles[titleIndex];
    let charIndex = 0;
    let isDeleting = false;
    
    const interval = setInterval(() => {
      if (!isDeleting) {
        setTypedText(currentTitle.slice(0, charIndex));
        charIndex++;
        
        if (charIndex > currentTitle.length) {
          isDeleting = true;
          setTimeout(() => {}, 2000);
        }
      } else {
        setTypedText(currentTitle.slice(0, charIndex));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          setTitleIndex((prev) => (prev + 1) % titles.length);
          currentTitle = titles[(titleIndex + 1) % titles.length];
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [titleIndex]);

  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/qr/4M4PQCGRM6LXL1",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      className: "bg-green-500 hover:bg-green-600"
    },
    {
      name: "GitHub",
      url: "https://github.com/Maurya8960",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      className: "bg-gray-800 hover:bg-gray-900"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anshmaurya89/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      className: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@AnshMaurya-o6j",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      className: "bg-red-600 hover:bg-red-700"
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/maurya1_ansh",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      className: "bg-black hover:bg-gray-900"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" style={{ animation: 'heroOrbFloat 8s ease-in-out infinite' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" style={{ animation: 'heroOrbFloat 10s ease-in-out infinite reverse' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl" style={{ animation: 'heroOrbFloat 12s ease-in-out infinite', animationDelay: '3s' }}></div>
        <div className="absolute top-10 right-1/4 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl" style={{ animation: 'heroOrbFloat 9s ease-in-out infinite', animationDelay: '1s' }}></div>
        
        {/* Animated gradient rings */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border-2 border-blue-300/30" style={{ animation: 'ringPulse 4s ease-out infinite' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full border-2 border-purple-300/30" style={{ animation: 'ringPulse 4s ease-out infinite', animationDelay: '2s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/3 right-1/3 w-16 h-16 border-2 border-blue-400/20 rotate-45" style={{ animation: 'shapeFloat 6s ease-in-out infinite' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border-2 border-purple-400/20 rotate-12" style={{ animation: 'shapeFloat 8s ease-in-out infinite', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 border-2 border-pink-400/20 rounded-full" style={{ animation: 'shapeFloat 7s ease-in-out infinite', animationDelay: '1s' }}></div>
        
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px', animation: 'dotPattern 20s linear infinite' }}></div>
        
        {/* Light beams */}
        <div className="absolute -top-1/2 left-1/4 w-1/2 h-full bg-gradient-to-b from-blue-400/10 to-transparent rotate-12" style={{ animation: 'beamMove 15s ease-in-out infinite' }}></div>
        <div className="absolute -top-1/2 right-1/4 w-1/3 h-full bg-gradient-to-b from-purple-400/10 to-transparent -rotate-12" style={{ animation: 'beamMove 18s ease-in-out infinite reverse' }}></div>
      </div>
      
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className="mb-8 fade-in-up">
          <div className="relative inline-block">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-600 shadow-2xl subtle-float bg-white dark:bg-gray-800">
              <img 
                src="/profile.jpg" 
                alt="Ansh Maurya" 
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                  e.target.parentElement.innerHTML = '<span class="text-6xl font-bold text-blue-600">AM</span>';
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="inline-block px-6 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            Open to Opportunities
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold mb-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <span style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 20%, #ffd700 40%, #4ecdc4 60%, #45b7d1 80%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'nameGradient 4s ease infinite',
            backgroundSize: '300% 300%',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
          }}>
            Ansh Maurya
          </span>
        </h1>
        
        <h2 className="text-2xl md:text-4xl mb-6 min-h-[50px] font-bold fade-in-up" style={{ animationDelay: '0.4s' }}>
          <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 3s ease infinite',
            backgroundSize: '200% 200%'
          }}>
            {typedText}
          </span>
          <span className="typing-cursor" style={{ color: '#667eea' }}>|</span>
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.5s' }}>
          Final-year B.Tech IT student & Full Stack Developer building AI-integrated, 
          production-grade web applications
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-white px-5 py-3 rounded-full font-medium transition-all hover:scale-110 shadow-lg ${social.className}`}
              title={social.name}
            >
              {social.icon}
              <span className="hidden md:inline">{social.name}</span>
            </a>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 fade-in-up" style={{ animationDelay: '0.65s' }}>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Download Resume
          </a>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 fade-in-up" style={{ animationDelay: '0.7s' }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span>Kanpur, Uttar Pradesh, India</span>
        </div>
      </div>
    </section>
  );
}
