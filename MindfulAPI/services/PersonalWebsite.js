const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
const fsPromises = require('fs/promises')
const validate = require("../utils/validate");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


/* get PersonalWebsite */
async function getPersonalWebsite(appleId){

  logger.log('info', '%s %s %s', 'PersonalWebsite', 'getPersonalWebsite', appleId);

    if (appleId){
        var rows = await db.query(
        `SELECT a.websiteId, a.URL, a.description FROM personalWebsite a, user b WHERE a.userId=b.userId AND a.isActive =1 AND b.appleId = ? ORDER by websiteId ASC;`, [appleId]
      );
    }else{
        var rows = await db.query(
        `SELECT b.appleId , a.websiteId, a.userId, a.URL, a.description, a.isActive FROM personalWebsite a, user b WHERE a.userId=b.userId ORDER by websiteId ASC;`
      );
    }
  
  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create PersonalWebsite */
async function createPersonalWebsite(appleId, personalWebsiteRecord){

  logger.log('info', '%s %s %s', 'PersonalWebsite', 'createPersonalWebsite', appleId);
  
  // censor contents (URL, description)
  let validResult = await validate.validateURL(personalWebsiteRecord.URL);
  if (!validResult) {
    logger.log('error', '%s %s %s URL contains explicit contents: %s', 'PersonalWebsite', 'createPersonalWebsite', appleId, personalWebsiteRecord.URL);
    return ("URL contains explicit contents");
  }
  validResult = await validate.validateContent(personalWebsiteRecord.description);
  if (!validResult) {
    logger.log('error', '%s %s %s Description contains explicit contents: %s', 'PersonalWebsite', 'createPersonalWebsite', appleId, personalWebsiteRecord.description);
    return ("Description contains explicit contents");
  }  

  // get the userId
  var sqlUserId = 'SELECT userId FROM user WHERE appleId LIKE "' + appleId + '"';
  logger.log('debug', '%s %s %s sqlUserId: %s', 'PersonalWebsite', 'createPersonalWebsite', appleId, sqlUserId);

  const userIdResult = await db.query(
    sqlUserId
  );

  if (!userIdResult.length){
    logger.log('error', '%s %s %s appleId doesn\'t exist', 'PersonalWebsite', 'createPersonalWebsite', appleId);
    let message = 'appleId doesn\'t exist';
    return {message};
  }else{
    // construct the SQL statement
    var sql = 'INSERT INTO personalWebsite (userId, URL, description, isActive) VALUES ("' + userIdResult[0].userId + '", "' + personalWebsiteRecord.URL + '", "' + personalWebsiteRecord.description + '", 1);' ;
    logger.log('debug', '%s %s %s sql: %s', 'PersonalWebsite', 'createPersonalWebsite', appleId, sql);

    // update results on DB
    const result = await db.query(
      sql
    );

    // will return SQL error if fails, otherwise return the following succesful msg
    logger.log('info', '%s %s %s Records added susccessfully', 'PersonalWebsite', 'createPersonalWebsite', appleId);
    let message = 'Records added susccessfully';
    return {message};
  }
  
}

/* update PersonalWebsite */
async function updatePersonalWebsite(websiteId, personalWebsiteRecord){

  logger.log('info', '%s %s %s', 'PersonalWebsite', 'updatePersonalWebsite', websiteId);

  // censor contents (URL, description)
  let validResult = await validate.validateURL(personalWebsiteRecord.URL);
  if (!validResult) {
    logger.log('error', '%s %s %s URL contains explicit contents: %s', 'PersonalWebsite', 'updatePersonalWebsite', websiteId, personalWebsiteRecord.URL);
    return ("URL contains explicit contents");
  }
  validResult = await validate.validateContent(personalWebsiteRecord.description);
  if (!validResult) {
    logger.log('error', '%s %s %s Description contains explicit contents: %s', 'PersonalWebsite', 'updatePersonalWebsite', websiteId, personalWebsiteRecord.description);
    return ("Description contains explicit contents");
  }  
  //sql = 'UPDATE personalWebsite SET userId = "' + personalWebsiteRecord.userId + '", URL = "' + personalWebsiteRecord.URL + '", description = "' + personalWebsiteRecord.description + '" WHERE websiteId = "' + websiteId + '";';
  sql = 'UPDATE personalWebsite SET URL = "' + personalWebsiteRecord.URL + '", description = "' + personalWebsiteRecord.description + '", isActive = "' + personalWebsiteRecord.isActive + '" WHERE websiteId = "' + websiteId + '";';

  logger.log('debug', '%s %s %s sql: %s', 'PersonalWebsite', 'createPersonalWebsite', websiteId, sql);

  const result = await db.query(
    sql
  );

  if (result.affectedRows) {
    logger.log('info', '%s %s %s Records updated susccessfully', 'PersonalWebsite', 'updatePersonalWebsite', websiteId);
    message = 'Record updated successfully';
  }

  return {message};
  
}


module.exports = {
  getPersonalWebsite,
  createPersonalWebsite,
  updatePersonalWebsite
};
