const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token contract", function () {
  it("Should allow buying Food tokens", async function() {
    const [owner, addr1] = await ethers.getSigners();

    const Food = await ethers.getContractFactory("Food");
    const Market = await ethers.getContractFactory("Market");

    const foodHardhat = await Food.deploy();
    const marketHardhat = await Market.deploy(foodHardhat.address);

    foodHardhat.setMinter(marketHardhat.address);
    // Transfer 50 tokens from owner to addr1
    await marketHardhat.buy(addr1.address, { value: ethers.utils.parseEther("1") });
    var addr1Balance = await marketHardhat.getBalance(addr1.address);
    expect(addr1Balance.toString()).to.equal("100");
  });
});