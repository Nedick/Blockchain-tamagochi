// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

import "./Food.sol";

contract Pet is ERC721 {
    Food foodContract;

    address petCreator;

    mapping (address => uint256[]) ownedPets;
    mapping (address => uint256) totalOwnedPets;

    struct TamagocchiPet {
        uint256 petId;
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

        pets[petTokenId] = TamagocchiPet(petTokenId, block.timestamp);
        ownedPets[_petOwner].push(petTokenId);
        totalOwnedPets[_petOwner] += 1;
    }

    function feed(uint256 petTokenId) public {
        require(msg.sender == ownerOf(petTokenId), "only pet owner can feed pets");
        require(block.timestamp - pets[petTokenId].lastFeedTime < 4*60*60, "Your pet is dead");
        require(foodContract.balanceOf(msg.sender) > 0, "You do not have food tokens");

        foodContract.burn(msg.sender, 1);
        pets[petTokenId].lastFeedTime = block.timestamp;
    }

    function myPets() public view returns (TamagocchiPet[] memory) {
        TamagocchiPet[] memory ret = new TamagocchiPet[](totalOwnedPets[msg.sender]);

        for (uint i = 0; i < totalOwnedPets[msg.sender]; i++) {
            ret[i] = pets[ownedPets[msg.sender][i]];
        }

        return ret;
    }

    function petOwner(uint256 petTokenId) public view returns (address) {
        return ownerOf(petTokenId);
    }

    function petLastFeedAt(uint256 petTokenId) public view returns (uint256) {
        return pets[petTokenId].lastFeedTime;
    }
}