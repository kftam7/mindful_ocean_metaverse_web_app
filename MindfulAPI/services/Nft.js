const db = require('../db');
const helper = require('../helper');
const path = require('path');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { Alchemy, Network } = require('alchemy-sdk');

/* get NFT */
async function getNFT(type, idtype, id){

  logger.log('info', '%s %s %s %s %s', 'Nft', 'getNFT', type, idtype, id);

  // create Alchemy object
  const settings = {
    apiKey: process.env.alchemyApiKey,
    network: Network.MATIC_MUMBAI // Replace with your network.
  };
  const alchemy = new Alchemy(settings);
  let data = [];
  let query_string = "";
  let counter = 0;
  let NFTWalletAddress = [];
  let NFTTokenId = [];
  let NFTTokenUriRaw = [];

  // NFT contract address
  contractAddress = "";
  if (type == "mintPass"){
    contractAddress = process.env.mintPassContractAddress;
  }else if (type == "mindfulToken"){
    contractAddress = process.env.mindfulTokenContractAddress;
  }else{
    contractAddress = process.env.mintPassContractAddress;
  }

  if(idtype == "appleid"){
    
    // find out how many walletaddress this appleId has
    var sql = 'SELECT walletAddress AS walletAddress FROM walletAddress WHERE appleId = "' + id + '";';
    const result = await db.query(
        sql
    );

    logger.log('debug', '%s %s sql: %s', 'Nft', 'getNFT', sql);

    // If walletaddress found for this appleId
    if (result.length){
      
      for (const address of result) {
        
        for await (const nft of alchemy.nft.getNftsForOwnerIterator(address.walletAddress, {
          // Omit the NFT metadata for smaller payloads.
          omitMetadata: false,
          contractAddresses: [contractAddress]
        })) {

          query_string = query_string + nft.tokenId + ", ";
          NFTWalletAddress[counter] = address.walletAddress;
          NFTTokenId[counter] = nft.tokenId;
          NFTTokenUriRaw[counter] = nft.tokenUri.raw;
          counter++;

        }        
      }

    // If no walletaddress found for this appleId
    }else{
      logger.log('info', '%s %s No walletAddress found for this appleID: %s', 'Nft', 'getNFT', id);
      return ("No walletAddress found for this appleID");
    }

  }else if(idtype == "walletaddress"){
    for await (const nft of alchemy.nft.getNftsForOwnerIterator(id, {
      // Omit the NFT metadata for smaller payloads.
      omitMetadata: false,
      contractAddresses: [contractAddress]
    })) {

      query_string = query_string + nft.tokenId + ", "; 
      NFTWalletAddress[counter] = id;
      NFTTokenId[counter] = nft.tokenId;
      NFTTokenUriRaw[counter] = nft.tokenUri.raw;
      counter++;
      
    }
  }

  if (query_string){
    query_string = query_string.replace(/, $/, "");
    var sql = 'SELECT artworkId, eventId, URL, type, artistMessage FROM artwork WHERE artworkId IN (' + query_string + ');';
    logger.log('debug', '%s %s sql: %s', 'Nft', 'getNFT', sql);
    const result = await db.query(
      sql
    );
    if (type == "mintPass"){
        for (let i = 0; i < counter; i++){
          data.push({walletAddress: `${NFTWalletAddress[i]}`, tokenId: `${NFTTokenId[i]}`, tokenUriRaw: `${NFTTokenUriRaw[i]}`, name: `${process.env.mintPassName}`, description: `${process.env.mintPassDescription}`, eventId: `${result[i].eventId}`, type: `${result[i].type}`, artistMessage: `${result[i].artistMessage}`, artworkId: `${result[i].artworkId}`, artworkURL: `${result[i].URL}`, imageURL: `${result[i].URL}`});
        }
    }else if (type == "mindfulToken"){
        for (let i = 0; i < counter; i++){
          data.push({walletAddress: `${NFTWalletAddress[i]}`, tokenId: `${NFTTokenId[i]}`, tokenUriRaw: `${NFTTokenUriRaw[i]}`, name: `${process.env.mindfulTokenName}`, description: `${process.env.mindfulTokenDescription}`, eventId: `${result[i].eventId}`, type: `${result[i].type}`, artistMessage: `${result[i].artistMessage}`, artworkId: `${result[i].artworkId}`, artworkURL: `${result[i].URL}`, imageURL: `${result[i].URL}`});
        }
    }
  }
  return{
    data
  }
}

/* get NFT Total */
async function getNFTTotal(type){

  logger.log('info', '%s %s %s', 'Nft', 'getNFTTotal', type);

  // Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
  const settings = {
    apiKey: process.env.alchemyApiKey,
    network: Network.MATIC_MUMBAI // Replace with your network.
  };

  // NFT contract address.
  contractAddress = "";
  if (type == "mintPass"){
    contractAddress = process.env.mintPassContractAddress;
  }else if (type == "mindfulToken"){
    contractAddress = process.env.mindfulTokenContractAddress;
  }else{
    contractAddress = process.env.mintPassContractAddress;
  }

  const alchemy = new Alchemy(settings);

  const { nfts } = await alchemy.nft.getNftsForContract(contractAddress, {
    omitMetadata: true,
  });

  const total = Object.keys(nfts).length;

  logger.log('debug', '%s %s %s total: %s', 'Nft', 'getNFTTotal', type, total);

  return {
    total
  }
}

module.exports = {
  getNFT,
  getNFTTotal
};
