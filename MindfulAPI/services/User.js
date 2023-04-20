const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get Event */
async function getUser(appleId){

  //var sql = "SELECT json_object('userId',a.userId , 'appleId',a.`appleId`, 'walletAddress', a.`walletAddress`, 'personInfo', a.`personInfo`, 'createTime', a.`createTime`, 'updateTime', a.`updateTime` , 'personalwebsite', (SELECT CAST(CONCAT('[', GROUP_CONCAT( JSON_OBJECT('websiteId', b.websiteId, 'URL', b.`URL`, 'description', b.`description`)),']') AS JSON) from personalWebsite b WHERE a.userId = b.userId), 'joinedEvent' ,(SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('joinedEventId' ,c.joinedEventId, 'eventId', c.eventId, 'title', d.`title`)), ']') AS JSON) FROM joinedEvent c, event d WHERE a.userId = c.userId AND c.eventId = d.eventId)) AS result FROM user a WHERE a.appleId = \"" + appleId + "\";";
  console.log(appleId);
  var sql = "SELECT json_object('userId', a.userId, 'appleId', a.`appleId`, 'walletAddress', a.`walletAddress`, 'personInfo', a.`personInfo`, 'createTime', a.`createTime`, 'updateTime', a.`updateTime`, 'isActive', a.`isActive`, 'personalWebsite', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('websiteId', b.websiteId, 'URL', b.`URL`, 'description', b.`description`)),']') AS JSON) FROM personalWebsite b WHERE a.userId = b.userId), 'joinedEvent', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('joinedEventId', c.joinedEventId, 'eventId', c.eventId, 'title', d.`title`)), ']') AS JSON) FROM joinedEvent c, event d WHERE a.userId = c.userId AND c.eventId = d.eventId), 'artwork', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('artworkId', e.artworkId, 'name', e.name, 'URL', e.`URL`, 'description', e.`description`)), ']') AS JSON) FROM artwork e WHERE a.userId = e.userId)) AS result FROM user a WHERE a.appleId = \"" + appleId + "\";";

  if (appleId){
    var rows = await db.query(
      sql
    );
    if (!rows.length){
      var data = [];
    }else{
      var data = rows[0].result;
    }
  }else{
    var rows = await db.query(
      `SELECT * FROM user ORDER by userId ASC;`
    );
    var data = helper.emptyOrRows(rows);      
  }

  const meta = "1";

  return {
    data,
    meta
  }
}

/* create User */
async function createUser(userRecord){

  // construct the SQL statement
  var sql = 'INSERT INTO user (appleId, walletAddress, personInfo, createTime, updateTime, isActive) VALUES ';

  for (var i =0; i < userRecord.length; i++){

    // combine into 1 single SQL
    if (i == (userRecord.length-1)){
      sql = sql + '("' + userRecord[i].appleId + '", "' + userRecord[i].walletAddress + '", "' + userRecord[i].personInfo + '", "' + userRecord[i].createTime + '", "' + userRecord[i].updateTime + '", ' + userRecord[i].isActive + ');';
    }else{
      sql = sql + '("' + userRecord[i].appleId + '", "' + userRecord[i].walletAddress + '", "' + userRecord[i].personInfo + '", "' + userRecord[i].createTime + '", "' + userRecord[i].updateTime + '", ' + userRecord[i].isActive + '),';
    }

  }

  // update results on DB
  const result = await db.query(
    sql
  );

  // will return SQL error if fails, otherwise return the following succesful msg
  let message = 'Records added susccessfully';
  return {message};
}

/* update Event */
async function updateUser(appleId, userRecord){

  sql = 'UPDATE user SET walletAddress = "' + userRecord.walletAddress + '", personInfo = "' + userRecord.personInfo + '", createTime = "' + userRecord.createTime + '", updateTime = "' + userRecord.updateTime + '", isActive = ' + userRecord.isActive + ' WHERE appleId = "' + appleId + '";';
  
  const result = await db.query(
    sql
  );

  if (result.affectedRows) {
    message = 'Record updated successfully';
  }

  return {message};
}



module.exports = {
  getUser,
  createUser,
  updateUser
};
