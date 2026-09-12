"use client";
import { useState, useEffect } from "react";

const certifications = [
  {
    title: "Full Stack Developer Internship",
    issuer: "Codec Technologies",
    date: "Apr 2026 – Aug 2026",
    icon: "🎓",
    color: "bg-blue-500",
    image: "/certificates/codec.png",
    details: "AICTE & ICAC approved | Google for Education Partner | 4 Month Internship"
  },
  {
    title: "Delta - Full Stack Web Development",
    issuer: "Apna College",
    date: "2024 – 2025",
    icon: "🚀",
    color: "bg-indigo-500",
    image: "/certificates/apna.png",
    details: "Complete Full Stack Web Development Course by Shradha Khapra"
  },
  {
    title: "What is Data Science?",
    issuer: "IBM",
    date: "Aug 2025",
    icon: "📊",
    color: "bg-blue-600",
    image: "/certificates/ibm.png",
    details: "Authorized by IBM | Offered through Coursera | Verify: GKC2QBPBOGND"
  },
  {
    title: "Introduction to Data Science",
    issuer: "Infosys Springboard",
    date: "Aug 2026",
    icon: "💡",
    color: "bg-purple-500",
    image: "/certificates/infosys.png",
    details: "Infosys Springboard | Completed Aug 31, 2026"
  },
  {
    title: "Full Stack Web Development (MERN)",
    issuer: "EduShine Classes",
    date: "Jun 2026 – Sep 2026",
    icon: "🎯",
    color: "bg-orange-500",
    image: "/certificates/edushine.png",
    details: "2-Month Online Internship | MSME & Skill India Certified"
  },
  {
    title: "Advanced Diploma in Computer Applications (ADCA)",
    issuer: "STP Computer Education",
    date: "Apr 2026",
    icon: "💻",
    color: "bg-pink-500",
    image: "/certificates/adca-diploma.pdf",
    isPdf: true,
    details: "Advanced computer applications diploma"
  },
  {
    title: "Web Development Course",
    issuer: "STP Computer Education",
    date: "Apr 2024",
    icon: "🌐",
    color: "bg-red-500",
    image: "/certificates/web-development-diploma.pdf",
    isPdf: true,
    details: "Full web development fundamentals"
  }
];

export default function Certifications() {
  const [hoveredCert, setHoveredCert] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(1000);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="certifications" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Hover over certificates to preview • Click to view full size
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer"
              onMouseEnter={() => cert.image && setHoveredCert(cert)}
              onMouseLeave={() => setHoveredCert(null)}
              onMouseMove={handleMouseMove}
              onClick={() => cert.image && window.open(cert.image, '_blank')}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center border-2 border-transparent hover:border-blue-400">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${cert.color} flex items-center justify-center text-3xl`}>
                  {cert.icon}
                </div>
                <h3 className="font-bold mb-2 text-lg">{cert.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{cert.issuer}</p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mb-3">{cert.date}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{cert.details}</p>
                {cert.image ? (
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                    👁️ Hover to Preview • Click to Open
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                    📜 Certificate on Request
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Preview */}
      {hoveredCert && hoveredCert.image && (
        <div
          className="fixed pointer-events-none z-[9999] hidden lg:block"
          style={{
            left: Math.min(mousePos.x + 20, windowWidth - 420),
            top: Math.max(mousePos.y - 220, 20),
            maxWidth: '400px',
          }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-blue-400 overflow-hidden">
            <div className={`${hoveredCert.color} text-white px-4 py-2`}>
              <p className="text-sm font-bold">{hoveredCert.title}</p>
              <p className="text-xs opacity-90">{hoveredCert.issuer}</p>
            </div>
            {hoveredCert.isPdf ? (
              <iframe
                src={`${hoveredCert.image}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="w-[380px] h-[280px]"
                title={hoveredCert.title}
              />
            ) : (
              <img
                src={hoveredCert.image}
                alt={hoveredCert.title}
                className="w-[380px] h-auto max-h-[280px] object-contain bg-white"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
