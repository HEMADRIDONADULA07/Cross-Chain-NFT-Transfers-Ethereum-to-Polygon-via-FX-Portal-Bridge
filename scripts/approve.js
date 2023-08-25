const hre = require("hardhat");
const fxRootContractABI = require("../fxroot.json");
const nftContractJSON = require("../artifacts/contracts/hemadri.sol/hemadri.json");

const nftAddress = "0x62ad50eaAd111a7690ff1E680e595eAe4a8A3B81"; // Place your ERC721 contract address here
const nftABI = nftContractJSON.abi;
const fxERC721RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0x1c0d200755F1599c44Af0ed649dd9E8e4E87d24e"; // Place your public address for your wallet here

const tokenIds = [1, 2, 3, 4, 5]; // An array of token IDs to deposit

async function main() {
  const nftContract = await hre.ethers.getContractAt(nftABI, nftAddress);
  const fxContract = await hre.ethers.getContractAt(
    fxRootContractABI,
    fxERC721RootAddress
  );

  for (const tokenId of tokenIds) {
    console.log(`Approving token with ID ${tokenId} for transfer`);
    const approveTx = await nftContract.approve(fxERC721RootAddress, tokenId);
    await approveTx.wait();
    console.log(`Approval for token ${tokenId} confirmed`);

    console.log(`Depositing token with ID ${tokenId} on the FxPortal Bridge`);
    const depositTx = await fxContract.deposit(nftAddress, walletAddress, tokenId, "0x"); // Replace "0x" with any custom data if required
    await depositTx.wait();
    console.log(`Token ${tokenId} successfully deposited`);
  }

  console.log("All tokens deposit successful");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
