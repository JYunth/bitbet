//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract CrashGameContract {
    // State Variables
    address public owner;
    uint256 public crashPoint;
    uint256 public totalBets;
    uint256 public gameCounter;
    bool public gameInProgress;
    mapping(address => uint256) public playerBets;
    mapping(address => uint256) public playerCashouts;
	address[] public players;
    mapping(address => bool) public hasPlacedBet;

    // Events
    event GameStarted(uint256 gameId);
    event BetPlaced(address player, uint256 amount);
    event PlayerCashedOut(address player, uint256 amount, uint256 multiplier);
    event GameEnded(uint256 gameId, uint256 crashPoint);

    // Constructor
    constructor(address _owner) {
        owner = _owner;
        gameCounter = 0;
        gameInProgress = false;
    }

    // Modifiers
    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    modifier gameNotInProgress() {
        require(!gameInProgress, "Game is already in progress");
        _;
    }

    modifier gameIsInProgress() {
        require(gameInProgress, "No game in progress");
        _;
    }

    // Functions
    function startGame() public isOwner gameNotInProgress {
        gameInProgress = true;
        gameCounter++;
        crashPoint = generateCrashPoint(); // Implement this function securely
        totalBets = 0;
        emit GameStarted(gameCounter);
    }


    function placeBet() public payable gameIsInProgress {
        require(msg.value > 0, "Bet amount must be greater than 0");
        require(playerBets[msg.sender] == 0, "Player has already placed a bet");

        playerBets[msg.sender] = msg.value;
        totalBets += msg.value;

		if (!hasPlacedBet[msg.sender]) {
            players.push(msg.sender);
            hasPlacedBet[msg.sender] = true;
        }

        emit BetPlaced(msg.sender, msg.value);
    }

    function cashOut() public gameIsInProgress {
        require(playerBets[msg.sender] > 0, "No active bet found");
        require(playerCashouts[msg.sender] == 0, "Already cashed out");

        uint256 currentMultiplier = getCurrentMultiplier(); // Implement this function
        require(currentMultiplier < crashPoint, "Game has already crashed");

        uint256 payout = (playerBets[msg.sender] * currentMultiplier) / 100;
        playerCashouts[msg.sender] = payout;

        emit PlayerCashedOut(msg.sender, payout, currentMultiplier);
    }

    function endGame() public isOwner gameIsInProgress {
        gameInProgress = false;
        for (uint i = 0; i < players.length; i++) {
            address player = players[i];
			if (playerCashouts[player] > 0) {
                // Transfer winnings to player
                (bool success, ) = player.call{value: playerCashouts[player]}("");
                require(success, "Failed to send Ether");
            }
            // Reset player data
            playerBets[player] = 0;
            playerCashouts[player] = 0;
			hasPlacedBet[player] = false;
        }
		delete players;
        emit GameEnded(gameCounter, crashPoint);
    }

    function generateCrashPoint() internal view returns (uint256) {
        // Implement a secure random number generation
        // This is a placeholder and NOT secure for production
        return (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 500) + 100;
    }

    function getCurrentMultiplier() internal pure returns (uint256) {
        // Implement the logic to calculate the current multiplier
        // This is a placeholder
        return 150; // represents 1.5x
    }

    // Function to withdraw contract balance (for owner)
    function withdraw() public isOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    receive() external payable {}
}
