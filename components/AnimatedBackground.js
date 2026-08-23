"use client";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create floating particles
    const newParticles = [];
    const colors = [
      'rgba(59, 130, 246, 0.3)',  // Blue
      'rgba(16, 185, 129, 0.3)',  // Green
      'rgba(139, 92, 246, 0.3)',  // Purple
      'rgba(236, 72, 153, 0.3)',  // Pink
      'rgba(245, 158, 11, 0.3)',  // Orange
    ];

    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 10,
        floatDistance: Math.random() * 100 + 50,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Fixed background with gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        {/* Animated gradient orbs */}
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            animation: 'orbFloat 15s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-1/2 -right-40 w-96 h-96 rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
            animation: 'orbFloat 18s ease-in-out infinite reverse',
          }}
        />
        <div 
          className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            animation: 'orbFloat 20s ease-in-out infinite',
            animationDelay: '5s',
          }}
        />
        <div 
          className="absolute top-1/4 left-1/2 w-72 h-72 rounded-full opacity-10 dark:opacity-5"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
            animation: 'orbFloat 16s ease-in-out infinite',
            animationDelay: '3s',
          }}
        />

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 30s linear infinite',
          }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: particle.color,
              animation: `particleFloat ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(50px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 50px) scale(0.9);
          }
          75% {
            transform: translate(-40px, -20px) scale(1.05);
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-50px) translateX(30px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-100px) translateX(-20px);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-50px) translateX(-40px);
            opacity: 0.8;
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </>
  );
}
