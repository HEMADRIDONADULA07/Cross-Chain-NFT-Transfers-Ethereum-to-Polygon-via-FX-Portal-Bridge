// Import required libraries
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Get private key from env
  const privateKey = process.env.hemadripk;

  // The URL of the network provider
  const networkAddress = "https://ethereum-goerli.publicnode.com";

  // Create a provider using the URL
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a signer from the private key and provider
  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0x62ad50eaAd111a7690ff1E680e595eAe4a8A3B81";

  // Get the contract factory and attach it to the signer
  const hemadri = await ethers.getContractFactory("hemadri", signer);
  const contract = await hemadri.attach(contractAddress);

  // Call the mint function on the contract to mint 5 tokens
  await contract.mint(5);

  //after successfully minting
  console.log("5 tokens has been minted sucessfully");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });