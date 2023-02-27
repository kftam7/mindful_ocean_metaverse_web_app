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
  const data = [];

  for await (const nft of alchemy.nft.getNftsForOwnerIterator(address, {
    // Omit the NFT metadata for smaller payloads.
    omitMetadata: false
  })) {
    if(`${nft.contract.address}` == contractAddress.toLowerCase()){

      data.push({tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`});
      /*
      console.log(`${nft.contract.address}`);
      console.log(`${nft.contract.openSea}`);
      console.log(`${nft.contract.tokenType}`);
      console.log(`${nft.contract.name}`);
      console.log(`${nft.contract.symbol}`);
      console.log(`${nft.contract.totalSupply}`);
      console.log(`${nft.tokenId}`);
      console.log(`${nft.title}`);
      console.log(`${nft.tokenUri.gateway}`);
      console.log(`${nft.tokenUri.raw}`);
      */
      
    }
  }

  //const data = helper.emptyOrRows(rows);
  const meta = "1";

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
