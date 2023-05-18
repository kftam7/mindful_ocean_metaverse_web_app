//import { ethers } from "hardhat";

const API_KEY = "3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ";
const PRIVATE_KEY = "35322f3d9f56cf2f84592411ffacb71cf8d39ef3c7918a0358d4aebfec562989";
//const PRIVATE_KEY = "35322f3d9f56cf2f84592411ffacb71cf8d39ef3c7918a0358d4aebfec562989";
const CONTRACT_ADDRESS = "0x3Cd660AB23B44Ae7E99DC5e7d9a7dC38a341c30a";

const contract = require("../artifacts/contracts/MintPass.sol/MintPassNFT.json");

// provider - Alchemy
const netObj = {
    name: 'maticmum',
    chainId: 80001  // hardwired bullshit
}
const alchemyProvider = new ethers.providers.AlchemyProvider(netObj, API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const MintPassNFTContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {

/*
	// construct the message to sign
	let message = "Hello World " + Date.now();
	console.log("Message: ", message);
	
	// Compute hash of the message
	let messageHash = ethers.utils.id(message);
	console.log("Message Hash: ", messageHash);
	
	// Sign the hashed message
	let messageBytes = ethers.utils.arrayify(messageHash);
	let signature = await signer.signMessage(messageBytes);
	console.log("Signature: ", signature);
*/
	
	// read the contract name
    const name = await MintPassNFTContract.name();    
    console.log("The contract name is: " + name); 

	// mint the mintPass
    console.log("Burning MintPass...");
    const tx = await MintPassNFTContract.burn(0);
    await tx.wait();

}

main();