const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Pet contract", function () {
  it("Should allow petCreator to mind NFT", async function() {
    const [owner, addr1] = await ethers.getSigners();

    const Food = await ethers.getContractFactory("Food");
    const Market = await ethers.getContractFactory("Market");
    const Pet = await ethers.getContractFactory("Pet");

    const foodHardhat = await Food.deploy();
    const marketHardhat = await Market.deploy(foodHardhat.address);
    
    const petHardhat = await Pet.deploy(foodHardhat.address, owner.address);

    await petHardhat.createPet(addr1.address, 1);

    expect(await petHardhat.ownerOf(1)).to.eq(addr1.address);
  });

  it("Allows feeding the pet", async function() {
    const [owner, addr1] = await ethers.getSigners();

    const Food = await ethers.getContractFactory("Food");
    const Market = await ethers.getContractFactory("Market");
    const Pet = await ethers.getContractFactory("Pet");

    const foodHardhat = await Food.deploy();
    const marketHardhat = await Market.deploy(foodHardhat.address);
    const petHardhat = await Pet.deploy(foodHardhat.address, owner.address);

    await foodHardhat.setMinter(marketHardhat.address);
    await foodHardhat.setBurner(petHardhat.address);

    await marketHardhat.buy(addr1.address, { value: ethers.utils.parseEther("1") });
    await petHardhat.createPet(addr1.address, 1);

    const lastFeedTimeBeforeFeed = await petHardhat.petLastFeedAt(1);

    await network.provider.send("evm_increaseTime", [3600]);
    await petHardhat.feed(1, addr1.address);

    const lastFeedTimeAfterFeed = await petHardhat.petLastFeedAt(1);

    expect((await foodHardhat.getBalance(addr1.address)).toString()).to.equal("99");
    expect((Number(lastFeedTimeBeforeFeed) + 3600).toString()).to.equal(lastFeedTimeAfterFeed.toString());
  })
});