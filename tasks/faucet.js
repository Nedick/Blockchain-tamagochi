const fs = require("fs");

// This file is only here to make interacting with the Dapp easier,
// feel free to ignore it if you don't need it.

task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async ({ receiver }, { ethers }) => {
    if (network.name === "hardhat") {
      console.warn(
        "You are running the faucet task with Hardhat network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }

    const addressesFile =
      __dirname + "/../frontend/src/contracts/contract-addresses.json";

    if (!fs.existsSync(addressesFile)) {
      console.error("You need to deploy your contract first.");
      return;
    }

    const addressJson = fs.readFileSync(addressesFile);
    const addresses = JSON.parse(addressJson);

    const [sender] = await ethers.getSigners();

    const tx2 = await sender.sendTransaction({
      to: receiver,
      value: ethers.constants.WeiPerEther,
    });
    await tx2.wait();

    const market = await ethers.getContractAt("Market", addresses.MarketAddress);
    await market.buy(receiver, { value: 1 });

    console.log(`Transferred 1 ETH and 100 tokens to ${receiver}`);
  });
