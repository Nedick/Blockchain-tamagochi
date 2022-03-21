// contracts/Food.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Food is ERC20 {
    string private _name = "Food";
    string private _symbol = "FT";
    
    uint256 private _totalSupply = 1978651800 * 10 ** 18;

    constructor() ERC20(_name, _symbol) {
        _mint(msg.sender, _totalSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 16;
    }
}