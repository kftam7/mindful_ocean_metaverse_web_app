const fs = require('fs');
const Papa = require('papaparse');
const db = require('../db');
const moment = require('moment');
const axios = require("axios");
const md5 = require("blueimp-md5");
const contract = require("./MintPassNFT.json");
const apiPort = "http://127.0.0.1:3001";
//const apiPort = "https://api.mindful-ocean.org";
let metaData;
const { ethers } = require('ethers');

const API_KEY = "3iqNgDWSBHMkWq9vVT5GwGNuIJ_4vlbQ";
//const SYSTEM_PRIVATE_KEY = "51476301944acfc0470650171472e4824dbe89d10a460bb7224eb53837d0560a";
const SYSTEM_PRIVATE_KEY = "78501fb8da333ed1c8312a2a4138bde909e280519157d5cac7e627222f2886b9"; // test account
// const MINTPASS_CONTRACT_ADDRESS = "0x4d41e08738b2c73cd70ad55917ebc185fcec52ba";
const MINTPASS_CONTRACT_ADDRESS = "0xd6996ddc5213c0726288e6254f0d10bdc91b9521"; // amoy testnet

// Prepare the chain info
const netObj = {
    name: 'matic-amoy',
    chainId: 80002 
}
const alchemyProvider = new ethers.AlchemyProvider(netObj, API_KEY);
const signer = new ethers.Wallet(SYSTEM_PRIVATE_KEY, alchemyProvider);
const MintPassContract = new ethers.Contract(MINTPASS_CONTRACT_ADDRESS, contract.abi, signer);
const ethAddress = signer.getAddress();
//const timestamp = Date.now();
//let message = ethAddress + timestamp;
//let messageHash = ethers.id(message);
//let messageBytes = ethers.getBytes(messageHash);
//let signature = signer.signMessage(messageBytes);

// Function to read and parse CSV file
function readCsv(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Parse the CSV data using PapaParse
        Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            complete: async function(results) {
                await processRows(results.data);
                console.log('All rows processed.');
            },
            error: function(error) {
                console.error('Error parsing the CSV:', error);
            }
        });
    });
}

// Function to process each row of the CSV data with a delay
async function processRows(rows) {
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        
        // get the values of the fields
        const userId = row.userId;
        const eventId = row.eventId;
        const URL = row.URL;
        const type = row.type;
        const artistMessage = row.artistMessage;
        const extraInfo = row.extraInfo;
        const mintpassStorage = row.mintpassStorage;
        const mindfultokenStorage = row.mindfultokenStorage;
        const ifHomepage = row.ifHomepage;
        const ifMinted = row.ifMinted;
        const ifRedeemed = row.ifRedeemed;
        const authenticScarcity = row.authenticScarcity;
        const scarcityRank = row.scarcityRank;
        const clusterId = row.clusterId;
        const clusterSize = row.clusterSize;
        const superClusterId = row.superClusterId;
        const superClusterSize = row.superClusterSize;
        const isActive = row.isActive;
    
        // insert into DB
        const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        var sql = "INSERT INTO artwork (userId, eventId, URL, type, artistMessage, extraInfo, mintpassStorage, mindfultokenStorage, ifHomepage, ifMinted, ifRedeemed, authenticScarcity, scarcityRank, clusterId, clusterSize, superClusterId , superClusterSize, isActive, createTime, updateTime) VALUES (" + userId + ", " + eventId + ", " + "'" + URL + "', " + "'" + type + "', " + "'" + artistMessage + "', " + "'" + extraInfo + "', " + "'" + mintpassStorage + "', "  + "'" + mindfultokenStorage + "', " + ifHomepage + ", " + ifMinted + ", " + ifRedeemed + ", " + authenticScarcity + ", " + scarcityRank + ", " + clusterId + ", " + clusterSize + ", " + superClusterId + ", " + superClusterSize + ", " + isActive + ", " + "'" + currentTimeSql + "', " + "'" + currentTimeSql + "' " + ");";
        console.log("sql: %s", sql);
        var sql_result = await db.query(
            sql
        );
        const artworkId = sql_result.insertId;
        console.log("artworkId: %s", artworkId);

        // get HTTP header
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

        // update the Metadata of the MintPass
        const getMetaData = 
          await axios.post(`${apiPort}/mindfulapi/app/nftstorage/mintpass/${artworkId}`, {}, { headers: getHeaders() })
            .then(res => {
              const { status, data } = res;
              metaData = data;
              if (status === 200) {
                console.log("metadta: ", data);
                }else{
                    console.log("Can't get Metadata. Stataus error: %s", status);
                    throw new Error("Can't get Metadata");
                }
            })
            .catch(err => {
              console.log("Can't get Metadata. Error: %s", err);
              throw new Error("Can't get Metadata");
            })

        // mint MintPass
        let timestamp = Date.now();
        let message = ethAddress + timestamp;
        let messageHash = ethers.id(message);
        let messageBytes = ethers.getBytes(messageHash);
        let signature = signer.signMessage(messageBytes);
        const name = await MintPassContract.name();
        console.log("Contract name is: " + name);
        console.log("Minting MindfulNFT...");
        //console.log("metadata: ", metaData);  
        const tx = await MintPassContract.mintMintPass(messageHash, signature, artworkId, metaData, {value: 0})
        //console.log("tx: ", tx);

        // update DB
        if (tx){
 
            const updateMintResult = 
              await axios.put(`${apiPort}/mindfulapi/app/setmintedartwork/${artworkId}`, {}, { headers: getHeaders() })
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
}

// Replace 'your-file.csv' with the path to your CSV file
readCsv('../CSV/test.csv');