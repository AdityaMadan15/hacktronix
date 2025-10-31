// src/app/audit/page.js (Epic Redesign)
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AuditReport() {
  const [scanProgress, setScanProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [activeVulnerability, setActiveVulnerability] = useState(null);

  useEffect(() => {
    // Simulate audit scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowResults(true), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const vulnerabilities = [
    {
      id: 1,
      name: 'Reentrancy Attack',
      severity: 'CRITICAL',
      status: 'FIXED',
      description: 'Contract could be drained by recursive function calls',
      fix: 'Added reentrancy guard and checks-effects-interactions pattern',
      impact: 'Complete funds theft',
      detection: 'SecureDApp Static Analysis'
    },
    {
      id: 2,
      name: 'Front-Running Vulnerability',
      severity: 'HIGH',
      status: 'FIXED',
      description: 'MEV bots could front-run transactions for profit extraction',
      fix: 'Implemented slippage protection and deadline enforcement',
      impact: 'Value extraction & user loss',
      detection: 'MEV Pattern Detection'
    }
  ];

  if (!showResults) {
    return (
      <div className="audit-scanning">
        <div className="scan-container">
          <div className="scan-animation">
            <div className="scan-beam"></div>
            <div className="scan-target"></div>
            <div className="scan-particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="particle" style={{
                  animationDelay: `${i * 0.2}s`,
                  left: `${Math.random() * 100}%`
                }}></div>
              ))}
            </div>
          </div>
          <div className="scan-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${scanProgress}%`}}
              ></div>
            </div>
            <div className="progress-text">
              <span>SECUREDAPP AUDIT IN PROGRESS</span>
              <span>{scanProgress}%</span>
            </div>
          </div>
          <div className="scan-status">
            <div className="status-item">
              <span className="status-dot scanning"></span>
              <span>Vulnerability Analysis</span>
            </div>
            <div className="status-item">
              <span className="status-dot scanning"></span>
              <span>MEV Protection Check</span>
            </div>
            <div className="status-item">
              <span className="status-dot scanning"></span>
              <span>Gas Optimization</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .audit-scanning {
            background: linear-gradient(135deg, #0a0a0a 0%, #000000 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: 'Titillium Web', sans-serif;
          }

          .scan-container {
            text-align: center;
            width: 100%;
            max-width: 600px;
          }

          .scan-animation {
            position: relative;
            height: 200px;
            margin-bottom: 3rem;
          }

          .scan-beam {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff00, transparent);
            animation: scanBeam 2s ease-in-out infinite;
            box-shadow: 0 0 20px #00ff00;
          }

          .scan-target {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border: 2px solid #00ff00;
            border-radius: 50%;
            box-shadow: 
              0 0 30px rgba(0, 255, 0, 0.5),
              inset 0 0 30px rgba(0, 255, 0, 0.2);
          }

          .scan-target::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            border: 1px solid rgba(0, 255, 0, 0.5);
            border-radius: 50%;
            animation: targetPulse 2s ease-in-out infinite;
          }

          .scan-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00ff00;
            border-radius: 50%;
            animation: particleFloat 3s ease-in-out infinite;
          }

          .scan-progress {
            margin-bottom: 2rem;
          }

          .progress-bar {
            width: 100%;
            height: 6px;
            background: #333;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 1rem;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00ff00, #00cc00);
            transition: width 0.3s ease;
            box-shadow: 0 0 10px #00ff00;
          }

          .progress-text {
            display: flex;
            justify-content: space-between;
            color: #00ff00;
            font-weight: 600;
            font-size: 0.9rem;
          }

          .scan-status {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .status-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: center;
            color: #cccccc;
          }

          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }

          .status-dot.scanning {
            background: #ffaa00;
            animation: pulse 1.5s infinite;
          }

          @keyframes scanBeam {
            0%, 100% {
              transform: translateX(-100%);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(100%);
              opacity: 0;
            }
          }

          @keyframes targetPulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
              opacity: 0.7;
            }
          }

          @keyframes particleFloat {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100px) rotate(180deg);
              opacity: 0;
            }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="audit-report">
      {/* Epic Header */}
      <header className="audit-header">
        <div className="header-glow"></div>
        <div className="header-content">
          <Link href="/" className="back-button">
            <span>← BACK TO PIT WALL</span>
          </Link>
          <div className="title-section">
            <h1>SECUREDAPP AUDIT EXPRESS</h1>
            <p>COMPREHENSIVE SECURITY ANALYSIS REPORT</p>
          </div>
          <div className="score-display">
            <div className="final-score pulse">
              <div className="score-grade">A+</div>
              <div className="score-percentage">98%</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="audit-container">
        
        {/* Security Overview */}
        <div className="security-overview animated-card">
          <div className="overview-glow"></div>
          <h2>SECURITY OVERVIEW</h2>
          <div className="overview-grid">
            <div className="overview-item success">
              <div className="item-icon">✅</div>
              <div className="item-content">
                <span className="item-value">0</span>
                <span className="item-label">Critical Issues</span>
              </div>
            </div>
            <div className="overview-item success">
              <div className="item-icon">🛡️</div>
              <div className="item-content">
                <span className="item-value">100%</span>
                <span className="item-label">MEV Protected</span>
              </div>
            </div>
            <div className="overview-item success">
              <div className="item-icon">⚡</div>
              <div className="item-content">
                <span className="item-value">A+</span>
                <span className="item-label">Security Grade</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vulnerability Analysis */}
        <div className="vulnerability-section">
          <h2>VULNERABILITY ANALYSIS</h2>
          <div className="vulnerabilities-grid">
            {vulnerabilities.map((vuln) => (
              <div 
                key={vuln.id}
                className={`vulnerability-card ${vuln.severity.toLowerCase()} ${vuln.status.toLowerCase()}`}
                onClick={() => setActiveVulnerability(vuln)}
              >
                <div className="card-glow"></div>
                <div className="card-header">
                  <h3>{vuln.name}</h3>
                  <div className="severity-badge">{vuln.severity}</div>
                </div>
                <div className="card-status">{vuln.status}</div>
                <p>{vuln.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MEV Protection Status */}
        <div className="mev-protection-section animated-card">
          <div className="section-glow"></div>
          <h2>MEV PROTECTION STATUS</h2>
          <div className="protection-grid">
            <div className="protection-item active">
              <div className="protection-icon">🛡️</div>
              <div className="protection-info">
                <span className="protection-name">Front-Running Protection</span>
                <span className="protection-status">ACTIVE</span>
              </div>
            </div>
            <div className="protection-item active">
              <div className="protection-icon">⚡</div>
              <div className="protection-info">
                <span className="protection-name">Flashbots Integration</span>
                <span className="protection-status">ACTIVE</span>
              </div>
            </div>
            <div className="protection-item active">
              <div className="protection-icon">🔍</div>
              <div className="protection-info">
                <span className="protection-name">Mempool Monitoring</span>
                <span className="protection-status">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Vulnerability Detail Modal */}
      {activeVulnerability && (
        <div className="modal-overlay" onClick={() => setActiveVulnerability(null)}>
          <div className="modal-content vulnerability-modal enhanced-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-glow"></div>
            <div className="modal-header">
              <h3>{activeVulnerability.name}</h3>
              <button className="modal-close" onClick={() => setActiveVulnerability(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="vulnerability-details">
                <div className="detail-row">
                  <span className="detail-label">Severity:</span>
                  <span className={`detail-value ${activeVulnerability.severity.toLowerCase()}`}>
                    {activeVulnerability.severity}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value fixed">{activeVulnerability.status}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Impact:</span>
                  <span className="detail-value">{activeVulnerability.impact}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Detection:</span>
                  <span className="detail-value">{activeVulnerability.detection}</span>
                </div>
                <div className="detail-section">
                  <h4>Fix Applied</h4>
                  <p>{activeVulnerability.fix}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Effects */}
      <div className="background-effects">
        <div className="scan-lines"></div>
        <div className="floating-elements">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="floating-element" style={{
              animationDelay: `${i * 2}s`,
              left: `${Math.random() * 100}%`
            }}></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .audit-report {
          background: linear-gradient(135deg, #0a0a0a 0%, #000000 100%);
          min-height: 100vh;
          color: white;
          font-family: 'Titillium Web', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .audit-header {
          position: relative;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          border-bottom: 4px solid #00ff00;
          padding: 2rem;
          overflow: hidden;
        }

        .header-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,255,0,0.1), transparent);
          animation: scan 4s linear infinite;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .back-button {
          color: #cccccc;
          text-decoration: none;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border: 1px solid #333;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          color: #00ff00;
          border-color: #00ff00;
        }

        .title-section h1 {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0;
          background: linear-gradient(45deg, #ffffff, #00ff00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
        }

        .title-section p {
          color: #cccccc;
          margin: 0.5rem 0 0 0;
          text-align: center;
          font-size: 0.9rem;
        }

        .final-score {
          background: linear-gradient(135deg, #00ff00, #00cc00);
          color: #000000;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
        }

        .score-grade {
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
        }

        .score-percentage {
          font-size: 1rem;
          font-weight: 700;
        }

        .audit-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .animated-card {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          padding: 2rem;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border: 1px solid #333;
        }

        .overview-glow, .section-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,255,0,0.1), transparent);
          animation: scan 3s linear infinite;
        }

        .security-overview h2 {
          color: #00ff00;
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .overview-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          border-left: 4px solid #00ff00;
        }

        .item-icon {
          font-size: 2rem;
        }

        .item-content {
          display: flex;
          flex-direction: column;
        }

        .item-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #00ff00;
          font-family: 'Digital', monospace;
        }

        .item-label {
          color: #cccccc;
          font-size: 0.9rem;
        }

        .vulnerability-section h2 {
          color: #ffffff;
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }

        .vulnerabilities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .vulnerability-card {
          position: relative;
          padding: 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 4px solid;
          overflow: hidden;
        }

        .vulnerability-card.critical {
          background: rgba(255, 68, 68, 0.1);
          border-left-color: #ff4444;
        }

        .vulnerability-card.high {
          background: rgba(255, 170, 0, 0.1);
          border-left-color: #ffaa00;
        }

        .vulnerability-card.fixed {
          background: rgba(0, 255, 0, 0.1);
          border-left-color: #00ff00;
        }

        .vulnerability-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: scan 2s linear infinite;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-header h3 {
          margin: 0;
          color: #ffffff;
          font-size: 1.1rem;
        }

        .severity-badge {
          padding: 0.4rem 0.8rem;
          border-radius: 15px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .vulnerability-card.critical .severity-badge {
          background: #ff4444;
          color: #ffffff;
        }

        .vulnerability-card.high .severity-badge {
          background: #ffaa00;
          color: #000000;
        }

        .card-status {
          color: #00ff00;
          font-weight: 700;
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }

        .vulnerability-card p {
          color: #cccccc;
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .mev-protection-section h2 {
          color: #00ff00;
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }

        .protection-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .protection-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          border-left: 4px solid #00ff00;
        }

        .protection-icon {
          font-size: 1.5rem;
        }

        .protection-info {
          flex: 1;
        }

        .protection-name {
          display: block;
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .protection-status {
          display: block;
          color: #00ff00;
          font-size: 0.8rem;
          font-weight: 700;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .vulnerability-modal {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-radius: 16px;
          border: 2px solid #00ff00;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #333;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
        }

        .modal-header h3 {
          color: #ffffff;
          margin: 0;
          font-size: 1.3rem;
        }

        .modal-close {
          background: #ff4444;
          color: #ffffff;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .vulnerability-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #333;
        }

        .detail-label {
          color: #cccccc;
          font-weight: 600;
        }

        .detail-value {
          font-weight: 700;
        }

        .detail-value.critical {
          color: #ff4444;
        }

        .detail-value.high {
          color: #ffaa00;
        }

        .detail-value.fixed {
          color: #00ff00;
        }

        .detail-section h4 {
          color: #ffffff;
          margin: 1rem 0 0.5rem 0;
        }

        .detail-section p {
          color: #cccccc;
          line-height: 1.5;
        }

        /* Background Effects */
        .background-effects {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .scan-lines {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0,255,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,0,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .floating-element {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00ff00;
          border-radius: 50%;
          animation: floatElement 10s ease-in-out infinite;
          bottom: -10px;
        }

        /* Animations */
        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes floatElement {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}