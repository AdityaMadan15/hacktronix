const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple MEV Detector (we'll enhance this)
class RealMEVDetector {
  static async analyzeForMEV(txData) {
    console.log('🔍 Analyzing transaction for MEV...', txData);
    
    // Simulate real analysis (we'll make this real soon)
    const analysis = {
      isSuspicious: Math.random() > 0.7, // 30% chance of detection for demo
      attackType: ['SANDWICH_ATTACK', 'FRONT_RUNNING', 'ARBITRAGE_BOT'][Math.floor(Math.random() * 3)],
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100% confidence
      riskLevel: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)],
      recommendations: ['Use Flashbots Protect', 'Increase slippage', 'Wait for lower gas'],
      timestamp: new Date().toISOString()
    };

    return analysis;
  }
}

// Mempool Monitor
class MempoolMonitor {
  constructor() {
    this.detectedAttacks = [];
    this.isMonitoring = false;
  }

  startMonitoring() {
    this.isMonitoring = true;
    console.log('🚀 MEV Mempool Monitoring Started');
    
    // Simulate live attacks for demo
    setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance of simulated attack
        const simulatedAttack = {
          isSuspicious: true,
          attackType: ['SANDWICH', 'FRONT_RUN', 'BACK_RUN'][Math.floor(Math.random() * 3)],
          confidence: Math.floor(Math.random() * 30) + 70,
          riskLevel: ['MEDIUM', 'HIGH'][Math.floor(Math.random() * 2)],
          transaction: { hash: '0x' + Math.random().toString(16).substr(2, 64) },
          timestamp: new Date().toISOString()
        };
        
        this.detectedAttacks.push(simulatedAttack);
        console.log('🚨 MEV Attack Detected:', simulatedAttack.attackType);
      }
    }, 5000); // Check every 5 seconds
  }

  getRecentAttacks() {
    return this.detectedAttacks.slice(-10);
  }
}

const monitor = new MempoolMonitor();

// API Routes
app.post('/api/detect-mev', async (req, res) => {
  try {
    const analysis = await RealMEVDetector.analyzeForMEV(req.body);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'MEV analysis failed' });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'active', 
    monitoring: monitor.isMonitoring,
    attacksDetected: monitor.getRecentAttacks().length,
    recentAttacks: monitor.getRecentAttacks()
  });
});

app.get('/api/attacks', (req, res) => {
  res.json(monitor.getRecentAttacks());
});

app.post('/api/monitor/start', (req, res) => {
  monitor.startMonitoring();
  res.json({ status: 'monitoring_started' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔍 MEV Detection API running on http://localhost:${PORT}`);
  console.log(`📊 Endpoints:`);
  console.log(`   POST /api/detect-mev - Analyze transaction for MEV`);
  console.log(`   GET  /api/status - System status`);
  console.log(`   GET  /api/attacks - Recent detected attacks`);
  console.log(`   POST /api/monitor/start - Start monitoring`);
  
  // Start monitoring automatically
  monitor.startMonitoring();
});