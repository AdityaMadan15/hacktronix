// src/app/components/F1IntroAnimation.js
'use client';
import { useState, useEffect } from 'react';

export default function F1IntroAnimation({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCar, setShowCar] = useState(false);
  const [showTrack, setShowTrack] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const steps = [
      () => setShowTrack(true),
      () => setShowCar(true),
      () => setShowTitle(true),
      () => setTimeout(() => onComplete(), 2000)
    ];

    const timer = setTimeout(() => {
      if (currentStep < steps.length) {
        steps[currentStep]();
        setCurrentStep(prev => prev + 1);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="f1-intro">
      <div className={`track ${showTrack ? 'visible' : ''}`}>
        <div className="start-line"></div>
        <div className="finish-line"></div>
        <div className="track-curves">
          <div className="curve curve-1"></div>
          <div className="curve curve-2"></div>
          <div className="curve curve-3"></div>
        </div>
      </div>

      <div className={`f1-car ${showCar ? 'racing' : ''}`}>
        <div className="car-body">
          <div className="car-front"></div>
          <div className="car-cockpit"></div>
          <div className="car-rear"></div>
          <div className="car-wheels">
            <div className="wheel wheel-front"></div>
            <div className="wheel wheel-rear"></div>
          </div>
        </div>
        <div className="exhaust-flame"></div>
      </div>

      <div className={`title-overlay ${showTitle ? 'visible' : ''}`}>
        <div className="title-content">
          <h1 className="main-title">MEV DEFENSE RACING</h1>
          <div className="subtitle">SECURING THE FAST LANE</div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .f1-intro {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #000000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          overflow: hidden;
        }

        .track {
          position: absolute;
          width: 100%;
          height: 200px;
          background: #1a1a1a;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .track.visible {
          opacity: 1;
        }

        .start-line, .finish-line {
          position: absolute;
          width: 100%;
          height: 4px;
          background: repeating-linear-gradient(
            90deg,
            #ffffff,
            #ffffff 20px,
            transparent 20px,
            transparent 40px
          );
        }

        .start-line {
          top: 0;
        }

        .finish-line {
          bottom: 0;
        }

        .track-curves {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .curve {
          position: absolute;
          border: 2px solid #333;
          border-radius: 50%;
          opacity: 0.3;
        }

        .curve-1 {
          width: 300px;
          height: 300px;
          top: -150px;
          left: 10%;
          border-color: #e10600;
        }

        .curve-2 {
          width: 400px;
          height: 400px;
          top: -200px;
          right: 15%;
          border-color: #0066ff;
        }

        .curve-3 {
          width: 250px;
          height: 250px;
          bottom: -125px;
          left: 40%;
          border-color: #00ff00;
        }

        .f1-car {
          position: absolute;
          left: -200px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .f1-car.racing {
          opacity: 1;
          animation: raceTrack 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .car-body {
          position: relative;
          width: 120px;
          height: 40px;
          background: linear-gradient(135deg, #e10600, #ff4444);
          border-radius: 10px 20px 8px 8px;
        }

        .car-front {
          position: absolute;
          width: 20px;
          height: 25px;
          background: #e10600;
          top: -12px;
          left: 0;
          border-radius: 5px 0 0 5px;
        }

        .car-cockpit {
          position: absolute;
          width: 30px;
          height: 20px;
          background: #1a1a1a;
          top: -8px;
          left: 25px;
          border-radius: 3px;
        }

        .car-rear {
          position: absolute;
          width: 40px;
          height: 30px;
          background: #cc0000;
          right: 0;
          top: 5px;
          border-radius: 0 8px 8px 0;
        }

        .car-wheels {
          position: absolute;
          width: 100%;
          bottom: -8px;
        }

        .wheel {
          position: absolute;
          width: 15px;
          height: 15px;
          background: #333;
          border-radius: 50%;
          border: 2px solid #666;
        }

        .wheel-front {
          left: 15px;
        }

        .wheel-rear {
          right: 15px;
        }

        .exhaust-flame {
          position: absolute;
          right: -15px;
          top: 15px;
          width: 20px;
          height: 8px;
          background: linear-gradient(90deg, #ffaa00, #ff4444);
          border-radius: 0 4px 4px 0;
          opacity: 0;
          animation: exhaust 0.5s infinite alternate;
        }

        .f1-car.racing .exhaust-flame {
          opacity: 1;
        }

        .title-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .title-overlay.visible {
          opacity: 1;
        }

        .title-content {
          text-align: center;
          color: white;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin: 0 0 1rem 0;
          background: linear-gradient(45deg, #ffffff, #e10600, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: titleGlow 2s ease-in-out infinite alternate;
          text-transform: uppercase;
          letter-spacing: 4px;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #cccccc;
          margin-bottom: 2rem;
          letter-spacing: 2px;
        }

        .loading-bar {
          width: 300px;
          height: 4px;
          background: #333;
          border-radius: 2px;
          overflow: hidden;
          margin: 0 auto;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, #e10600, #ff4444);
          animation: loading 2s ease-in-out;
          transform-origin: left;
        }

        @keyframes raceTrack {
          0% {
            left: -200px;
            transform: translateY(-50%) scale(1);
          }
          50% {
            transform: translateY(-50%) scale(1.1);
          }
          100% {
            left: calc(100% + 200px);
            transform: translateY(-50%) scale(1);
          }
        }

        @keyframes exhaust {
          0% {
            transform: scaleX(1);
            opacity: 0.7;
          }
          100% {
            transform: scaleX(1.3);
            opacity: 1;
          }
        }

        @keyframes titleGlow {
          0% {
            background-position: 0% 50%;
            filter: drop-shadow(0 0 10px rgba(225, 6, 0, 0.5));
          }
          100% {
            background-position: 100% 50%;
            filter: drop-shadow(0 0 20px rgba(225, 6, 0, 0.8));
          }
        }

        @keyframes loading {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}