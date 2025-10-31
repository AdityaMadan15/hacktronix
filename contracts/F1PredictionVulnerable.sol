// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// VULNERABLE CONTRACT - MEV BOTS CAN EXPLOIT THIS
contract F1PredictionVulnerable {
    mapping(address => uint) public bets;
    uint public totalPool;
    bool public raceFinished;
    
    event BetPlaced(address better, uint amount);
    
    // VULNERABLE: No access control, no slippage protection
    function placeBet() public payable {
        require(!raceFinished, "Race finished");
        require(msg.value > 0, "Need to bet something");
        
        bets[msg.sender] += msg.value;
        totalPool += msg.value;
        
        emit BetPlaced(msg.sender, msg.value);
    }
    
    // VULNERABLE: Anyone can finish race
    function finishRace() public {
        raceFinished = true;
    }
    
    // VULNERABLE: Reentrancy attack possible
    function emergencyWithdraw() public {
        uint amount = bets[msg.sender];
        bets[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    
    // VULNERABLE: No MEV protection
    function swapTokens(uint amountOutMin) public {
        // Simulate DEX swap without protection
        // MEV bots can front-run this
    }
}