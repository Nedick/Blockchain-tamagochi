⚠️ This project utilizes [Hardhat](https://hardhat.org/tutorial/creating-a-new-hardhat-project.html) development environment!

⚠️ This project uses [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) contracts library! 

# Project setup:
### 1. After checkout navigate to the project root and run the local blockchain node with this command:
`npx hardhat node`

### 2. Compile and deploy changes with:
`npm run compile && npm run deploy`
###### Compile and deploy are custom scripts that compile recent changes to the smart contracts and deploy these changes to a local network. You can check or edit the scripts in root/package.json file

### 3. In order to start the front-end react application you need to navigate to root/frontend folder and use the following command:
`npm run start`
###### Now you can access the front-end app on localhost:3000 and connect your Metamask 

### 4. For debug purposes you can start a hardhat console with:
`npm run console`

### 5. In order to interact with the smart contracts you will need ethereum on testnet. Use the following command to add ethers to your account:
`npx hardhat --network localhost faucet <YOUR PUBLIC KEY GOES HERE>`

# TODO:
- [ ] Complete Pet contract interaction (create and feed the pet)
- [ ] Update the front-end app completely (clean interaction bugs and remove unnecessary files from the boilerplate project)
- [ ] Extend the existing test suite
- [ ] Create github actions CI/CD (build, test and create build)
