const db = require('../db');
const helper = require('../helper');
const path = require('path');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { Alchemy, Network } = require('alchemy-sdk');
const axios = require('axios');

/* get NFT */
async function getNFT(type, idtype, id){

  logger.log('info', '%s %s %s %s %s', 'Nft', 'getNFT', type, idtype, id);

  // create Alchemy object
  const settings = {
    //apiKey: '3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ', // Replace with your Alchemy API key.
    apiKey: process.env.alchemyApiKey,
    network: Network.MATIC_MUMBAI // Replace with your network.
  };
  const alchemy = new Alchemy(settings);
  let data = [];

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
          //if(`${nft.contract.address}` == contractAddress.toLowerCase()){

            //console.log("contract address: %s", nft.contract.address);

            if (nft.tokenUri.raw.startsWith("ipfs://")){

              // get the NFT info from the URI
              const nftURL = nft.tokenUri.raw.replace("ipfs://", "https://ipfs.io/ipfs/");
  
              const options = {
                'proxy': {
                  'protocol': 'http',
                  'host': '127.0.0.1',
                  'port': 7890
                },
                'method': 'GET',
                'url': nftURL,
                'headers': {
                  'Content-Type': 'application/json',
                  'Accept-Encoding': 'gzip, deflate, br',
                  'Connection': 'keep-alive'
                }
              };
  
              try {
                const result = await axios(options);
                if (type == "mintPass"){
                  data.push({walletAddress: `${address.walletAddress}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, description: `${result.data.description}`, eventId: `${result.data.eventId}`, type: `${result.data.type}`, artistMessage: `${result.data.artistMessage}`, artworkId: `${result.data.artworkId}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
                }else if (type == "mindfulToken") {
                  data.push({walletAddress: `${address.walletAddress}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, description: `${result.data.description}`, eventId: `${result.data.eventId}`, type: `${result.data.type}`, artistMessage: `${result.data.artistMessage}`, authenticScarcity: `${result.data.authenticScarcity}`, scarcityRank: `${result.data.scarcityRank}`, clusterId: `${result.data.clusterId}`, clusterSize: `${result.data.clusterSize}`, superClusterId: `${result.data.superClusterId}`, superClusterSize: `${result.data.superClusterSize}`, artworkId: `${result.data.artworkId}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
                }
                
              }catch (e) {
                logger.log('error', '%s %s %s Issue with NFT URI: %s', 'Nft', 'getNFT', id, nftURL);
                return "Issue with NFT URI";
              }
            }

          //}
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
      //if(`${nft.contract.address}` == contractAddress.toLowerCase()){
  
        //console.log("contract address: %s", nft.contract.address);

        if (nft.tokenUri.raw.startsWith("ipfs://")){
          // get the NFT info from the URI
          const nftURL = nft.tokenUri.raw.replace("ipfs://", "https://ipfs.io/ipfs/");
  
          const options = {
            'proxy': {
              'protocol': 'http',
              'host': '127.0.0.1',
              'port': 7890
            },
            'method': 'GET',
            'url': nftURL,
            'headers': {
              'Content-Type': 'application/json',
              'Accept-Encoding': 'gzip, deflate, br',
              'Connection': 'keep-alive'
            }
          };
  
          try {
            const result = await axios(options);
            if (type == "mintPass"){
              data.push({walletAddress: `${id}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, description: `${result.data.description}`, eventId: `${result.data.eventId}`, type: `${result.data.type}`, artistMessage: `${result.data.artistMessage}`, artworkId: `${result.data.artworkId}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
            }else if (type == "mindfulToken") {
              data.push({walletAddress: `${id}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, description: `${result.data.description}`, eventId: `${result.data.eventId}`, type: `${result.data.type}`, artistMessage: `${result.data.artistMessage}`, authenticScarcity: `${result.data.authenticScarcity}`, scarcityRank: `${result.data.scarcityRank}`, clusterId: `${result.data.clusterId}`, clusterSize: `${result.data.clusterSize}`, superClusterId: `${result.data.superClusterId}`, superClusterSize: `${result.data.superClusterSize}`, artworkId: `${result.data.artworkId}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
            }
          }catch (e) {
            logger.log('error', '%s %s %s Issue with NFT URI: %s', 'Nft', 'getNFT', id, nftURL);
            return "Issue with NFT URI";
          }
        }
      //}
    }
  }

  //logger.log('debug', '%s %s %s Data: %s', 'Nft', 'getNFT', id, data);

  return {
    data
  }
}


/* get NFT Total */
async function getNFTTotal(type){

  logger.log('info', '%s %s %s', 'Nft', 'getNFTTotal', type);

  // Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
  const settings = {
    //apiKey: '3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ', // Replace with your Alchemy API key.
    apiKey: process.env.alchemyApiKey,
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
