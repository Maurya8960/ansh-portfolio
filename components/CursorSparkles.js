"use client";
import { useEffect, useState, useRef } from "react";

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
      '#ffeead', '#ff9ff3', '#feca57', '#ff6348',
      '#a29bfe', '#fd79a8', '#00cec9', '#e17055',
      '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c'
    ];

    const handleMouseMove = (e) => {
      // Update cursor position
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Update dot position immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 4}px`;
        dotRef.current.style.top = `${e.clientY - 4}px`;
      }
      
      // Update ring position with smooth animation
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX - 20}px`;
        ringRef.current.style.top = `${e.clientY - 20}px`;
      }

      // Create sparkle
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 40,
        velocityY: (Math.random() - 0.5) * 40,
      };

      setSparkles((prev) => [...prev, newSparkle].slice(-20)); // Keep max 20 sparkles

      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Custom cursor dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ left: -100, top: -100 }}
      />
      
      {/* Custom cursor ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ left: -100, top: -100 }}
      />
      
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          style={{
            position: 'fixed',
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            pointerEvents: 'none',
            zIndex: 9998,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
            animation: 'sparkleBurst 0.8s ease-out forwards',
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill={sparkle.color}
            style={{
              filter: `drop-shadow(0 0 ${sparkle.size}px ${sparkle.color})`,
            }}
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}
      
      <style jsx global>{`
        @keyframes sparkleBurst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
