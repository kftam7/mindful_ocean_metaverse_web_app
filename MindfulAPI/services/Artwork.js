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

    // calleed by end user, return ifMinted = 0 only
    if (appleId){
        var rows = await db.query(
        //`SELECT b.userId, b.appleId, a.artworkId, a.eventId, a.URL, a.type, a.artistMessage, a.extraInfo, a.mintpassStorage, a.mindfultokenStorage, a.ifHomepage, a.ifMinted, a.ifRedeemed, a.authenticScarcity, a.scarcityRank, a.clusterId, a.clusterSize, a.superClusterId, a.superClusterSize, a.isActive, a.createTime, a.updateTime FROM artwork a, user b WHERE a.userId=b.userId AND ifMinted = 0 AND b.appleId = ? ORDER by artworkId ASC;`, [appleId]
        `SELECT b.userId, b.appleId, b.firstName, b.lastName, a.artworkId, a.eventId, a.URL, a.type, a.artistMessage, a.extraInfo, a.mintpassStorage, a.mindfultokenStorage, a.ifHomepage, a.ifMinted, a.ifRedeemed, a.authenticScarcity, a.scarcityRank, a.clusterId, a.clusterSize, a.superClusterId, a.superClusterSize, a.isActive, a.createTime, a.updateTime FROM artwork a, user b WHERE a.userId=b.userId AND ifMinted = 0 AND b.appleId = ? ORDER by artworkId ASC;`, [appleId]
        //`SELECT b.userId, b.appleId, a.artworkId, a.name, a.URL, a.type, a.description, a.extraInfo, a.createTime, a.updateTime, a.ifHomepage FROM artwork a, user b WHERE a.userId=b.userId AND ifMinted = 0 AND b.appleId = ? ORDER by artworkId ASC;`, [appleId]
      );
    // called by admin, return ifMinted = 0 & 1     
    }else{
        var rows = await db.query(
        `SELECT b.userId, b.appleId, b.firstName, b.lastName, a.artworkId, a.eventId, a.URL, a.type, a.artistMessage, a.extraInfo, a.mintpassStorage, a.mindfultokenStorage, a.ifHomepage, a.ifMinted, a.ifRedeemed, a.authenticScarcity, a.scarcityRank, a.clusterId, a.clusterSize, a.superClusterId, a.superClusterSize, a.isActive, a.createTime, a.updateTime FROM artwork a, user b WHERE a.userId=b.userId ORDER by artworkId ASC;`
        //`SELECT b.userId, b.appleId, a.artworkId, a.name, a.URL, a.type, a.description, a.extraInfo, a.createTime, a.updateTime, a.ifHomepage FROM artwork a, user b WHERE a.userId=b.userId ORDER by artworkId ASC;`
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


  var rows = await db.query(
    //`SELECT b.userId, b.appleId, a.artworkId, a.name, a.URL, a.type, a.description, a.extraInfo, a.createTime, a.updateTime, a.ifHomepage FROM artwork a, user b WHERE a.userId=b.userId AND a.ifHomepage = 1 ORDER BY RAND() LIMIT 3;`
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

  // censor contents (name, description, extraInfo )
  /*
  let validResult = await validate.validateContent(artworkRecord[0].name);
  if (!validResult) {
    return ("Input contains explicit contents");
  }
  validResult = await validate.validateContent(artworkRecord[0].description);
  if (!validResult) {
    return ("Input contains explicit contents");
  }
  validResult = await validate.validateContent(artworkRecord[0].extraInfo);
  if (!validResult) {
    return ("Input contains explicit contents");
  }
  */

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  validResult = await validate.validateContent(artworkRecord[0].artistMessage);
  if (!validResult) {
    return ("Artist Message contains explicit contents");
  }

  // get the userId
  var sqlUserId = 'SELECT userId FROM user WHERE appleId LIKE "' + artworkRecord[0].appleId + '"'; 

  const userIdResult = await db.query(
    sqlUserId
  );

  if (!userIdResult.length){
    let message = 'appleId doesn\'t exist';
    return {message};
  }else{

    var rows = await db.query(
      //`INSERT INTO artwork (userId, name, URL, type, description, extraInfo, createTime, updateTime, ifHomepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [userIdResult[0].userId, artworkRecord[0].name, artworkRecord[0].URL, artworkRecord[0].type, artworkRecord[0].description, artworkRecord[0].extraInfo, artworkRecord[0].createTime, artworkRecord[0].updateTime, artworkRecord[0].ifHomepage]
      `INSERT INTO artwork (userId, eventId, URL, type, artistMessage, ifHomepage, ifMinted, ifRedeemed, isActive, createTime, updateTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [userIdResult[0].userId, artworkRecord[0].eventId, artworkRecord[0].URL, artworkRecord[0].type, artworkRecord[0].artistMessage, artworkRecord[0].ifHomepage, artworkRecord[0].ifMinted, artworkRecord[0].ifRedeemed, artworkRecord[0].isActive, currentTimeSql, currentTimeSql]
    );
  
  /*
    var queryResult = await db.query(
      //`SELECT artworkId FROM artwork WHERE userId = ? AND name = ?`, [userIdResult[0].userId, artworkRecord[0].name]
      `SELECT LAST_INSERT_ID() AS artworkId`
    );
    
*/
    //const artworkId = queryResult[0].artworkId;
    const artworkId = rows.insertId;
    return {artworkId};

  }

  
}

/* update Artwork */
async function updateArtwork(artworkId, artworkRecord){

/*
  // censor contents (name, description, extraInfo )
  let validResult = await validate.validateContent(artworkRecord.name);
  if (!validResult) {
    return ("Input contains explicit contents");
  }
  validResult = await validate.validateContent(artworkRecord.description);
  if (!validResult) {
    return ("Input contains explicit contents");
  }
  validResult = await validate.validateContent(artworkRecord.extraInfo);
  if (!validResult) {
    return ("Input contains explicit contents");
  }
*/

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  validResult = await validate.validateContent(artworkRecord.artistMessage);
  if (!validResult) {
    return ("Artist Message contains explicit contents");
  }

  // get the userId
  var sqlUserId = 'SELECT userId FROM user WHERE appleId LIKE "' + artworkRecord.appleId + '"'; 

  const userIdResult = await db.query(
    sqlUserId
  );

  if (!userIdResult.length){
    let message = 'appleId doesn\'t exist';
    return {message};
  }else{  

  //sql = 'UPDATE artwork SET userId = "' + userIdResult[0].userId + '", name = "' + artworkRecord.name + '", URL = "' + artworkRecord.URL + '", type = "' + artworkRecord.type + '", description = "' + artworkRecord.description + '", extraInfo = "' + artworkRecord.extraInfo + '", createTime = "' + artworkRecord.createTime + '", updateTime = "' + artworkRecord.updateTime + '", ifHomepage = ' + artworkRecord.ifHomepage + ' WHERE artworkId = "' + artworkId + '";';
  
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

    //console.log(sql);
    
    const result = await db.query(
      sql
    );


    if (result.affectedRows) {
      message = 'Record updated successfully';
    }
    
    return {message};
  }
  
}

/* set Minted */
async function setMintedArtwork(artworkId){

  // read data from artwork table
  var sqlSelect = 'SELECT count(*) AS count FROM artwork WHERE artworkId = ' + artworkId; 
  const resultSelect = await db.query(
    sqlSelect
  );

  // if artworkId doesn't exist
  if (resultSelect[0].count == 0){
    return ("No record found for this artworkId");
  }

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  sql = 'UPDATE artwork SET ifMinted = 1, updateTime = "' + currentTimeSql + '" WHERE artworkId = "' + artworkId + '";';
  const result = await db.query(
    sql
  );
  
  if (result.affectedRows) {
    message = 'Record updated successfully';
  }
  
  return {message};
  
}

/* set Redeemed */
async function setRedeemedArtwork(artworkId){

  // read data from artwork table
  var sqlSelect = 'SELECT count(*) AS count FROM artwork WHERE artworkId = ' + artworkId; 
  const resultSelect = await db.query(
    sqlSelect
  );

  // if artworkId doesn't exist
  if (resultSelect[0].count == 0){
    return ("No record found for this artworkId");
  }

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  sql = 'UPDATE artwork SET ifRedeemed = 1, updateTime = "' + currentTimeSql + '" WHERE artworkId = "' + artworkId + '";';
  const result = await db.query(
    sql
  );
  
  if (result.affectedRows) {
    message = 'Record updated successfully';
  }
  
  return {message};
  
}

/* NFT Storage, type=1 for mintpass, type=2 for mindfultoken */
async function nftStorage(artworkId, type){

  const API_KEY = process.env.NFT_STORAGE_API_KEY;
  const client = new NFTStorage({ token: API_KEY });
  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  // read data from artwork table
  //var sqlSelect = 'SELECT name, URL, type, description, extraInfo, mintpassStorage, mindfultokenStorage FROM artwork WHERE artworkId = ' + artworkId; 
  var sqlSelect = 'SELECT eventId, URL, type, artistMessage, extraInfo, mintpassStorage, mindfultokenStorage, authenticScarcity, scarcityRank, clusterId, clusterSize, superClusterId, superClusterSize FROM artwork WHERE artworkId = ' + artworkId; 
  const resultSelect = await db.query(
    sqlSelect
  );

  // if artworkId doesn't exist
  if (!resultSelect.length){
    return ("No record found for this artworkId");
  }

  // for mintpas
  if (type == 1){

    // if value already exists
    if (resultSelect[0].mintpassStorage){
      if (resultSelect[0].mintpassStorage.startsWith("ipfs")){
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
    const resultUpdateMintpass = await db.query(
      sqlUpdateMintpass
    );

    return mintpassMetadata.url;

  // for mindfultoken
  }else{

    // if value already exists
    if (resultSelect[0].mindfultokenStorage){
      if (resultSelect[0].mindfultokenStorage.startsWith("ipfs")){
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
    const resultUpdateMindfultoken = await db.query(
      sqlUpdateMindfultoken
    );

    return mindfultokenMetadata.url;
  }


/*
  // if nftStorage exists 
  if (resultSelect[0].nftStorage){
    if (resultSelect[0].nftStorage.startsWith("ipfs")){
      return resultSelect[0].nftStorage;
    }
  }

  const url = resultSelect[0].URL;
  const filename = url.replace(process.env.artworkFileBaseURL, '');
  const filepath = process.env.filepathPrefix + filename;

  if (type == 1){
    const mintpassMetadata = await client.store({
         name: resultSelect[0].name,
         type: resultSelect[0].type,
         description: resultSelect[0].description,
         extraInfo: resultSelect[0].extraInfo,
    })
  }else{
    const mindfultokenMetadata = await client.store({
      name: resultSelect[0].name,
      type: resultSelect[0].type,
      description: resultSelect[0].description,
      extraInfo: resultSelect[0].extraInfo,
      image: new File(
          [await fs.promises.readFile(filepath)],
          filename,
          { type: 'image/jpeg' }
      ),
    })
  }

  // update data to artwork table
  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  if (type == 1){
    var sqlUpdate = 'UPDATE artwork SET mintpassStorage = "' + metadata.url + '", updateTime = "' + currentTimeSql + '" WHERE artworkId = ' + artworkId + ';';
  }else{
    var sqlUpdate = 'UPDATE artwork SET mindfultokenStorage = "' + metadata.url + '", updateTime = "' + currentTimeSql + '" WHERE artworkId = ' + artworkId + ';';
  }
  //console.log("sqlUpdate: ", sqlUpdate);
  const resultUpdate = await db.query(
    sqlUpdate
  );
*/

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
