const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get AppVersion */
async function getAppVersion(version){

  logger.log('info', '%s %s', 'AppVersion', 'getAppVersion');

    if (version == "latest"){
        var rows = await db.query(
        `SELECT * FROM appVersion WHERE releaseDate <= now() AND expireDate > now() ORDER BY releaseDate DESC LIMIT 1;`
      );
    }else if(version == "all"){
        var rows = await db.query(
        `SELECT * FROM appVersion ORDER BY releaseDate DESC;`
      );
    }else{
        var rows = await db.query(
        `SELECT * FROM appVersion WHERE versionNo = ?  ORDER by releaseDate DESC;`, [version]
      );
    }
  
  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create AppVersion */
async function createAppVersion(appVersionRecord){

  logger.log('info', '%s %s', 'AppVersion', 'createAppVersion');


  // construct the SQL statement
  var sql = 'INSERT INTO appVersion (versionNo, versionName, releaseDate, expireDate, description, isActive) VALUES ';

  for (var i =0; i < appVersionRecord.length; i++){

    // check if expireDate > releaseDate
    var releaseDate = new Date(appVersionRecord[i].releaseDate);
    var expireDate = new Date(appVersionRecord[i].expireDate);
    if (expireDate.getTime() <= releaseDate.getTime()){
      logger.log('error', '%s %s sql: %s', 'AppVersion', 'createAppVersion', 'Expire Date can\'t be ealier than Release Date');
      let message = 'Expire Date can\'t be ealier than Release Date';
      return {message};
    }

    // combine into 1 single SQL
    if (i == (appVersionRecord.length-1)){
      sql = sql + '("' + appVersionRecord[i].versionNo + '", "' + appVersionRecord[i].versionName + '", "' + appVersionRecord[i].releaseDate + '", "' + appVersionRecord[i].expireDate + '", "' + appVersionRecord[i].description + '", ' + appVersionRecord[i].isActive + ');';
    }else{
      sql = sql + '("' + appVersionRecord[i].versionNo + '", "' + appVersionRecord[i].versionName + '", "' + appVersionRecord[i].releaseDate + '", "' + appVersionRecord[i].expireDate + '", "' + appVersionRecord[i].description + '", ' + appVersionRecord[i].isActive + '),';
    }

  }
  
  logger.log('debug', '%s %s sql: %s', 'AppVersion', 'createAppVersion', sql);
  //console.log(sql);

  // update results on DB
  const result = await db.query(
    sql
  );

  // will return SQL error if fails, otherwise return the following succesful msg
  let message = 'Records added susccessfully';
  return {message};
  
}

/* update Event */
async function updateAppVersion(version, appVersionRecord){

  logger.log('info', '%s %s', 'AppVersion', 'updateAppVersion');

  // check if expireDate > releaseDate
  var releaseDate = new Date(appVersionRecord.releaseDate);
  var expireDate = new Date(appVersionRecord.expireDate);
  if (expireDate.getTime() <= releaseDate.getTime()){
    logger.log('error', '%s %s sql: %s', 'AppVersion', 'updateAppVersion', 'Expire Date can\'t be ealier than Release Date');
    let message = 'Expire Date can\'t be ealier than Release Date';
    return {message};
  }

  sql = 'UPDATE appVersion SET versionName = "' + appVersionRecord.versionName + '", releaseDate = "' + appVersionRecord.releaseDate + '", expireDate = "' + appVersionRecord.expireDate + '", description = "' + appVersionRecord.description+ '", isActive = "' + appVersionRecord.isActive  + '" WHERE versionNo = "' + version + '";';

  logger.log('debug', '%s %s sql: %s', 'AppVersion', 'updateAppVersion', sql);
  //console.log(sql);
  
  const result = await db.query(
    sql
  );

  if (result.affectedRows) {
    message = 'Record updated successfully';
  }

  return {message};
  
}


module.exports = {
  getAppVersion,
  createAppVersion,
  updateAppVersion
};
