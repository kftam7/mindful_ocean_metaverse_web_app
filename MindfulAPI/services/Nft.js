const db = require('../db');
const helper = require('../helper');
const path = require('path');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { Alchemy, Network } = require('alchemy-sdk');
const axios = require('axios');

/* get NFT */
async function getNFT(type, idtype, id){

/*
  // create Alchemy object
  const settings = {
    apiKey: '3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ', // Replace with your Alchemy API key.
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

    // If walletaddress found for this appleId
    if (result.length){
      
      for (const address of result) {
        //console.log("address: ", address.walletAddress);
        
        for await (const nft of alchemy.nft.getNftsForOwnerIterator(address.walletAddress, {
          // Omit the NFT metadata for smaller payloads.
          omitMetadata: false
        })) {
          if(`${nft.contract.address}` == contractAddress.toLowerCase()){
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
              data.push({tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, type: `${result.data.type}`, description: `${result.data.description}`, extraInfo: `${result.data.extraInfo}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
            }catch (e) {
              return "Issue with NFT URI";
            }

          }
        }        
      }
    // If no walletaddress found for this appleId
    }else{
      return ("No walletAddress found for this appleID");
    }

  }else if(idtype == "walletaddress"){
    for await (const nft of alchemy.nft.getNftsForOwnerIterator(id, {
      // Omit the NFT metadata for smaller payloads.
      omitMetadata: false
    })) {
      if(`${nft.contract.address}` == contractAddress.toLowerCase()){
  
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
          data.push({tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, type: `${result.data.type}`, description: `${result.data.description}`, extraInfo: `${result.data.extraInfo}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
        }catch (e) {
          return "Issue with NFT URI";
        }

      }
    }
  }
*/
  //let dataMintPass = [{"tokenId": "1", "description": "This is MintPass 1", "peronsalInfo": "Personal Information 1", "artistAppleId": "AppleID1", "eventId": "1", "URL": "https://123.abc.com"},{"tokenId": "2", "description": "This is MintPass 2", "peronsalInfo": "Personal Information 2", "artistAppleId": "AppleID2", "eventId": "2", "URL": "https://456.abc.com"},{"tokenId": "3", "description": "This is MintPass 3", "peronsalInfo": "Personal Information 3", "artistAppleId": "AppleID3", "eventId": "3", "URL": "https://789.abc.com"}];
  //let dataMintPass = [];
  //let dataMindfulToken = [{"tokenId": "20230420", "description": "This is MindfulToken 1", "peronsalInfo": "Personal Information 4", "artistAppleId": "AppleID4", "eventId": "4", "URL": "https://777.xyz.com"}, {"tokenId": "20230421", "description": "This is MindfulToken 2", "peronsalInfo": "Personal Information 5", "artistAppleId": "AppleID5", "eventId": "5", "URL": "https://888.xyz.com"}, {"tokenId": "20230422", "description": "This is MindfulToken 3", "peronsalInfo": "Personal Information 6", "artistAppleId": "AppleID6", "eventId": "6", "URL": "https://999.xyz.com"}];
  let dataMintPass = [{"tokenId":"2","tokenUriRaw":"ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name":"artworkwhatisthis","type":"fish","description":"gif picture","extraInfo":"null","imageURL":"https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"tokenId":"3","tokenUriRaw":"ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name":"artworkwhatisthis","type":"fish","description":"gifpicture","extraInfo":"null","imageURL":"https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"}];
  let dataMindfulToken = [{"tokenId":"0","tokenUriRaw":"ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name":"artworkwhatisthis","type":"fish","description":"gif picture","extraInfo":"null","imageURL":"https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"tokenId":"1","tokenUriRaw":"ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name":"artworkwhatisthis","type":"fish","description":"gif picture","extraInfo":"null","imageURL":"https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"}]; 
  if(type == "mintPass"){
    data = dataMintPass;
  }else{
    data = dataMindfulToken;
  }

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
  //const total = 11;

  return {
    //data,
    total
  }
}

module.exports = {
  getNFT,
  getNFTTotal
};
