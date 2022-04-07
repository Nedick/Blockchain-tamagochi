// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./Food.sol";

contract Pet is ERC721 {
    Food foodContract;

    address petCreator;

    struct TamagocchiPet {
        uint256 lastFeedTime;
    }

    mapping (uint256 => TamagocchiPet) public pets;

    constructor(Food _foodContract, address _petCreator) ERC721("PetNFT", "PNFT") {
        foodContract = _foodContract;
        petCreator = _petCreator;
    }

    function createPet(address _petOwner, uint256 petTokenId) public {
        require(msg.sender == petCreator, "only pet creator can create pets");
        _safeMint(_petOwner, petTokenId);

        pets[petTokenId] = TamagocchiPet(block.timestamp);
    }

    function feed(uint256 petTokenId) public {
        // require(msg.sender == petCreator, "only pet creator can feed pets");
        // require(pets[petTokenId].lastFeedTime + 86400 < block.timestamp, "pet is not hungry");
        require(msg.sender != ownerOf(petTokenId), "You are not owning this pet");
        require(block.timestamp - pets[petTokenId].lastFeedTime < 4*60*60, "Your pet is dead");
        require(foodContract.balanceOf(msg.sender) > 0, "You do not have food tokens");

        foodContract.burn(msg.sender, 1);
        pets[petTokenId].lastFeedTime = block.timestamp;
    }

    function petOwner(uint256 petTokenId) public view returns (address) {
        return ownerOf(petTokenId);
    }

    function petLastFeedAt(uint256 petTokenId) public view returns (uint256) {
        return pets[petTokenId].lastFeedTime;
    }
}