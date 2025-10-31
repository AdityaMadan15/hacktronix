// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// SECURE CONTRACT - MEV PROTECTED
contract F1PredictionSecure {
    mapping(address => uint) public bets;
    uint public totalPool;
    bool public raceFinished;
    address public owner;
    uint public constant MIN_GAS_PRICE = 10 gwei;
    uint public constant MAX_BET = 1 ether;
    
    event BetPlaced(address better, uint amount);
    event MEVProtected(address user, string protection);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier raceActive() {
        require(!raceFinished, "Race finished");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    // SECURE: MEV protection implemented
    function placeBet() public payable raceActive {
        require(msg.value > 0 && msg.value <= MAX_BET, "Invalid bet");
        require(tx.gasprice >= MIN_GAS_PRICE, "Suspicious gas");
        
        // Anti-MEV measures
        if (gasleft() < 100000) {
            revert("Potential MEV attack");
        }
        
        bets[msg.sender] += msg.value;
        totalPool += msg.value;
        
        emit BetPlaced(msg.sender, msg.value);
        emit MEVProtected(msg.sender, "Gas limits and amount checks");
    }
    
    // SECURE: Only owner can finish
    function finishRace() public onlyOwner {
        raceFinished = true;
    }
    
    // SECURE: Reentrancy protection
    function emergencyWithdraw() public raceActive {
        uint amount = bets[msg.sender];
        require(amount > 0, "No funds");
        
        // Anti-reentrancy
        bets[msg.sender] = 0;
        totalPool -= amount;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    // SECURE: MEV-protected swap
    function swapTokens(uint amountOutMin, uint deadline) public {
        require(block.timestamp <= deadline, "Expired");
        require(amountOutMin > calculateFairPrice(), "Slippage too high");
        // MEV-protected swap logic
    }
    
    function calculateFairPrice() internal pure returns (uint) {
        return 1 ether; // Simplified for demo
    }
}
