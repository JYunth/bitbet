// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBase.sol";

contract BustabitGame is VRFConsumerBase, Ownable {
    uint256 public gameId;
    uint256 public crashPoint;
    bool public gameRunning;
    bytes32 internal keyHash;
    uint256 internal fee;
    
    struct Bet {
        address player;
        uint256 amount;
        uint256 multiplier;
    }

    mapping(uint256 => Bet[]) public bets;

    event GameStarted(uint256 gameId);
    event BetPlaced(uint256 gameId, address indexed player, uint256 amount, uint256 multiplier);
    event GameEnded(uint256 gameId, uint256 crashPoint);

    constructor(address _vrfCoordinator, address _link, bytes32 _keyHash, uint256 _fee)
        VRFConsumerBase(_vrfCoordinator, _link)
    {
        keyHash = _keyHash;
        fee = _fee;
    }

    function startGame() public onlyOwner {
        require(!gameRunning, "Game already running");
        gameRunning = true;
        gameId++;
        requestRandomness(keyHash, fee);
        emit GameStarted(gameId);
    }

    function placeBet(uint256 _multiplier) public payable {
        require(gameRunning, "Game not running");
        require(msg.value > 0, "Bet amount must be greater than zero");
        bets[gameId].push(Bet(msg.sender, msg.value, _multiplier));
        emit BetPlaced(gameId, msg.sender, msg.value, _multiplier);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        crashPoint = (randomness % 10000) + 100; // Example crash point logic
        gameRunning = false;
        emit GameEnded(gameId, crashPoint);
        settleBets();
    }

    function settleBets() internal {
        Bet[] storage gameBets = bets[gameId];
        for (uint256 i = 0; i < gameBets.length; i++) {
            if (gameBets[i].multiplier <= crashPoint) {
                uint256 payout = gameBets[i].amount * gameBets[i].multiplier / 100;
                payable(gameBets[i].player).transfer(payout);
            }
        }
    }

    receive() external payable {}
}
