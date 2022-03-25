// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Food.sol";

contract Market {
    address public foodContractAddress;

    uint256 public _weiToFoodDivider = 10000000000000000;

    constructor (address _foodContractAddress) {
        foodContractAddress = _foodContractAddress;
    }

    function buy(address buyAddress) payable public {
        uint256 amountToBuy = msg.value;
        require(amountToBuy > 0, "You need to send some ether");
        
        Food food = Food(foodContractAddress);
        food.mint(buyAddress, amountToBuy / _weiToFoodDivider);
    }

    function getBalance(address addr) public view returns (uint) {
        Food food = Food(foodContractAddress);

        return food.balanceOf(addr);
    }
}