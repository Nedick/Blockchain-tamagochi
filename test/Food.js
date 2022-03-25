const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token contract", function () {
//   it("Deployment should assign the total supply of tokens to the owner", async function () {
//     const [owner] = await ethers.getSigners();

//     const Food = await ethers.getContractFactory("Food");

//     const hardhatToken = await Food.deploy();

//     const ownerBalance = await hardhatToken.balanceOf(Food.minter);
//     const tokenSupply = await hardhatToken.totalSupply();

//     expect(tokenSupply.toString()).to.equal(ownerBalance.toString());
//   });

  it("Should transfer tokens between accounts", async function() {
    const [owner, addr1] = await ethers.getSigners();

    const Food = await ethers.getContractFactory("Food");

    const foodHardhat = await Food.deploy();
    foodHardhat.setMinter(owner.address);
    // Transfer 50 tokens from owner to addr1
    await foodHardhat.mint(addr1.address, 50);
    var addr1Balance = await foodHardhat.getBalance(addr1.address);
    expect(addr1Balance.toString()).to.equal("50");
  });
});