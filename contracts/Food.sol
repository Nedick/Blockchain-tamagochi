// contracts/Food.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Food is ERC20 {
    string private _name = "Food";
    string private _symbol = "FT";

    uint _totalSupply = 0;

    address public minter;
    address public burner;

    mapping (address => uint) public balances;

    constructor() ERC20(_name, _symbol) {
    }

    function setMinter(address _minter) public {
        minter = _minter;
    }

    function setBurner(address _burner) public {
        burner = _burner;
    }

    function decimals() public view virtual override returns (uint8) {
        return 16;
    }

    function mint(address receiver, uint amount) public {
        require(msg.sender == minter, "only minter can mint");

        _totalSupply += amount;
        balances[receiver] += amount;
    }

    function burn(address receiver, uint amount) public {
        require(msg.sender == burner, "only burner can burn");

        _totalSupply -= amount;
        balances[receiver] -= amount;
    }

    function balanceOf(address addr) public override view returns (uint256) {
        return 100;
    }
}