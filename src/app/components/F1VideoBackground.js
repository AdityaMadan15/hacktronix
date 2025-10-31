// src/app/components/F1VideoBackground.js
'use client';
import { useState, useEffect, useRef } from 'react';

export default function F1VideoBackground() {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay failed, handle gracefully
      });
    }
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="video-background">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={handleVideoLoad}
        className="background-video"
      >
        {/* You'll need to add actual F1 racing videos */}
        <source src="/videos/f1-race-bg-1.mp4" type="video/mp4" />
        <source src="/videos/f1-race-bg-2.mp4" type="video/mp4" />
        {/* Fallback image if videos don't load */}
      </video>
      
      {/* Video overlay for better text readability */}
      <div className="video-overlay"></div>
      
      {/* Animated speed effects */}
      <div className="speed-effects">
        <div className="speed-lines">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="speed-line"
              style={{
                animationDelay: `${i * 0.05}s`,
                left: `${Math.random() * 100}%`
              }}
            ></div>
          ))}
        </div>
        <div className="particle-field">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                left: `${Math.random() * 100}%`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: -2;
          overflow: hidden;
        }

        .background-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          object-fit: cover;
          opacity: ${isLoaded ? 0.4 : 0};
          transition: opacity 2s ease;
          filter: brightness(0.3) contrast(1.2);
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.9) 0%,
            rgba(0, 0, 0, 0.8) 50%,
            rgba(225, 6, 0, 0.1) 100%
          );
          z-index: -1;
        }

        .speed-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .speed-lines {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .speed-line {
          position: absolute;
          width: 2px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, #e10600, transparent);
          animation: speedLine 1s linear infinite;
          opacity: 0;
        }

        .particle-field {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #e10600;
          border-radius: 50%;
          animation: particleFloat 4s linear infinite;
          bottom: -10px;
        }

        @keyframes speedLine {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}