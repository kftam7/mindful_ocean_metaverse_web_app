const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
const validate = require("../utils/validate");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get Event */
async function getUser(appleId){

  logger.log('info', '%s %s %s', 'User', 'getUser', appleId);

  //var sql = "SELECT json_object('userId', a.userId, 'appleId', a.`appleId`, 'walletAddress', a.`walletAddress`, 'personInfo', a.`personInfo`, 'createTime', a.`createTime`, 'updateTime', a.`updateTime`, 'isActive', a.`isActive`, 'personalWebsite', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('websiteId', b.websiteId, 'URL', b.`URL`, 'description', b.`description`)),']') AS JSON) FROM personalWebsite b WHERE a.userId = b.userId), 'joinedEvent', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('joinedEventId', c.joinedEventId, 'eventId', c.eventId, 'title', d.`title`)), ']') AS JSON) FROM joinedEvent c, event d WHERE a.userId = c.userId AND c.eventId = d.eventId), 'artwork', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('artworkId', e.artworkId, 'name', e.name, 'URL', e.`URL`, 'description', e.`description`)), ']') AS JSON) FROM artwork e WHERE a.userId = e.userId)) AS result FROM user a WHERE a.appleId = \"" + appleId + "\";";
  //var sql = "SELECT json_object('userId', a.userId, 'appleId', a.`appleId`, 'walletAddress', a.`walletAddress`, 'personInfo', a.`personInfo`, 'createTime', a.`createTime`, 'updateTime', a.`updateTime`, 'isActive', a.`isActive`, 'firstName', a.`firstName`, 'lastName', a.`lastName`, 'email', a.`email`, 'personalWebsite', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('websiteId', b.websiteId, 'URL', b.`URL`, 'description', b.`description`)),']') AS JSON) FROM personalWebsite b WHERE a.userId = b.userId), 'joinedEvent', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('joinedEventId', c.joinedEventId, 'eventId', c.eventId, 'title', d.`title`)), ']') AS JSON) FROM joinedEvent c, event d WHERE a.userId = c.userId AND c.eventId = d.eventId), 'artwork', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('artworkId', e.artworkId, 'name', e.name, 'URL', e.`URL`, 'type', e.`type`, 'description', e.`description`)), ']') AS JSON) FROM artwork e WHERE a.userId = e.userId)) AS result FROM user a WHERE a.appleId = \"" + appleId + "\";";
  //var sql = "SELECT json_object('userId', a.userId, 'appleId', a.`appleId`, 'walletAddress', a.`walletAddress`, 'personInfo', a.`personInfo`, 'createTime', a.`createTime`, 'updateTime', a.`updateTime`, 'isActive', a.`isActive`, 'firstName', a.`firstName`, 'lastName', a.`lastName`, 'email', a.`email`, 'personalWebsite', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('websiteId', b.websiteId, 'URL', b.`URL`, 'description', b.`description`)),']') AS JSON) FROM personalWebsite b WHERE a.userId = b.userId), 'joinedEvent', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('joinedEventId', c.joinedEventId, 'eventId', c.eventId, 'title', d.`title`)), ']') AS JSON) FROM joinedEvent c, event d WHERE a.userId = c.userId AND c.eventId = d.eventId), 'artwork', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('artworkId', e.artworkId, 'name', e.name, 'URL', e.`URL`, 'type', e.`type`, 'description', e.`description`, 'extraInfo', e.`extraInfo`, 'createTime', e.`createTime`, 'updateTime', e.`updateTime`)), ']') AS JSON) FROM artwork e WHERE a.userId = e.userId)) AS result FROM user a WHERE a.appleId = \"" + appleId + "\";";
  //var sql = "SELECT json_object('userId', a.userId, 'appleId', a.`appleId`, 'walletAddress', a.`walletAddress`, 'personInfo', a.`personInfo`, 'createTime', a.`createTime`, 'updateTime', a.`updateTime`, 'isActive', a.`isActive`, 'firstName', a.`firstName`, 'lastName', a.`lastName`, 'email', a.`email`, 'personalWebsite', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('websiteId', b.websiteId, 'URL', b.`URL`, 'description', b.`description`)),']') AS JSON) FROM personalWebsite b WHERE a.userId = b.userId AND b.isActive = 1), 'joinedEvent', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('joinedEventId', c.joinedEventId, 'eventId', c.eventId, 'title', d.`title`)), ']') AS JSON) FROM joinedEvent c, event d WHERE a.userId = c.userId AND c.eventId = d.eventId), 'artwork', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('artworkId', e.artworkId, 'name', e.name, 'URL', e.`URL`, 'type', e.`type`, 'description', e.`description`, 'extraInfo', e.`extraInfo`, 'createTime', e.`createTime`, 'updateTime', e.`updateTime`)), ']') AS JSON) FROM artwork e WHERE a.userId = e.userId)) AS result FROM user a WHERE a.appleId = \"" + appleId + "\";";
  //var sql = "SELECT json_object('userId', a.userId, 'appleId', a.`appleId`, 'personInfo', a.`personInfo`, 'createTime', a.`createTime`, 'updateTime', a.`updateTime`, 'isActive', a.`isActive`, 'firstName', a.`firstName`, 'lastName', a.`lastName`, 'email', a.`email`, 'personalWebsite', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('websiteId', b.websiteId, 'URL', b.`URL`, 'description', b.`description`)),']') AS JSON) FROM personalWebsite b WHERE a.userId = b.userId AND b.isActive = 1), 'joinedEvent', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('joinedEventId', c.joinedEventId, 'eventId', c.eventId, 'title', d.`title`)), ']') AS JSON) FROM joinedEvent c, event d WHERE a.userId = c.userId AND c.eventId = d.eventId), 'artwork', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('artworkId', e.artworkId, 'name', e.`name`, 'URL', e.`URL`, 'type', e.`type`, 'description', e.`description`, 'extraInfo', e.`extraInfo`, 'createTime', e.`createTime`, 'updateTime', e.`updateTime`)), ']') AS JSON) FROM artwork e WHERE a.userId = e.userId), 'walletAddress', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('walletAddress', f.`walletAddress`)),']') AS JSON) FROM walletAddress f WHERE a.appleId = f.appleId))AS result FROM user a WHERE a.appleId = \"" + appleId + "\";";
  var sql = "SELECT json_object('userId', a.userId, 'appleId', a.`appleId`, 'personInfo', a.`personInfo`, 'createTime', a.`createTime`, 'updateTime', a.`updateTime`, 'isActive', a.`isActive`, 'firstName', a.`firstName`, 'lastName', a.`lastName`, 'email', a.`email`, 'personalWebsite', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('websiteId', b.websiteId, 'URL', b.`URL`, 'description', b.`description`)),']') AS JSON) FROM personalWebsite b WHERE a.userId = b.userId AND b.isActive = 1), 'joinedEvent', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('joinedEventId', c.joinedEventId, 'eventId', c.eventId, 'title', d.`title`)), ']') AS JSON) FROM joinedEvent c, event d WHERE a.userId = c.userId AND c.eventId = d.eventId), 'artwork', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('artworkId', e.artworkId, 'eventId', e.`eventId`, 'URL', e.`URL`, 'type', e.`type`, 'artistMessage', e.`artistMessage`, 'extraInfo', e.`extraInfo`, 'createTime', e.`createTime`, 'updateTime', e.`updateTime`)), ']') AS JSON) FROM artwork e WHERE e.ifMinted = 0 AND a.userId = e.userId), 'walletAddress', (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('walletAddress', f.`walletAddress`)),']') AS JSON) FROM walletAddress f WHERE a.appleId = f.appleId))AS result FROM user a WHERE a.appleId = \"" + appleId + "\";";
  
  logger.log('debug', '%s %s sql: %s', 'User', 'getUser', sql);

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

  logger.log('info', '%s %s', 'User', 'createUser');

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

  logger.log('debug', '%s %s sql: %s', 'User', 'createUser', sql);

  // update results on DB
  const result = await db.query(
    sql
  );

  // will return SQL error if fails, otherwise return the following succesful msg
  let message = 'Records added susccessfully';
  logger.log('info', '%s %s Records added susccessfully', 'User', 'createUser');
  return {message};
}

/* update user */
async function updateUser(appleId, userRecord){

  logger.log('info', '%s %s %s', 'User', 'updateUser', appleId);

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  // censor contents (personInfo, firstName, lastName )
  let validResult = await validate.validateContent(userRecord.personInfo);
  if (!validResult) {
    logger.log('error', '%s %s %s personInfo contains explicit contents: %s', 'User', 'updateUser', appleId, userRecord.personInfo);
    return ("personInfo contains explicit contents");
  }
  validResult = await validate.validateContent(userRecord.firstName);
  if (!validResult) {
    logger.log('error', '%s %s %s firstName contains explicit contents: %s', 'User', 'updateUser', appleId, userRecord.firstName);
    return ("Input contains explicit contents");
  }
  validResult = await validate.validateContent(userRecord.lastName);
  if (!validResult) {
    logger.log('error', '%s %s %s lastName contains explicit contents: %s', 'User', 'updateUser', appleId, userRecord.lastName);
    return ("Input contains explicit contents");
  }

  //sql = 'UPDATE user SET walletAddress = "' + userRecord.walletAddress + '", personInfo = "' + userRecord.personInfo + '", createTime = "' + userRecord.createTime + '", updateTime = "' + userRecord.updateTime + '", isActive = ' + userRecord.isActive + ', firstName = "' + userRecord.firstName + '", lastName = "' + userRecord.lastName + '", email = "' + userRecord.email + '", refreshToken = "' + userRecord.refreshToken + '", validToken = ' + userRecord.validToken + ' WHERE appleId = "' + appleId + '";';

  sql = 'UPDATE user SET updateTime = "' + currentTimeSql + '"';

  if (!(userRecord.walletAddress == null)){
    sql = sql + ', walletAddress = "' + userRecord.walletAddress + '"';
  }

  if (!(userRecord.personInfo == null)){
    sql = sql + ', personInfo = "' + userRecord.personInfo + '"';
  }

  if (!(userRecord.isActive == null)){
    sql = sql + ', isActive = ' + userRecord.isActive;
  }

  if (!(userRecord.firstName == null)){
    sql = sql + ', firstName = "' + userRecord.firstName + '"';
  }

  if (!(userRecord.lastName == null)){
    sql = sql + ', lastName = "' + userRecord.lastName + '"';
  }

  if (!(userRecord.email == null)){
    sql = sql + ', email = "' + userRecord.email + '"';
  }

  if (!(userRecord.refreshToken == null)){
    sql = sql + ', refreshToken = "' + userRecord.refreshToken + '"';
  }

  if (!(userRecord.validToken == null)){
    sql = sql + ', validToken = ' + userRecord.validToken;
  }

  sql = sql + ' WHERE appleId = "' + appleId + '";'; 

  logger.log('debug', '%s %s sql: %s', 'User', 'updateUser', sql);

  //console.log("update sql: ", sql);
  const result = await db.query(
    sql
  );

  if (result.affectedRows) {
    logger.log('info', '%s %s %s Record updated successfully', 'User', 'updateUser', appleId);
    message = 'Record updated successfully';
  }

  return {message};
}


/* update user personal info */
async function updateUserPersonalInfo(appleId, userRecord){

  logger.log('info', '%s %s %s', 'User', 'updateUserPersonalInfo', appleId);

  // censor contents (personInfo)
  let validResult = await validate.validateContent(userRecord.personInfo);
  if (!validResult) {
    logger.log('error', '%s %s %s personInfo contains explicit contents: %s', 'User', 'updateUserPersonalInfo', appleId, userRecord.personInfo);
    return ("Input contains explicit contents");
  }

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  sql = 'UPDATE user SET personInfo = "' + userRecord.personInfo + '", updateTime = "' + currentTimeSql + '" WHERE appleId = "' + appleId + '";';
  logger.log('debug', '%s %s sql: %s', 'User', 'updateUserPersonalInfo', sql);
  const result = await db.query(
    sql
  );


  if (result.affectedRows) {
    logger.log('info', '%s %s %s Record updated successfully', 'User', 'updateUserPersonalInfo', appleId);
    message = 'Record updated successfully';
  }

  return {message};
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  updateUserPersonalInfo
};
