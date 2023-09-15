const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
const validate = require("../utils/validate");
const fs = require('fs');
const moment = require('moment');
const { NFTStorage, File } = require('nft.storage');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get Artwork */
async function getArtwork(appleId){

  logger.log('info', '%s %s %s', 'Artwork', 'getArtwork', appleId);

  // calleed by end user, return ifMinted = 0 only
  if (appleId){
      var rows = await db.query(
      `SELECT b.userId, b.appleId, b.firstName, b.lastName, a.artworkId, a.eventId, a.URL, a.type, a.artistMessage, a.extraInfo, a.mintpassStorage, a.mindfultokenStorage, a.ifHomepage, a.ifMinted, a.ifRedeemed, a.authenticScarcity, a.scarcityRank, a.clusterId, a.clusterSize, a.superClusterId, a.superClusterSize, a.isActive, a.createTime, a.updateTime FROM artwork a, user b WHERE a.userId=b.userId AND ifMinted = 0 AND b.appleId = ? ORDER by artworkId ASC;`, [appleId]
    );
  // called by admin, return ifMinted = 0 & 1     
  }else{
      var rows = await db.query(
      `SELECT b.userId, b.appleId, b.firstName, b.lastName, a.artworkId, a.eventId, a.URL, a.type, a.artistMessage, a.extraInfo, a.mintpassStorage, a.mindfultokenStorage, a.ifHomepage, a.ifMinted, a.ifRedeemed, a.authenticScarcity, a.scarcityRank, a.clusterId, a.clusterSize, a.superClusterId, a.superClusterSize, a.isActive, a.createTime, a.updateTime FROM artwork a, user b WHERE a.userId=b.userId ORDER by artworkId ASC;`
    );
  }
  
  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* get Artwork for the homepage (not need for authentication for this call) */
async function getHomepageArtwork(){

  logger.log('info', '%s %s', 'Artwork', 'getHomepageArtwork');

  var rows = await db.query(
    `SELECT b.userId, b.appleId, b.firstName, b.lastName, a.artworkId, a.eventId, a.URL, a.type, a.artistMessage, a.extraInfo, a.mintpassStorage, a.mindfultokenStorage, a.ifHomepage, a.ifMinted, a.ifRedeemed, a.authenticScarcity, a.scarcityRank, a.clusterId, a.clusterSize, a.superClusterId, a.superClusterSize, a.isActive, a.createTime, a.updateTime FROM artwork a, user b WHERE a.userId=b.userId AND a.ifHomepage = 1 ORDER BY RAND() LIMIT 3;`
  );
  
  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create Artwork */
async function createArtwork(artworkRecord){

  logger.log('info', '%s %s %s', 'Artwork', 'createArtwork', artworkRecord[0].appleId);

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  validResult = await validate.validateContent(artworkRecord[0].artistMessage);
  logger.log('info', '%s %s %s validResult: %s', 'Artwork', 'createArtwork', artworkRecord[0].appleId, validResult);
  if (!validResult) {
    logger.log('error', '%s %s Artist Message contains explicit contents: %s', 'Artwork', 'createArtwork', artworkRecord[0].artistMessage);
    return ("Artist Message contains explicit contents");
  }

  // get the userId
  var sqlUserId = 'SELECT userId FROM user WHERE appleId LIKE "' + artworkRecord[0].appleId + '"';

  logger.log('debug', '%s %s sqlUserId: %s', 'Artwork', 'createArtwork', sqlUserId);

  const userIdResult = await db.query(
    sqlUserId
  );

  if (!userIdResult.length){
    logger.log('error', '%s %s %s appleId doesn\'t exist', 'Artwork', 'createArtwork', artworkRecord[0].appleId);
    let message = 'appleId doesn\'t exist';
    return {message};
  }else{

    var rows = await db.query(
      `INSERT INTO artwork (userId, eventId, URL, type, artistMessage, ifHomepage, ifMinted, ifRedeemed, isActive, createTime, updateTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [userIdResult[0].userId, artworkRecord[0].eventId, artworkRecord[0].URL, artworkRecord[0].type, artworkRecord[0].artistMessage, artworkRecord[0].ifHomepage, artworkRecord[0].ifMinted, artworkRecord[0].ifRedeemed, artworkRecord[0].isActive, currentTimeSql, currentTimeSql]
    );

    const artworkId = rows.insertId;
    logger.log('info', '%s %s Artwork created successfully, artworkId: %s', 'Artwork', 'createArtwork', artworkId);
    return {artworkId};

  }

  
}

/* update Artwork */
async function updateArtwork(artworkId, artworkRecord){

  logger.log('info', '%s %s %s', 'Artwork', 'updateArtwork', artworkId);

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  validResult = await validate.validateContent(artworkRecord.artistMessage);
  if (!validResult) {
    logger.log('error', '%s %s Artist Message contains explicit contents: %s', 'Artwork', 'updateArtwork', artworkRecord.artistMessage);
    return ("Artist Message contains explicit contents");
  }

  // get the userId
  var sqlUserId = 'SELECT userId FROM user WHERE appleId LIKE "' + artworkRecord.appleId + '"'; 
  logger.log('debug', '%s %s sqlUserId: %s', 'Artwork', 'updateArtwork', sqlUserId);
  const userIdResult = await db.query(
    sqlUserId
  );

  if (!userIdResult.length){
    logger.log('error', '%s %s %s appleId doesn\'t exist', 'Artwork', 'updateArtwork', artworkRecord.appleId);
    let message = 'appleId doesn\'t exist';
    return {message};
  }else{  

  sql = 'UPDATE artwork SET userId = ' + userIdResult[0].userId;

  if (!(artworkRecord.eventId == null)){
    sql = sql + ', eventId = ' + artworkRecord.eventId; 
  }

  if (!(artworkRecord.URL == null)){
    sql = sql + ', URL = "' + artworkRecord.URL + '"'; 
  }

  if (!(artworkRecord.type == null)){
    sql = sql + ', type = "' + artworkRecord.type + '"'; 
  }

  if (!(artworkRecord.artistMessage == null)){
    sql = sql + ', artistMessage = "' + artworkRecord.artistMessage + '"'; 
  }

  if (!(artworkRecord.extraInfo == null)){
    sql = sql + ', extraInfo = "' + artworkRecord.extraInfo + '"'; 
  }

  if (!(artworkRecord.ifHomepage == null)){
    sql = sql + ', ifHomepage = ' + artworkRecord.ifHomepage; 
  }

  if (!(artworkRecord.ifMinted == null)){
    sql = sql + ', ifMinted = ' + artworkRecord.ifMinted; 
  }

  if (!(artworkRecord.ifRedeemed == null)){
    sql = sql + ', ifRedeemed = ' + artworkRecord.ifRedeemed; 
  }

  if (!(artworkRecord.authenticScarcity == null)){
    sql = sql + ', authenticScarcity = ' + artworkRecord.authenticScarcity; 
  }

  if (!(artworkRecord.scarcityRank == null)){
    sql = sql + ', scarcityRank = ' + artworkRecord.scarcityRank; 
  }

  if (!(artworkRecord.clusterId == null)){
    sql = sql + ', clusterId = ' + artworkRecord.clusterId; 
  }

  if (!(artworkRecord.clusterSize == null)){
    sql = sql + ', clusterSize = ' + artworkRecord.clusterSize; 
  }

  if (!(artworkRecord.superClusterId == null)){
    sql = sql + ', superClusterId = ' + artworkRecord.superClusterId; 
  }

  if (!(artworkRecord.superClusterSize == null)){
    sql = sql + ', superClusterSize = ' + artworkRecord.superClusterSize; 
  }

  if (!(artworkRecord.isActive == null)){
    sql = sql + ', isActive = ' + artworkRecord.isActive; 
  }

  sql = sql + ', updateTime = "' + currentTimeSql + '" WHERE artworkId = ' + artworkId + ';'; 

  logger.log('debug', '%s %s sql: %s', 'Artwork', 'updateArtwork', sql);
    
    const result = await db.query(
      sql
    );


    if (result.affectedRows) {
      logger.log('info', '%s %s %s Record updated successfully', 'Artwork', 'updateArtwork', artworkId);
      message = 'Record updated successfully';
    }
    
    return {message};
  }
  
}

/* set Minted */
async function setMintedArtwork(artworkId){

  logger.log('info', '%s %s %s', 'Artwork', 'setMintedArtwork', artworkId);

  // read data from artwork table
  var sqlSelect = 'SELECT count(*) AS count FROM artwork WHERE artworkId = ' + artworkId; 
  const resultSelect = await db.query(
    sqlSelect
  );

  logger.log('debug', '%s %s sqlSelect: %s', 'Artwork', 'setMintedArtwork', sqlSelect);

  // if artworkId doesn't exist
  if (resultSelect[0].count == 0){
    logger.log('error', '%s %s %s No record found for this artworkId', 'Artwork', 'setMintedArtwork', artworkId);
    return ("No record found for this artworkId");
  }

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  sql = 'UPDATE artwork SET ifMinted = 1, updateTime = "' + currentTimeSql + '" WHERE artworkId = "' + artworkId + '";';
  logger.log('debug', '%s %s sql: %s', 'Artwork', 'setMintedArtwork', sql);
  const result = await db.query(
    sql
  );
  
  if (result.affectedRows) {
    logger.log('info', '%s %s %s Record updated successfully', 'Artwork', 'setMintedArtwork', artworkId);
    message = 'Record updated successfully';
  }
  
  return {message};
  
}

/* set Redeemed */
async function setRedeemedArtwork(artworkId){

  logger.log('info', '%s %s %s', 'Artwork', 'setRedeemedArtwork', artworkId);

  // read data from artwork table
  var sqlSelect = 'SELECT count(*) AS count FROM artwork WHERE artworkId = ' + artworkId; 
  const resultSelect = await db.query(
    sqlSelect
  );

  logger.log('debug', '%s %s sqlSelect: %s', 'Artwork', 'setRedeemedArtwork', sqlSelect);

  // if artworkId doesn't exist
  if (resultSelect[0].count == 0){
    logger.log('error', '%s %s %s No record found for this artworkId', 'Artwork', 'setRedeemedArtwork', artworkId);
    return ("No record found for this artworkId");
  }

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  sql = 'UPDATE artwork SET ifRedeemed = 1, updateTime = "' + currentTimeSql + '" WHERE artworkId = "' + artworkId + '";';
  logger.log('debug', '%s %s sql: %s', 'Artwork', 'setRedeemedArtwork', sql);
  const result = await db.query(
    sql
  );
  
  if (result.affectedRows) {
    logger.log('info', '%s %s %s Record updated successfully', 'Artwork', 'setRedeemedArtwork', artworkId);
    message = 'Record updated successfully';
  }
  
  return {message};
  
}

/* NFT Storage, type=1 for mintpass, type=2 for mindfultoken */
async function nftStorage(artworkId, type){

  logger.log('info', '%s %s %s %s', 'Artwork', 'nftStorage', artworkId, type);

  const API_KEY = process.env.NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: API_KEY });
  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  // read data from artwork table 
  var sqlSelect = 'SELECT eventId, URL, type, artistMessage, extraInfo, mintpassStorage, mindfultokenStorage, authenticScarcity, scarcityRank, clusterId, clusterSize, superClusterId, superClusterSize FROM artwork WHERE artworkId = ' + artworkId; 
  logger.log('debug', '%s %s sqlSelect: %s', 'Artwork', 'nftStorage', sqlSelect);
  const resultSelect = await db.query(
    sqlSelect
  );

  // if artworkId doesn't exist
  if (!resultSelect.length){
    logger.log('error', '%s %s %s No record found for this artworkId', 'Artwork', 'nftStorage', artworkId);
    return ("No record found for this artworkId");
  }

  // for mintpas
  if (type == 1){

    // if value already exists
    if (resultSelect[0].mintpassStorage){
      if (resultSelect[0].mintpassStorage.startsWith("ipfs")){
        logger.log('info', '%s %s %s %s mintpassStorage already exists', 'Artwork', 'nftStorage', artworkId, type);
        return resultSelect[0].mintpassStorage;
      }
    }

    const urlMintpass = resultSelect[0].URL;
    const filenameMintpass = process.env.defaultImage;
    const filepathMintpass = process.env.filepathPrefix + filenameMintpass;

    const mintpassMetadata = await client.store({
         name: "MindfulOcean",
         description: "MintPass",
         eventId: resultSelect[0].eventId,
         type: resultSelect[0].type,
         artistMessage: resultSelect[0].artistMessage,
         //extraInfo: resultSelect[0].extraInfo,
         artworkId: artworkId,
         image: new File(
            [await fs.promises.readFile(filepathMintpass)],
            filenameMintpass,
            { type: 'image/gif' }
      ),
    })

    const sqlUpdateMintpass = 'UPDATE artwork SET mintpassStorage = "' + mintpassMetadata.url + '", updateTime = "' + currentTimeSql + '" WHERE artworkId = ' + artworkId + ';';
    logger.log('debug', '%s %s sqlUpdateMintpass: %s', 'Artwork', 'nftStorage', sqlUpdateMintpass);
    const resultUpdateMintpass = await db.query(
      sqlUpdateMintpass
    );
    logger.log('info', '%s %s %s %s mintpassStorage successfully created: %s', 'Artwork', 'nftStorage', artworkId, type, mintpassMetadata.url);
    return mintpassMetadata.url;

  // for mindfultoken
  }else{

    // if value already exists
    if (resultSelect[0].mindfultokenStorage){
      if (resultSelect[0].mindfultokenStorage.startsWith("ipfs")){
        logger.log('info', '%s %s %s %s mindfultokenStorage already exists', 'Artwork', 'nftStorage', artworkId, type);
        return resultSelect[0].mindfultokenStorage;
      }
    }

    const urlMindfultoken = resultSelect[0].URL;
    const filenameMindfultoken = urlMindfultoken.replace(process.env.artworkFileBaseURL, '');
    const filepathMindfultoken = process.env.filepathPrefix + filenameMindfultoken;

    const mindfultokenMetadata = await client.store({
      name: "MindfulOcean",
      description: "MindfulToken",
      eventId: resultSelect[0].eventId,
      type: resultSelect[0].type,
      artistMessage: resultSelect[0].artistMessage,
      authenticScarcity: resultSelect[0].authenticScarcity,
      scarcityRank: resultSelect[0].scarcityRank,
      clusterId: resultSelect[0].clusterId,
      clusterSize: resultSelect[0].clusterSize,
      superClusterId: resultSelect[0].superClusterId,
      superClusterSize: resultSelect[0].superClusterSize,
      //extraInfo: resultSelect[0].extraInfo,
      artworkId: artworkId,
      image: new File(
          [await fs.promises.readFile(filepathMindfultoken)],
          filenameMindfultoken,
          { type: 'image/jpeg' }
      ),
    })

    const sqlUpdateMindfultoken = 'UPDATE artwork SET mindfultokenStorage = "' + mindfultokenMetadata.url + '", updateTime = "' + currentTimeSql + '" WHERE artworkId = ' + artworkId + ';';
    logger.log('debug', '%s %s sqlUpdateMindfultoken: %s', 'Artwork', 'nftStorage', sqlUpdateMindfultoken);
    const resultUpdateMindfultoken = await db.query(
      sqlUpdateMindfultoken
    );
    logger.log('info', '%s %s %s %s mindfultokenMetadata successfully created: %s', 'Artwork', 'nftStorage', artworkId, type, mindfultokenMetadata.url);
    return mindfultokenMetadata.url;
  }

}

module.exports = {
  getArtwork,
  getHomepageArtwork,
  createArtwork,
  updateArtwork,
  setMintedArtwork,
  setRedeemedArtwork,
  nftStorage
};
