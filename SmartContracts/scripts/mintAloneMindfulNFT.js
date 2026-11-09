//import { ethers } from "hardhat";

const API_KEY = "3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ";
const SYSTEM_PRIVATE_KEY = "35322f3d9f56cf2f84592411ffacb71cf8d39ef3c7918a0358d4aebfec562989";
const MINDFUL_CONTRACT_ADDRESS = "0x606B2b67aCc6f3b0c3Ac0EaC7AC46B7b3eb85F6F";
const toAddress = "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab";
const tokenId = 2;
const url = "ipfs://bafyreie3vlwy7pqagjpyqxbtzgiyky5twkqptkaqmys4fuy4rqt742uow4/metadata.json"; 

const contract = require("../artifacts/contracts/MindfulNFT.sol/MindfulNFT.json");

// provider - Alchemy
//const netObj = {
//    name: 'matic-amoy',
//    chainId: 80002 // hardwired bullshit
//}
//const alchemyProvider = new ethers.providers.AlchemyProvider(netObj, API_KEY);
const alchemyProvider = new ethers.providers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/78501fb8da333ed1c8312a2a4138bde909e280519157d5cac7e627222f2886b9");

// signer
const signer = new ethers.Wallet(SYSTEM_PRIVATE_KEY, alchemyProvider);

// contract instance
const MindfulNFTContract = new ethers.Contract(MINDFUL_CONTRACT_ADDRESS, contract.abi, signer);

async function main() {

    const ethAddress = await signer.getAddress();
    console.log("ethAddress: ", ethAddress);
    const timestamp = Date.now();
    console.log("timestamp: ", timestamp);
    let message = ethAddress + timestamp;
    console.log("Message: ", message);
    
    // Compute hash of the message
    let messageHash = ethers.utils.id(message);
    console.log("Message Hash: ", messageHash);
    
    // Sign the hashed message
    let messageBytes = ethers.utils.arrayify(messageHash);
    let signature = await signer.signMessage(messageBytes);
    console.log("Signature: ", signature);
    console.log("tokenId: ", tokenId);
    console.log("url: ", url);
    const name = await MindfulNFTContract.name();    
    console.log("The name is: " + name); 
    console.log("Minting MindfulNFT...");

    //const tx = await MindfulNFTContract.mintMindfulNFT(messageHash, signature, tokenId, url, toAddress);
	//console.log("tx: ", tx);
}

main();