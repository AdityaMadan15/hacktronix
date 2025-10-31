// src/app/page.js (Updated - Removed Metrics)
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import F1IntroAnimation from './components/F1IntroAnimation';
import RealMevMonitor from './components/RealMevMonitor';
import RealMempoolMonitor from './components/RealMempoolMonitor';
import FlashbotsIntegration from './components/FlashbotsIntegration';
import PerformanceMetrics from './components/PerformanceMetrics';

export default function F1PitWall() {
  const [showIntro, setShowIntro] = useState(true);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [systemStatus, setSystemStatus] = useState({
    flashbotsActive: true,
    realTimeMonitoring: true
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    setTimeout(() => setDashboardVisible(true), 500);
  };

  const activateFlashbots = () => {
    setSystemStatus(prev => ({
      ...prev,
      flashbotsActive: true
    }));
  };

  const showAuditScore = () => {
    setActiveModal('audit-score');
  };

  if (showIntro) {
    return <F1IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <div className={`f1-pitwall ${dashboardVisible ? 'visible' : ''}`}>
      
      {/* Enhanced F1 Racing Header */}
      <header className="f1-header">
        <div className="header-animation">
          <div className="speed-lines">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="speed-line" style={{animationDelay: `${i * 0.1}s`}}></div>
            ))}
          </div>
          <div className="header-red-bar"></div>
          <div className="header-content">
            <div className="team-branding">
              <div className="team-logo">
                <div className="logo-pulse"></div>
                <div className="logo-inner"></div>
              </div>
              <div className="team-info">
                <h1>MEV DEFENSE RACING</h1>
                <p>SECURE DAPP AUDIT EXPRESS • OFFICIAL F1 SECURITY PARTNER</p>
              </div>
            </div>
            <div className="session-info">
              <div className="session-status">
                <span className="status-led active"></span>
                <span className="status-text">DEFENSE SYSTEMS ONLINE</span>
                <div className="signal-bars">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Dashboard - No Security Metrics */}
      <div className="pitwall-dashboard">
        
        {/* Left Column - Clean Controls */}
        <div className="telemetry-column">
          {/* Defense Status Only */}
          <div className="big-display defense-status animated-card">
            <div className="display-glow"></div>
            <div className="display-header">
              <span>SYSTEM STATUS</span>
              <div className="status-badge pulse">ACTIVE</div>
            </div>
            <div className="display-icon">🏎️</div>
            <div className="display-subtitle">MEV DEFENSE ENGAGED</div>
            <div className="defense-stats">
              <div className="defense-stat">
                <span className="stat-label">Uptime</span>
                <span className="stat-value">100%</span>
              </div>
              <div className="defense-stat">
                <span className="stat-label">Response</span>
                <span className="stat-value">&lt;1s</span>
              </div>
            </div>
            <div className="radar-sweep">
              <div className="radar-line"></div>
            </div>
          </div>

          {/* Quick Actions Only */}
          <div className="quick-actions">
            <button className="action-btn primary glow" onClick={showAuditScore}>
              <span className="btn-icon">📊</span>
              <span className="btn-text">VIEW AUDIT REPORT</span>
            </button>
            
            <Link href="/audit" className="action-btn secondary">
              <span className="btn-icon">🔍</span>
              <span className="btn-text">DETAILED ANALYSIS</span>
            </Link>

            <button className="action-btn secondary">
              <span className="btn-icon">⚙️</span>
              <span className="btn-text">SYSTEM SETTINGS</span>
            </button>
          </div>
        </div>

        {/* Center Column - Enhanced Monitoring */}
        <div className="monitoring-column">
          <RealMempoolMonitor />
          <RealMevMonitor />
          <PerformanceMetrics />
        </div>

        {/* Right Column - Enhanced Controls */}
        <div className="controls-column">
          <FlashbotsIntegration />
          
          <div className="status-panel animated-card">
            <div className="panel-glow"></div>
            <div className="panel-header">
              <h3>DEFENSE SYSTEMS</h3>
            </div>
            <div className="systems-grid">
              <div className="system-item active">
                <div className="system-icon">🛡️</div>
                <div className="system-info">
                  <span className="system-name">MEV Detection</span>
                  <span className="system-status">ACTIVE</span>
                </div>
                <div className="system-pulse"></div>
              </div>
              <div className={`system-item ${systemStatus.flashbotsActive ? 'active' : 'standby'}`}>
                <div className="system-icon">⚡</div>
                <div className="system-info">
                  <span className="system-name">Flashbots Relay</span>
                  <span className="system-status">
                    {systemStatus.flashbotsActive ? 'ACTIVE' : 'STANDBY'}
                  </span>
                </div>
                <div className="system-pulse"></div>
              </div>
              <div className="system-item active">
                <div className="system-icon">🔍</div>
                <div className="system-info">
                  <span className="system-name">Mempool Scan</span>
                  <span className="system-status">LIVE</span>
                </div>
                <div className="system-pulse"></div>
              </div>
              <div className="system-item active">
                <div className="system-icon">🎯</div>
                <div className="system-info">
                  <span className="system-name">Pattern Recognition</span>
                  <span className="system-status">ACTIVE</span>
                </div>
                <div className="system-pulse"></div>
              </div>
            </div>
          </div>

          <div className="control-panel animated-card">
            <div className="panel-glow"></div>
            <div className="panel-header">
              <h3>SECURITY CONTROLS</h3>
            </div>
            <div className="controls-grid">
              <button 
                className={`control-btn ${systemStatus.flashbotsActive ? 'active glow' : ''}`}
                onClick={activateFlashbots}
              >
                <span className="control-icon">⚡</span>
                <span className="control-text">
                  {systemStatus.flashbotsActive ? 'FLASHBOTS ACTIVE' : 'ENABLE FLASHBOTS'}
                </span>
              </button>

              <button className="control-btn">
                <span className="control-icon">🔍</span>
                <span className="control-text">SCAN TRANSACTION</span>
              </button>

              <button className="control-btn">
                <span className="control-icon">🔄</span>
                <span className="control-text">SIMULATE TRADE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {activeModal === 'audit-score' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content audit-modal enhanced-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-glow"></div>
            <div className="modal-header">
              <h3>SECUREDAPP AUDIT EXPRESS</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="audit-score-display">
                <div className="score-visualization">
                  <div className="score-orb pulse">
                    <div className="orb-glow"></div>
                    <div className="score-content">
                      <div className="score-grade">A+</div>
                      <div className="score-percentage">98%</div>
                    </div>
                  </div>
                  <div className="score-rings">
                    <div className="ring ring-1"></div>
                    <div className="ring ring-2"></div>
                    <div className="ring ring-3"></div>
                  </div>
                </div>
                <div className="score-details">
                  <h4>SECURITY ASSESSMENT COMPLETE</h4>
                  <p>Smart Contract successfully passed all security validation checks</p>
                  
                  <div className="verification-badges">
                    <div className="verification-badge success">
                      <span className="badge-icon">✅</span>
                      <span className="badge-text">Vulnerability Scan</span>
                    </div>
                    <div className="verification-badge success">
                      <span className="badge-icon">🛡️</span>
                      <span className="badge-text">MEV Protection</span>
                    </div>
                    <div className="verification-badge success">
                      <span className="badge-icon">⚡</span>
                      <span className="badge-text">Gas Optimization</span>
                    </div>
                    <div className="verification-badge success">
                      <span className="badge-icon">🔒</span>
                      <span className="badge-text">Access Control</span>
                    </div>
                  </div>

                  <div className="audit-actions">
                    <Link href="/audit" className="action-btn primary glow">
                      Full Technical Report
                    </Link>
                    <button className="action-btn secondary" onClick={() => setActiveModal(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Racing Effects */}
      <div className="background-effects">
        <div className="grid-lines"></div>
        <div className="particles">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .f1-pitwall {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease;
        }

        .f1-pitwall.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Enhanced Header */
        .f1-header {
          position: relative;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          border-bottom: 4px solid #e10600;
          overflow: hidden;
        }

        .header-animation {
          position: relative;
        }

        .speed-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .speed-line {
          position: absolute;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #e10600, transparent);
          animation: speedLine 1.5s linear infinite;
          opacity: 0;
        }

        .header-red-bar {
          height: 4px;
          background: linear-gradient(90deg, #e10600, #ff4444, #e10600);
          width: 100%;
          animation: shimmer 2s infinite;
        }

        .team-logo {
          position: relative;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #e10600 0%, #ff4444 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #e10600;
          animation: pulse 2s infinite;
        }

        .logo-inner {
          width: 30px;
          height: 30px;
          background: #000000;
          border-radius: 50%;
          border: 2px solid #ffffff;
          position: relative;
          z-index: 2;
        }

        .team-info h1 {
          font-size: 1.6rem;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(45deg, #ffffff, #e10600, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: gradientShift 3s ease infinite;
          letter-spacing: 1.5px;
        }

        .team-info p {
          font-size: 0.75rem;
          color: #cccccc;
          margin: 0;
          letter-spacing: 1px;
        }

        .session-status {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          backdrop-filter: blur(10px);
        }

        .status-led {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
        }

        .status-led.active {
          background: #00ff00;
          animation: pulse 1s infinite;
        }

        .signal-bars {
          display: flex;
          align-items: end;
          gap: 2px;
          margin-left: 10px;
        }

        .bar {
          width: 3px;
          background: #00ff00;
          animation: signal 1.5s infinite ease-in-out;
        }

        .bar:nth-child(1) { height: 5px; animation-delay: 0.1s; }
        .bar:nth-child(2) { height: 8px; animation-delay: 0.2s; }
        .bar:nth-child(3) { height: 11px; animation-delay: 0.3s; }
        .bar:nth-child(4) { height: 14px; animation-delay: 0.4s; }

        /* Clean Dashboard */
        .pitwall-dashboard {
          display: grid;
          grid-template-columns: 350px 1fr 350px;
          gap: 1.5rem;
          padding: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 80px);
        }

        .big-display {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          border: 2px solid #00ff00;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .display-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: scan 3s linear infinite;
        }

        .display-header {
          color: #00ff00;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-badge {
          background: #00ff00;
          color: #000000;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .display-icon {
          font-size: 4rem;
          margin: 1rem 0;
          filter: drop-shadow(0 0 20px rgba(0, 255, 0, 0.5));
        }

        .display-subtitle {
          color: #00ff00;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        .defense-stats {
          display: flex;
          justify-content: space-around;
        }

        .defense-stat {
          text-align: center;
        }

        .stat-label {
          display: block;
          color: #cccccc;
          font-size: 0.7rem;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          display: block;
          color: #00ff00;
          font-size: 1.2rem;
          font-weight: 800;
          font-family: 'Digital', monospace;
        }

        .radar-sweep {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
        }

        .radar-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ff00, transparent);
          animation: radar 4s linear infinite;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .action-btn {
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #e10600, #ff4444);
          color: #ffffff;
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid #333333;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .btn-icon {
          font-size: 1.1rem;
        }

        .glow {
          box-shadow: 0 0 20px rgba(225, 6, 0, 0.5);
          animation: glowPulse 2s ease-in-out infinite alternate;
        }

        /* Jaw-dropping Audit Modal */
        .audit-score-display {
          text-align: center;
        }

        .score-visualization {
          position: relative;
          margin: 0 auto 3rem;
          width: 200px;
          height: 200px;
        }

        .score-orb {
          position: relative;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #00ff00, #00cc00);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          box-shadow: 
            0 0 50px rgba(0, 255, 0, 0.5),
            inset 0 0 50px rgba(255, 255, 255, 0.1);
          z-index: 2;
        }

        .orb-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,0,0.4) 0%, transparent 70%);
          animation: orbPulse 2s ease-in-out infinite alternate;
        }

        .score-content {
          position: relative;
          z-index: 3;
        }

        .score-grade {
          font-size: 2.5rem;
          font-weight: 900;
          color: #000000;
          line-height: 1;
        }

        .score-percentage {
          font-size: 1.2rem;
          font-weight: 700;
          color: #000000;
          opacity: 0.9;
        }

        .score-rings {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .ring {
          position: absolute;
          border: 2px solid rgba(0, 255, 0, 0.3);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ringExpand 3s ease-out infinite;
        }

        .ring-1 {
          width: 180px;
          height: 180px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 200px;
          height: 200px;
          animation-delay: 1s;
        }

        .ring-3 {
          width: 220px;
          height: 220px;
          animation-delay: 2s;
        }

        .score-details h4 {
          color: #ffffff;
          font-size: 1.5rem;
          margin: 0 0 1rem 0;
          background: linear-gradient(45deg, #ffffff, #00ff00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .score-details p {
          color: #cccccc;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .verification-badges {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .verification-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(0, 255, 0, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(0, 255, 0, 0.3);
        }

        .verification-badge.success {
          background: rgba(0, 255, 0, 0.1);
          border-color: rgba(0, 255, 0, 0.3);
        }

        .badge-icon {
          font-size: 1.2rem;
        }

        .badge-text {
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .audit-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        /* Animations */
        @keyframes speedLine {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px));
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        @keyframes signal {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes radar {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 20px rgba(225, 6, 0, 0.5); }
          100% { box-shadow: 0 0 30px rgba(225, 6, 0, 0.8); }
        }

        @keyframes orbPulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes ringExpand {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: var(--ring-size);
            height: var(--ring-size);
            opacity: 0;
          }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Add other existing styles as needed */
      `}</style>
    </div>
  );
}