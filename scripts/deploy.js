const { ethers } = require("hardhat");

async function main() {
    const [defaultSigner] = await ethers.getSigners();
    const owner = new ethers.Wallet(process.env.PRIVATE_KEY, defaultSigner.provider);
  
    console.log("Deploying contracts with the account:", owner.address);
    console.log("Account balance:", (await owner.getBalance()).toString());
  
    const Food = await ethers.getContractFactory("Food");
    const Market = await ethers.getContractFactory("Market");
    const Pet = await ethers.getContractFactory("Pet");

    const foodHardhat = await Food.deploy();
    const marketHardhat = await Market.deploy(foodHardhat.address);
    const petHardhat = await Pet.deploy(foodHardhat.address, owner.address);

    await foodHardhat.setMinter(marketHardhat.address);
    await foodHardhat.setBurner(petHardhat.address);

    console.log("Food Contract address:", foodHardhat.address);
    console.log("Market Contract address:", marketHardhat.address);
    console.log("Pet Contract address:", petHardhat.address);

    saveFrontendFiles(foodHardhat, marketHardhat, petHardhat);
  }


function saveFrontendFiles(food, market, pet) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-addresses.json",
    JSON.stringify({ FoodAddress: food.address, MarketAddress: market.address, PetAddress: pet.address }, undefined, 2)
  );

  const FoodArtifacts = artifacts.readArtifactSync("Food");

  fs.writeFileSync(
    contractsDir + "/Food.json",
    JSON.stringify(FoodArtifacts, null, 2)
  );

  const MarketArtifacts = artifacts.readArtifactSync("Market");

  fs.writeFileSync(
    contractsDir + "/Market.json",
    JSON.stringify(MarketArtifacts, null, 2)
  );

  const PetArtifacts = artifacts.readArtifactSync("Pet");

  fs.writeFileSync(
    contractsDir + "/Pet.json",
    JSON.stringify(PetArtifacts, null, 2)
  );
}
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });