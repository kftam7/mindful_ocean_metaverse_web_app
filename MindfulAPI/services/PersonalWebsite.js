const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
const fsPromises = require('fs/promises')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


/* get PersonalWebsite */
async function getPersonalWebsite(appleId){

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
  
  /*
  // check URL & description
  try {
    //const contents = await fsPromises.readFile("filter/explicit_url", 'utf-8')
    const contents = await fsPromises.readFile(process.env.BlackListFile, 'utf-8');
    //console.log(personalWebsiteRecord.URL);
    if (contents.includes(personalWebsiteRecord.URL)){
      return ("Error 001: URL contains explicit content");
    }
    if (contents.includes(personalWebsiteRecord.description)){
      return ("Error 002: Description contains explicit content");
    }
  } catch (err) {
    console.error(err)
  }
  */

  // get the userId
  var sqlUserId = 'SELECT userId FROM user WHERE appleId LIKE "' + appleId + '"'; 

  const userIdResult = await db.query(
    sqlUserId
  );

  if (!userIdResult.length){
    let message = 'appleId doesn\'t exist';
    return {message};
  }else{
    // construct the SQL statement
    var sql = 'INSERT INTO personalWebsite (userId, URL, description, isActive) VALUES ("' + userIdResult[0].userId + '", "' + personalWebsiteRecord.URL + '", "' + personalWebsiteRecord.description + '", 1);' ;
    console.log(sql);

    // update results on DB
    const result = await db.query(
      sql
    );

    // will return SQL error if fails, otherwise return the following succesful msg
    let message = 'Records added susccessfully';
    return {message};
  }
  
}

/* update PersonalWebsite */
async function updatePersonalWebsite(websiteId, personalWebsiteRecord){

  /*
  // check URL & description
  try {
    //const contents = await fsPromises.readFile("filter/explicit_url", 'utf-8')
    const contents = await fsPromises.readFile(process.env.BlackListFile, 'utf-8');
    //console.log(personalWebsiteRecord.URL);
    if (contents.includes(personalWebsiteRecord.URL)){
      return ("Error 001: URL contains explicit content");
    }
    if (contents.includes(personalWebsiteRecord.description)){
      return ("Error 002: Description contains explicit content");
    }
  } catch (err) {
    console.error(err)
  }
  */

  //sql = 'UPDATE personalWebsite SET userId = "' + personalWebsiteRecord.userId + '", URL = "' + personalWebsiteRecord.URL + '", description = "' + personalWebsiteRecord.description + '" WHERE websiteId = "' + websiteId + '";';
  sql = 'UPDATE personalWebsite SET URL = "' + personalWebsiteRecord.URL + '", description = "' + personalWebsiteRecord.description + '", isActive = "' + personalWebsiteRecord.isActive + '" WHERE websiteId = "' + websiteId + '";';
  
  const result = await db.query(
    sql
  );

  if (result.affectedRows) {
    message = 'Record updated successfully';
  }

  return {message};
  
}


module.exports = {
  getPersonalWebsite,
  createPersonalWebsite,
  updatePersonalWebsite
};
