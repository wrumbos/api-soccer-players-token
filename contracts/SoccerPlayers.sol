pragma solidity ^0.8.1;

import "./BaseERC721.sol";


contract SoccerPlayers is BaseERC721{

    struct Player{
        uint256 playerId;
        string full_name;
    }

    event Log(
        address owner,
        uint256 playerId,
        string full_name,
        string tokenURI
    );

    mapping (uint256 => Player) players;

    constructor() BaseERC721("SoccerPlayers", "SP")
    {}

    function createPlayer(uint256 playerId, string memory _fullName, string memory _tokenURI) public{
        players[playerId] = Player({ playerId: playerId, full_name: _fullName});
        super.createToken(msg.sender, playerId, _tokenURI);
        emit Log(msg.sender, playerId, _fullName, _tokenURI);
    }

    function getPlayerDetails(uint256 playerId) external view returns (string memory, string memory) {
        return (players[playerId].full_name, super.tokenURI(playerId));
    }




}
