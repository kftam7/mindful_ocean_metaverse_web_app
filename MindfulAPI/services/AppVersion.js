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

  // construct the SQL statement
  var sql = 'INSERT INTO appVersion (versionNo, versionName, releaseDate, expireDate, description) VALUES ';

  for (var i =0; i < appVersionRecord.length; i++){

    // combine into 1 single SQL
    if (i == (appVersionRecord.length-1)){
      sql = sql + '("' + appVersionRecord[i].versionNo + '", "' + appVersionRecord[i].versionName + '", "' + appVersionRecord[i].releaseDate + '", "' + appVersionRecord[i].expireDate + '", "' + appVersionRecord[i].description + '");';
    }else{
      sql = sql + '("' + appVersionRecord[i].versionNo + '", "' + appVersionRecord[i].versionName + '", "' + appVersionRecord[i].releaseDate + '", "' + appVersionRecord[i].expireDate + '", "' + appVersionRecord[i].description + '"),';
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
async function updateAppVersion(version, appVersionRecord){

  sql = 'UPDATE appVersion SET versionName = "' + appVersionRecord.versionName + '", releaseDate = "' + appVersionRecord.releaseDate + '", expireDate = "' + appVersionRecord.expireDate + '", description = "' + appVersionRecord.description  + '" WHERE versionNo = "' + version + '";';

  console.log(sql);
  
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
