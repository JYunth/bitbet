// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CrashGameContract {
    IERC20 public wbtcToken;

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
    constructor(address _owner, address _wbtcTokenAddress) {
        owner = _owner;
        wbtcToken = IERC20(_wbtcTokenAddress);
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

    function placeBet(uint256 amount) public gameIsInProgress {
        require(amount > 0, "Bet amount must be greater than 0");
        require(wbtcToken.balanceOf(msg.sender) >= amount, "Insufficient WBTC balance");
        require(wbtcToken.allowance(msg.sender, address(this)) >= amount, "Insufficient WBTC allowance");

        wbtcToken.transferFrom(msg.sender, address(this), amount);
        playerBets[msg.sender] = amount;
        totalBets += amount;

        if (!hasPlacedBet[msg.sender]) {
            players.push(msg.sender);
            hasPlacedBet[msg.sender] = true;
        }

        emit BetPlaced(msg.sender, amount);
    }

    function cashOut() public gameIsInProgress {
        require(playerBets[msg.sender] > 0, "No active bet found");
        require(playerCashouts[msg.sender] == 0, "Already cashed out");

        uint256 currentMultiplier = getCurrentMultiplier(); // Implement this function
        require(currentMultiplier < crashPoint, "Game has already crashed");

        uint256 payout = (playerBets[msg.sender] * currentMultiplier) / 100;
        playerCashouts[msg.sender] = payout;
        require(wbtcToken.transfer(msg.sender, payout), "WBTC transfer failed");

        emit PlayerCashedOut(msg.sender, payout, currentMultiplier);
    }

    function endGame() public isOwner gameIsInProgress {
        gameInProgress = false;
        for (uint i = 0; i < players.length; i++) {
            address player = players[i];
            if (playerCashouts[player] > 0) {
                require(wbtcToken.transfer(player, playerCashouts[player]), "WBTC transfer failed");
            }
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
        uint256 balance = wbtcToken.balanceOf(address(this));
        require(wbtcToken.transfer(owner, balance), "WBTC transfer failed");
    }

    receive() external payable {}
}