const db = require('../db');
const helper = require('../helper');
const path = require('path');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { Alchemy, Network } = require('alchemy-sdk');
const axios = require('axios');
const sleep = require('sleep-promise');

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
  let axiosResult;

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

            if (nft.tokenUri.raw.startsWith("ipfs://")){

              // get the NFT info from the URI
              const nftURL = nft.tokenUri.raw.replace("ipfs://", "https://ipfs.io/ipfs/");

              const optionsNoProxy = {
                'method': 'GET',
                'url': nftURL,
                'headers': {
                  'Content-Type': 'application/json',
                  'Accept-Encoding': 'gzip, deflate, br',
                  'Connection': 'keep-alive'
                }
              };
              
              const optionsProxy = {
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
                
                if (process.env.alchemyIfProxy == "false"){
                  axiosResult = await axios(optionsNoProxy);
                }else{
                  axiosResult = await axios(optionsProxy);
                }

                // get artwork URL
                var sqlArtworkURLAppleId = 'SELECT URL FROM artwork WHERE artworkId = "' + axiosResult.data.artworkId + '";';
                const resultArtworkURLAppleId = await db.query(
                    sqlArtworkURLAppleId
                );
            
                logger.log('debug', '%s %s sql: %s', 'Nft', 'getNFT', sqlArtworkURLAppleId);

                if (type == "mintPass"){
                  data.push({walletAddress: `${address.walletAddress}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${axiosResult.data.name}`, description: `${axiosResult.data.description}`, eventId: `${axiosResult.data.eventId}`, type: `${axiosResult.data.type}`, artistMessage: `${axiosResult.data.artistMessage}`, artworkId: `${axiosResult.data.artworkId}`, artworkURL: `${resultArtworkURLAppleId[0].URL}`, imageURL: `${axiosResult.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
                }else if (type == "mindfulToken") {
                  data.push({walletAddress: `${address.walletAddress}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${axiosResult.data.name}`, description: `${axiosResult.data.description}`, eventId: `${axiosResult.data.eventId}`, type: `${axiosResult.data.type}`, artistMessage: `${axiosResult.data.artistMessage}`, authenticScarcity: `${axiosResult.data.authenticScarcity}`, scarcityRank: `${axiosResult.data.scarcityRank}`, clusterId: `${axiosResult.data.clusterId}`, clusterSize: `${axiosResult.data.clusterSize}`, superClusterId: `${axiosResult.data.superClusterId}`, superClusterSize: `${axiosResult.data.superClusterSize}`, artworkId: `${axiosResult.data.artworkId}`, artworkURL: `${resultArtworkURLAppleId[0].URL}`, imageURL: `${axiosResult.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
                }

              }catch (e) {
                logger.log('error', '%s %s %s Issue with NFT URI: %s', 'Nft', 'getNFT', id, nftURL);
                console.log(e);
                return "Issue with NFT URI";
              }

            }
            await sleep(500);
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

        if (nft.tokenUri.raw.startsWith("ipfs://")){
          // get the NFT info from the URI
          const nftURL = nft.tokenUri.raw.replace("ipfs://", "https://ipfs.io/ipfs/");
  
          const optionsNoProxy = {
            'method': 'GET',
            'url': nftURL,
            'headers': {
              'Content-Type': 'application/json',
              'Accept-Encoding': 'gzip, deflate, br',
              'Connection': 'keep-alive'
            }
          };
  
          const optionsProxy = {
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
            if (process.env.alchemyIfProxy == "false"){
              axiosResult = await axios(optionsNoProxy);
            }else{
              axiosResult = await axios(optionsProxy);
            }

            // get artwork URL
            var sqlArtworkURLWalletaddress = 'SELECT URL FROM artwork WHERE artworkId = "' + axiosResult.data.artworkId + '";';
            const resultArtworkURLWalletaddress = await db.query(
                sqlArtworkURLWalletaddress
            );
            
            logger.log('debug', '%s %s sql: %s', 'Nft', 'getNFT', sqlArtworkURLWalletaddress);

            if (type == "mintPass"){
              data.push({walletAddress: `${id}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${axiosResult.data.name}`, description: `${axiosResult.data.description}`, eventId: `${axiosResult.data.eventId}`, type: `${axiosResult.data.type}`, artistMessage: `${axiosResult.data.artistMessage}`, artworkId: `${axiosResult.data.artworkId}`, artworkURL: `${resultArtworkURLWalletaddress[0].URL}`, imageURL: `${axiosResult.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
            }else if (type == "mindfulToken") {
              data.push({walletAddress: `${id}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${axiosResult.data.name}`, description: `${axiosResult.data.description}`, eventId: `${axiosResult.data.eventId}`, type: `${axiosResult.data.type}`, artistMessage: `${axiosResult.data.artistMessage}`, authenticScarcity: `${axiosResult.data.authenticScarcity}`, scarcityRank: `${axiosResult.data.scarcityRank}`, clusterId: `${axiosResult.data.clusterId}`, clusterSize: `${axiosResult.data.clusterSize}`, superClusterId: `${axiosResult.data.superClusterId}`, superClusterSize: `${axiosResult.data.superClusterSize}`, artworkId: `${axiosResult.data.artworkId}`, artworkURL: `${resultArtworkURLWalletaddress[0].URL}`, imageURL: `${axiosResult.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
            }
          }catch (e) {
            logger.log('error', '%s %s %s Issue with NFT URI: %s', 'Nft', 'getNFT', id, nftURL);
            console.log(e);
            return "Issue with NFT URI";
          }
        }
      await sleep(500);
    }
  }

  return {
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
