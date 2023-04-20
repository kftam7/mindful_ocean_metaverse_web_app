const path = require('path');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { Alchemy, Network } = require('alchemy-sdk');

/* get NFT */
async function getNFT(type, address){

  // Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
  const settings = {
    apiKey: '3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ', // Replace with your Alchemy API key.
    network: Network.MATIC_MUMBAI // Replace with your network.
  };

  // NFT contract address.
  contractAddress = "";
  if (type == "mintPass"){
    //console.log("choice: 1");
    contractAddress = process.env.mintPassContractAddress;
  }else if (type == "mindfulToken"){
    //console.log("choice: 2");
    contractAddress = process.env.mindfulTokenContractAddress;
  }else{
    //console.log("choice: 3");
    contractAddress = process.env.mintPassContractAddress;
  }

  const alchemy = new Alchemy(settings);
  let data = [];
  let dataMintPass = [{"tokenId": "12345678", "description": "This is MintPass 1", "peronsalInfo": "Personal Information 1", "artistAppleId": "AppleID1", "eventId": "1", "URL": "https://123.abc.com"}, {"tokenId": "99998888", "description": "This is MintPass 2", "peronsalInfo": "Personal Information 2", "artistAppleId": "AppleID2", "eventId": "2", "URL": "https://456.abc.com"}, {"tokenId": "11112222", "description": "This is MintPass 3", "peronsalInfo": "Personal Information 3", "artistAppleId": "AppleID3", "eventId": "3", "URL": "https://789.abc.com"}];
  let dataMindfulToken = [{"tokenId": "20230420", "description": "This is MindfulToken 1", "peronsalInfo": "Personal Information 4", "artistAppleId": "AppleID4", "eventId": "4", "URL": "https://777.xyz.com"}, {"tokenId": "20230421", "description": "This is MindfulToken 2", "peronsalInfo": "Personal Information 5", "artistAppleId": "AppleID5", "eventId": "5", "URL": "https://888.xyz.com"}, {"tokenId": "20230422", "description": "This is MindfulToken 3", "peronsalInfo": "Personal Information 6", "artistAppleId": "AppleID6", "eventId": "6", "URL": "https://999.xyz.com"}];

/*
  for await (const nft of alchemy.nft.getNftsForOwnerIterator(address, {
    // Omit the NFT metadata for smaller payloads.
    omitMetadata: false
  })) {
    if(`${nft.contract.address}` == contractAddress.toLowerCase()){

      data.push({tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`});
    }
  }

*/

  if(type == "mintPass"){
    data = dataMintPass;
  }else{
    data = dataMindfulToken;
  }

  //const data = helper.emptyOrRows(rows);
  //const meta = "1";

  return {
    data
  }
}


/* get NFT Total */
async function getNFTTotal(type){

  // Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
  const settings = {
    apiKey: '3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ', // Replace with your Alchemy API key.
    network: Network.MATIC_MUMBAI // Replace with your network.
  };

  // NFT contract address.
  contractAddress = "";
  if (type == "mintPass"){
    //console.log("choice: 1");
    contractAddress = process.env.mintPassContractAddress;
  }else if (type == "mindfulToken"){
    //console.log("choice: 2");
    contractAddress = process.env.mindfulTokenContractAddress;
  }else{
    //console.log("choice: 3");
    contractAddress = process.env.mintPassContractAddress;
  }

  const alchemy = new Alchemy(settings);

  const { nfts } = await alchemy.nft.getNftsForContract(contractAddress, {
    omitMetadata: true,
  });

  //console.log(Object.keys(nfts).length);

  //const data = helper.emptyOrRows(rows);
  const total = Object.keys(nfts).length;

  return {
    //data,
    total
  }
}

module.exports = {
  getNFT,
  getNFTTotal
};
