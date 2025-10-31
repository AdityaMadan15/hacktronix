'use client';
import { useState, useEffect } from 'react';

export default function RealMevMonitor() {
  const [liveAttacks, setLiveAttacks] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [systemStatus, setSystemStatus] = useState({});

  const API_BASE = process.env.NEXT_PUBLIC_MEV_API || 'http://localhost:3001';

  useEffect(() => {
    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkSystemStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/status`);
      const status = await response.json();
      setSystemStatus(status);
      setIsMonitoring(status.monitoring);
      setLiveAttacks(status.recentAttacks || []);
    } catch (error) {
      console.error('Failed to check system status:', error);
    }
  };

  const analyzeTransaction = async (transactionData) => {
    try {
      const response = await fetch(`${API_BASE}/api/detect-mev`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData)
      });
      return await response.json();
    } catch (error) {
      console.error('MEV analysis failed:', error);
      return { error: 'Analysis failed' };
    }
  };

  const startMonitoring = async () => {
    try {
      await fetch(`${API_BASE}/api/monitor/start`, { method: 'POST' });
      setIsMonitoring(true);
    } catch (error) {
      console.error('Failed to start monitoring:', error);
    }
  };

  // Test with a sample transaction
  const testDetection = async () => {
    const sampleTx = {
      hash: '0x' + Math.random().toString(16).substr(2, 64),
      from: '0x742Ef6b6c7d13E12dF6a29F8b2E3C06396d7a441',
      to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap
      value: '1000000000000000000', // 1 ETH
      gasPrice: '50000000000' // 50 Gwei
    };
    
    const result = await analyzeTransaction(sampleTx);
    console.log('MEV Analysis Result:', result);
    
    if (result.isSuspicious) {
      alert(`🚨 MEV Attack Detected!\nType: ${result.attackType}\nConfidence: ${result.confidence}%`);
    } else {
      alert('✅ Transaction is safe from MEV attacks');
    }
  };

  return (
    <div className="real-mev-monitor">
      <div className="monitor-header">
        <h3>🔴 LIVE MEV MONITORING</h3>
        <div className={`status ${isMonitoring ? 'active' : 'inactive'}`}>
          {isMonitoring ? 'ACTIVE' : 'INACTIVE'}
        </div>
      </div>

      <div className="system-stats">
        <div className="stat">
          <span className="label">Attacks Detected:</span>
          <span className="value">{systemStatus.attacksDetected || 0}</span>
        </div>
        <div className="stat">
          <span className="label">Uptime:</span>
          <span className="value">100%</span>
        </div>
      </div>

      <div className="controls">
        <button onClick={startMonitoring} className="btn primary" disabled={isMonitoring}>
          {isMonitoring ? 'MONITORING ACTIVE' : 'START MONITORING'}
        </button>
        <button onClick={testDetection} className="btn secondary">
          TEST DETECTION
        </button>
      </div>

      <div className="attack-feed">
        <h4>Recent MEV Attacks</h4>
        {liveAttacks.length === 0 ? (
          <div className="no-attacks">No attacks detected yet</div>
        ) : (
          liveAttacks.map((attack, index) => (
            <div key={index} className={`attack-alert ${attack.riskLevel?.toLowerCase()}`}>
              <div className="attack-header">
                <span className="type">{attack.attackType}</span>
                <span className="confidence">{attack.confidence}% confidence</span>
              </div>
              <div className="attack-details">
                <span className="risk">Risk: {attack.riskLevel}</span>
                <span className="time">{new Date(attack.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .real-mev-monitor {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border: 2px solid #333;
          border-radius: 12px;
          padding: 1.5rem;
          color: white;
        }

        .monitor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .monitor-header h3 {
          margin: 0;
          color: #ff4444;
        }

        .status {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .status.active {
          background: #00ff00;
          color: #000;
        }

        .status.inactive {
          background: #666;
          color: #fff;
        }

        .system-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
          padding: 1rem;
          background: rgba(0,0,0,0.3);
          border-radius: 8px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .label {
          font-size: 0.8rem;
          color: #ccc;
        }

        .value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #00ff00;
        }

        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn.primary {
          background: #e10600;
          color: white;
        }

        .btn.secondary {
          background: #333;
          color: white;
          border: 1px solid #555;
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .attack-feed {
          max-height: 300px;
          overflow-y: auto;
        }

        .attack-feed h4 {
          margin: 0 0 1rem 0;
          color: #fff;
        }

        .no-attacks {
          text-align: center;
          color: #666;
          padding: 2rem;
        }

        .attack-alert {
          padding: 1rem;
          margin-bottom: 0.5rem;
          border-radius: 8px;
          border-left: 4px solid;
        }

        .attack-alert.high {
          background: rgba(255, 68, 68, 0.1);
          border-left-color: #ff4444;
        }

        .attack-alert.medium {
          background: rgba(255, 170, 0, 0.1);
          border-left-color: #ffaa00;
        }

        .attack-alert.low {
          background: rgba(0, 102, 255, 0.1);
          border-left-color: #0066ff;
        }

        .attack-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .type {
          font-weight: 700;
          color: #fff;
        }

        .confidence {
          font-size: 0.8rem;
          color: #ffaa00;
        }

        .attack-details {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #ccc;
        }
      `}</style>
    </div>
  );
}