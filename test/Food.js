const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Food = await ethers.getContractFactory("Food");

    const hardhatToken = await Food.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    const tokenSupply = await hardhatToken.totalSupply();

    expect(tokenSupply.toString()).to.equal(ownerBalance.toString());
  });

  it("Should transfer tokens between accounts", async function() {
    const [_, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Food");

    const hardhatToken = await Token.deploy();

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    var addr1Balance = await hardhatToken.balanceOf(addr1.address)
    expect(addr1Balance.toString()).to.equal("50");

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    const addr2Balance = await hardhatToken.balanceOf(addr2.address)
    expect(addr2Balance.toString()).to.equal("50");

    var addr1Balance = await hardhatToken.balanceOf(addr1.address)
    expect(addr1Balance.toString()).to.equal("0");
  });
});