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

            //console.log("nftURL: ", nft.tokenUri.raw);

            if (nft.tokenUri.raw.startsWith("ipfs://")){
              // get the NFT info from the URI
              const nftURL = nft.tokenUri.raw.replace("ipfs://", "https://ipfs.io/ipfs/");
  
              //console.log("nftURL: ", nftURL);
  
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
                //data.push({tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, type: `${result.data.type}`, description: `${result.data.description}`, extraInfo: `${result.data.extraInfo}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
                data.push({walletAddress: `${address.walletAddress}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, type: `${result.data.type}`, description: `${result.data.description}`, extraInfo: `${result.data.extraInfo}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
              }catch (e) {
                return "Issue with NFT URI";
              }
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
  
        if (nft.tokenUri.raw.startsWith("ipfs://")){
          // get the NFT info from the URI
          const nftURL = nft.tokenUri.raw.replace("ipfs://", "https://ipfs.io/ipfs/");
  
          //console.log("nftURL: ", nftURL);
  
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
            //data.push({tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, type: `${result.data.type}`, description: `${result.data.description}`, extraInfo: `${result.data.extraInfo}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
            data.push({walletAddress: `${id}`, tokenId: `${nft.tokenId}`, tokenUriRaw: `${nft.tokenUri.raw}`, name: `${result.data.name}`, type: `${result.data.type}`, description: `${result.data.description}`, extraInfo: `${result.data.extraInfo}`, imageURL: `${result.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}`});
          }catch (e) {
            return "Issue with NFT URI";
          }
        }
      }
    }
  }

*/

  //let dataMintPass = [{"tokenId": "1", "description": "This is MintPass 1", "peronsalInfo": "Personal Information 1", "artistAppleId": "AppleID1", "eventId": "1", "URL": "https://123.abc.com"},{"tokenId": "2", "description": "This is MintPass 2", "peronsalInfo": "Personal Information 2", "artistAppleId": "AppleID2", "eventId": "2", "URL": "https://456.abc.com"},{"tokenId": "3", "description": "This is MintPass 3", "peronsalInfo": "Personal Information 3", "artistAppleId": "AppleID3", "eventId": "3", "URL": "https://789.abc.com"}];
  //let dataMintPass = [];
  //let dataMindfulToken = [{"tokenId": "20230420", "description": "This is MindfulToken 1", "peronsalInfo": "Personal Information 4", "artistAppleId": "AppleID4", "eventId": "4", "URL": "https://777.xyz.com"}, {"tokenId": "20230421", "description": "This is MindfulToken 2", "peronsalInfo": "Personal Information 5", "artistAppleId": "AppleID5", "eventId": "5", "URL": "https://888.xyz.com"}, {"tokenId": "20230422", "description": "This is MindfulToken 3", "peronsalInfo": "Personal Information 6", "artistAppleId": "AppleID6", "eventId": "6", "URL": "https://999.xyz.com"}];
  //let dataMintPass = [{"tokenId":"6","tokenUriRaw":"ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name":"artworkwhatisthis","type":"fish","description":"gif picture","extraInfo":"null","imageURL":"https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"tokenId":"7","tokenUriRaw":"ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name":"artworkwhatisthis","type":"fish","description":"gifpicture","extraInfo":"null","imageURL":"https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"}];
  //let dataMindfulToken = [{"tokenId":"0","tokenUriRaw":"ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name":"artworkwhatisthis","type":"fish","description":"gif picture","extraInfo":"null","imageURL":"https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"tokenId":"1","tokenUriRaw":"ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name":"artworkwhatisthis","type":"fish","description":"gif picture","extraInfo":"null","imageURL":"https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"}]; 
  //let dataMintPass = [{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "2","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "3","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9","tokenId": "4","tokenUriRaw": "ipfs://bafyreibmfsnqc55ziv7vck6b4f76ifixu67bxpwcsk5zg5o27lnesv6pqe/metadata.json","name": "artworktest3","type": "fish","description": "kkkk","extraInfo": "fdsfsfdsfds","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9","tokenId": "6","tokenUriRaw": "ipfs://bafyreibmfsnqc55ziv7vck6b4f76ifixu67bxpwcsk5zg5o27lnesv6pqe/metadata.json","name": "artworktest3","type": "fish","description": "kkkk","extraInfo": "fdsfsfdsfds","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "16","tokenUriRaw": "ipfs://bafyreifhld4u4sy6osixubpebmc4grdi4y5ghjmyphkkfjyufipxrcivny/metadata.json","name": "testartwrok9","type": "fish","description": "desc9","extraInfo": "extra9","imageURL": "https://ipfs.io/ipfs/bafybeihay3wh6h26fr4zyxcvdpbsp33zia2i6c3kiet25tzttkicg3vflq/artwork_default.jpg"}];
  //let dataMindfulToken = [{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "0","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "1","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9","tokenId": "7","tokenUriRaw": "ipfs://bafyreibmfsnqc55ziv7vck6b4f76ifixu67bxpwcsk5zg5o27lnesv6pqe/metadata.json","name": "artworktest3","type": "fish","description": "kkkk","extraInfo": "fdsfsfdsfds","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "8","tokenUriRaw": "ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json","name": "sample-test","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeidojtns2xuzldglmeutidznyuzmum4jtow4h7z3tbwzqwuskijtre/sample-test.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "11","tokenUriRaw": "ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json","name": "sample-test","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeidojtns2xuzldglmeutidznyuzmum4jtow4h7z3tbwzqwuskijtre/sample-test.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "12","tokenUriRaw": "ipfs://bafyreierzjpzy576f2sqwr6yshf6wwlaan7qsh32bycmtb7l4fegi6srzm/metadata.json","name": "Sample artwork","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "13","tokenUriRaw": "ipfs://bafyreifuvv46cghiid222of4vlr35i6jz7zgbgscw2c2zfv53epulvrony/metadata.json","name": "Sample artwork2","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "14","tokenUriRaw": "ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json","name": "sample-test","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeidojtns2xuzldglmeutidznyuzmum4jtow4h7z3tbwzqwuskijtre/sample-test.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "15","tokenUriRaw": "ipfs://bafyreidaphppcdpnwtrbxy6g42uubwpcxgxo2przkocnqz4tuk7hlxe4g4/metadata.json","name": "testartwork2","type": "fish","description": "testartwork2 desc","extraInfo": "testartwork2 extra","imageURL": "https://ipfs.io/ipfs/bafybeifsrz7fidwdb3oensdbavkx3ka4cyqglandgbrpv6kcmzox7znzve/event_B.png"}]; 
  
  if(type == "mintPass"){
    data = [{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "2","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "3","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9","tokenId": "4","tokenUriRaw": "ipfs://bafyreibmfsnqc55ziv7vck6b4f76ifixu67bxpwcsk5zg5o27lnesv6pqe/metadata.json","name": "artworktest3","type": "fish","description": "kkkk","extraInfo": "fdsfsfdsfds","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9","tokenId": "6","tokenUriRaw": "ipfs://bafyreibmfsnqc55ziv7vck6b4f76ifixu67bxpwcsk5zg5o27lnesv6pqe/metadata.json","name": "artworktest3","type": "fish","description": "kkkk","extraInfo": "fdsfsfdsfds","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "16","tokenUriRaw": "ipfs://bafyreifhld4u4sy6osixubpebmc4grdi4y5ghjmyphkkfjyufipxrcivny/metadata.json","name": "testartwrok9","type": "fish","description": "desc9","extraInfo": "extra9","imageURL": "https://ipfs.io/ipfs/bafybeihay3wh6h26fr4zyxcvdpbsp33zia2i6c3kiet25tzttkicg3vflq/artwork_default.jpg"}];
  }else{
    data = [{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "0","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab","tokenId": "1","tokenUriRaw": "ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json","name": "artworkwhatisthis","type": "fish","description": "gif picture","extraInfo": "null","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9","tokenId": "7","tokenUriRaw": "ipfs://bafyreibmfsnqc55ziv7vck6b4f76ifixu67bxpwcsk5zg5o27lnesv6pqe/metadata.json","name": "artworktest3","type": "fish","description": "kkkk","extraInfo": "fdsfsfdsfds","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "8","tokenUriRaw": "ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json","name": "sample-test","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeidojtns2xuzldglmeutidznyuzmum4jtow4h7z3tbwzqwuskijtre/sample-test.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "11","tokenUriRaw": "ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json","name": "sample-test","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeidojtns2xuzldglmeutidznyuzmum4jtow4h7z3tbwzqwuskijtre/sample-test.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "12","tokenUriRaw": "ipfs://bafyreierzjpzy576f2sqwr6yshf6wwlaan7qsh32bycmtb7l4fegi6srzm/metadata.json","name": "Sample artwork","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "13","tokenUriRaw": "ipfs://bafyreifuvv46cghiid222of4vlr35i6jz7zgbgscw2c2zfv53epulvrony/metadata.json","name": "Sample artwork2","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeih7lqtefza3fo4v2cwmo2hl7wjajqaddel2vy5q5ixhojn4f2hna4/sample_artwork.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "14","tokenUriRaw": "ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json","name": "sample-test","type": "fish","description": "Sample test","extraInfo": "Sample test extra","imageURL": "https://ipfs.io/ipfs/bafybeidojtns2xuzldglmeutidznyuzmum4jtow4h7z3tbwzqwuskijtre/sample-test.jpeg"},{"walletAddress": "0x5248099D624063a83fa37f22f8243A80e56D5138","tokenId": "15","tokenUriRaw": "ipfs://bafyreidaphppcdpnwtrbxy6g42uubwpcxgxo2przkocnqz4tuk7hlxe4g4/metadata.json","name": "testartwork2","type": "fish","description": "testartwork2 desc","extraInfo": "testartwork2 extra","imageURL": "https://ipfs.io/ipfs/bafybeifsrz7fidwdb3oensdbavkx3ka4cyqglandgbrpv6kcmzox7znzve/event_B.png"}];
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
