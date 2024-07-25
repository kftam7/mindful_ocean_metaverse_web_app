//import axios from 'axios';

const axios = require("axios");
const md5 = require("blueimp-md5");
const contract = require("./MindfulNFT.json");
//const ethers = require("ethers");

const API_KEY = "3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ";
//const SYSTEM_PRIVATE_KEY = "78501fb8da333ed1c8312a2a4138bde909e280519157d5cac7e627222f2886b9";
const SYSTEM_PRIVATE_KEY = "51476301944acfc0470650171472e4824dbe89d10a460bb7224eb53837d0560a";
//const MINDFUL_CONTRACT_ADDRESS = "0x77afdd8d3ef4b18d76d6462910e3b60cfa7c7351";
const MINDFUL_CONTRACT_ADDRESS = "0x4d41e08738b2c73cd70ad55917ebc185fcec52ba";
//const toAddress = "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab";
//const toAddress = "0x8ABA142802375b551bde90f05Df7710B50823C56";
const toAddress = "0x6D3b5F1191Da580f88D40B911D471991199836FE"; //hacker
const tokenId = 173;
//const apiPort = "http://127.0.0.1:3001";
const apiPort = "https://api.mindful-ocean.org";
let metaData;

// provider - Alchemy
//const netObj = {
//    name: 'matic-amoy',
//    chainId: 80002 // hardwired bullshit
//}
const netObj = {
    name: 'matic',
    chainId: 137 // hardwired bullshit
}

const alchemyProvider = new ethers.AlchemyProvider(netObj, API_KEY);

// signer
const signer = new ethers.Wallet(SYSTEM_PRIVATE_KEY, alchemyProvider);

// contract instance
const MindfulNFTContract = new ethers.Contract(MINDFUL_CONTRACT_ADDRESS, contract.abi, signer);

async function main() {

    // construct the message
    const ethAddress = await signer.getAddress();
    //console.log("ethAddress: ", ethAddress);
    const timestamp = Date.now();
    //console.log("timestamp: ", timestamp);
    let message = ethAddress + timestamp;
    //console.log("Message: ", message);

    // Compute hash of the message
    let messageHash = ethers.id(message);
    //console.log("Message Hash: ", messageHash);

    // Sign the hashed message
    let messageBytes = ethers.getBytes(messageHash);
    let signature = await signer.signMessage(messageBytes);
    //console.log("Signature: ", signature);

    // get the meta data URL
    console.log("tokenId: ", tokenId);
    //console.log("url: ", url);

    const getHeaders = () => {
      const appleid = "001972.c7c33c51e40d4c239a38cc22e4c1244f.0850";
      const refresh_token = "r7e3e40fd084842799476f00e67e93bd7.0.rrzxs.FTpP7E4ckULBt1mDgK72lw";
      const time_stamp = Math.floor(Date.now() / 1000);
      const secret = md5(appleid + time_stamp);
      return {
        appleid,
        refresh_token,
        time_stamp,
        secret
      }
    };
    //console.log("header: ", getHeaders());

    const getMetaData = 
      await axios.post(`${apiPort}/mindfulapi/app/nftstorage/mindfultoken/${tokenId}`, {}, { headers: getHeaders() })
        .then(res => {
          const { status, data } = res;
          metaData = data;
          if (status === 200) {
            //console.log("metadta: ", data);
            }else{
                console.log("Can't get Metadata. Stataus error: %s", status);
                throw new Error("Can't get Metadata");
            }
        })
        .catch(err => {
          console.log("Can't get Metadata. Error: %s", err);
          throw new Error("Can't get Metadata");
        })

    // get name of the smart contract
    const name = await MindfulNFTContract.name(); 
    console.log("The name is: " + name); 
    console.log("Minting MindfulNFT...");
    console.log("metadata: ", metaData);
    // mint the NFT
    const tx = await MindfulNFTContract.mintMindfulNFT(messageHash, signature, tokenId, metaData, toAddress);
    console.log("tx: ", tx);
 
    // // update the ID if successful
    if (tx){
 
        const updateMintResult = 
          await axios.put(`${apiPort}/mindfulapi/app/setredeemedartwork/${tokenId}`, {}, { headers: getHeaders() })
            .then(res => {
              const { status, data } = res;
              if (status === 200) {
                    console.log("Result: ", data);
                }else{
                    console.log("Can't update result: %s", status);
                    throw new Error("Can't update result");
                }
            })
            .catch(err => {
              console.log("Can't update result. Error: %s", err);
              throw new Error("Can't update result");
            })
    }

}

main();
