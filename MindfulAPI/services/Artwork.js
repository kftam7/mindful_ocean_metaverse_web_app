const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get Artwork */
async function getArtwork(appleId){

    if (appleId){
        var rows = await db.query(
        `SELECT b.userId, b.appleId, a.artworkId, a.name, a.URL, a.type, a.description, a.extraInfo, a.createTime, a.updateTime FROM artwork a, user b WHERE a.userId=b.userId AND b.appleId = ? ORDER by artworkId ASC;`, [appleId]
      );
    }else{
        var rows = await db.query(
        `SELECT b.userId, b.appleId, a.artworkId, a.name, a.URL, a.type, a.description, a.extraInfo, a.createTime, a.updateTime FROM artwork a, user b WHERE a.userId=b.userId ORDER by artworkId ASC;`
      );
    }
  
  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create Artwork */
async function createArtwork(artworkRecord){

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
      `INSERT INTO artwork (userId, name, URL, type, description, extraInfo, createTime, updateTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [userIdResult[0].userId, artworkRecord[0].name, artworkRecord[0].URL, artworkRecord[0].type, artworkRecord[0].description, artworkRecord[0].extraInfo, artworkRecord[0].createTime, artworkRecord[0].updateTime]
    );
  
    var queryResult = await db.query(
      `SELECT artworkId FROM artwork WHERE userId = ? AND name = ?`, [userIdResult[0].userId, artworkRecord[0].name]
    );
  
    //console.log(queryResult[0].artworkId);
  
    // will return SQL error if fails, otherwise return the following succesful msg
    /*
    let message = 'Records added susccessfully';
    return {message};
    */
    const artworkId = queryResult[0].artworkId;
    return {artworkId};
  }
  
}

/* update Artwork */
async function updateArtwork(artworkId, artworkRecord){

  // get the userId
  var sqlUserId = 'SELECT userId FROM user WHERE appleId LIKE "' + artworkRecord.appleId + '"'; 

  const userIdResult = await db.query(
    sqlUserId
  );

  if (!userIdResult.length){
    let message = 'appleId doesn\'t exist';
    return {message};
  }else{  

    sql = 'UPDATE artwork SET userId = "' + userIdResult[0].userId + '", name = "' + artworkRecord.name + '", URL = "' + artworkRecord.URL + '", type = "' + artworkRecord.type + '", description = "' + artworkRecord.description + '", extraInfo = "' + artworkRecord.extraInfo + '", createTime = "' + artworkRecord.createTime + '", updateTime = "' + artworkRecord.updateTime + '" WHERE artworkId = "' + artworkId + '";';
  
    console.log(sql);
    
    const result = await db.query(
      sql
    );
  
    if (result.affectedRows) {
      message = 'Record updated successfully';
    }
  
    return {message};
  }
  
}


module.exports = {
  getArtwork,
  createArtwork,
  updateArtwork
};
