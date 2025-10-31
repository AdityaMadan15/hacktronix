'use client';

export default function PerformanceMetrics() {
  const metrics = {
    detectionAccuracy: 96.2,
    responseTime: 0.8,
    falsePositives: 1.8,
    transactionsProtected: 1247
  };

  return (
    <div className="performance-metrics">
      <h3>SYSTEM PERFORMANCE METRICS</h3>
      
      <div className="metrics-grid">
        <div className="metric">
          <span className="label">Detection Accuracy</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${metrics.detectionAccuracy}%`}}
            ></div>
          </div>
          <span className="value">{metrics.detectionAccuracy}%</span>
        </div>

        <div className="metric">
          <span className="label">Response Time</span>
          <div className="progress-bar">
            <div 
              className="progress-fill fast" 
              style={{width: `${(1 - metrics.responseTime / 2) * 100}%`}}
            ></div>
          </div>
          <span className="value">{metrics.responseTime}s</span>
        </div>

        <div className="metric">
          <span className="label">False Positives</span>
          <div className="progress-bar">
            <div 
              className="progress-fill good" 
              style={{width: `${metrics.falsePositives}%`}}
            ></div>
          </div>
          <span className="value">{metrics.falsePositives}%</span>
        </div>

        <div className="metric">
          <span className="label">Transactions Protected</span>
          <span className="value large">{metrics.transactionsProtected}</span>
        </div>
      </div>

      <style jsx>{`
        .performance-metrics {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border: 2px solid #ffaa00;
          border-radius: 12px;
          padding: 1.5rem;
          color: white;
        }

        .performance-metrics h3 {
          margin: 0 0 1.5rem 0;
          color: #ffaa00;
          font-size: 1.1rem;
          text-align: center;
        }

        .metrics-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .metric {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .label {
          color: #cccccc;
          font-size: 0.8rem;
          font-weight: 600;
          min-width: 140px;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: #333333;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00ff00, #00cc00);
          transition: width 0.3s ease;
        }

        .progress-fill.fast {
          background: linear-gradient(90deg, #0066ff, #0044cc);
        }

        .progress-fill.good {
          background: linear-gradient(90deg, #ffaa00, #ff8800);
        }

        .value {
          color: #00ff00;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'Digital', monospace;
          min-width: 60px;
          text-align: right;
        }

        .value.large {
          font-size: 1.2rem;
          color: #ffaa00;
        }
      `}</style>
    </div>
  );
}