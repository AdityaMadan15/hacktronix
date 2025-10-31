// src/app/services/mempool-monitor.js
export class MempoolMonitor {
  constructor() {
    this.wsConnection = null;
    this.subscribers = [];
    this.detectedAttacks = [];
  }

  async startMonitoring() {
    try {
      // Connect to WebSocket for real-time mempool
      this.wsConnection = new WebSocket(`wss://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`);
      
      this.wsConnection.onopen = () => {
        console.log('MEV Monitor: Connected to mempool');
        this.subscribeToPendingTransactions();
      };

      this.wsConnection.onmessage = (event) => {
        this.handleNewTransaction(JSON.parse(event.data));
      };

      this.wsConnection.onerror = (error) => {
        console.error('MEV Monitor WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to start MEV monitoring:', error);
    }
  }

  subscribeToPendingTransactions() {
    const subscriptionMsg = {
      jsonrpc: '2.0',
      method: 'eth_subscribe',
      params: ['alchemy_pendingTransactions'],
      id: 1
    };
    
    this.wsConnection.send(JSON.stringify(subscriptionMsg));
  }

  async handleNewTransaction(txData) {
    // Analyze each new transaction for MEV patterns
    const analysis = await RealMEVDetector.analyzeTransaction(txData);
    
    if (analysis.isSuspicious) {
      this.detectedAttacks.push({
        ...analysis,
        transaction: txData,
        timestamp: new Date().toISOString()
      });

      // Notify all subscribers (UI components)
      this.notifySubscribers(analysis);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notifySubscribers(analysis) {
    this.subscribers.forEach(callback => callback(analysis));
  }

  getRecentAttacks() {
    return this.detectedAttacks.slice(-10); // Last 10 detected attacks
  }
}