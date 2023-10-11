const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get TandC */
async function getTandC(appleId){

    logger.log('info', '%s %s %s', 'TandC', 'getTandC', appleId);

    var sql = 'SELECT a.agreed, a.createTime, a.updateTime FROM TandC a, user b WHERE a.userId = b.userId AND b.appleId = "' + appleId + '";';
    logger.log('debug', '%s %s %s sql: %s', 'TandC', 'getTandC', appleId, sql);
    const result = await db.query(
        sql
    );

    const data = helper.emptyOrRows(result);

    return {
      data
    }
}

/* update TandC */
async function updateTandC(appleId){

  const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  logger.log('info', '%s %s %s', 'TandC', 'updateTandC', appleId);

  // check if appleId exists
  var sqlCheckUser = 'SELECT userId FROM user WHERE appleId = "' + appleId + '";';
  logger.log('debug', '%s %s %s sql: %s', 'TandC', 'updateTandC', appleId, sqlCheckUser);
  const resultCheckUser = await db.query(
      sqlCheckUser
  );

  // if appleId doesn't exist, return
  if (!resultCheckUser.length){
    logger.log('error', '%s %s %s appleId doesn\'t exist', 'TandC', 'updateTandC', appleId);
    return 'appleId doesn\'t exist'
  }

  // check if record exists
  var sqlCheckRecord = 'SELECT COUNT(*) AS if_exist FROM TandC a, user b WHERE a.userId = b.userId AND b.appleId = "' + appleId + '";';
  logger.log('debug', '%s %s %s sql: %s', 'TandC', 'updateTandC', appleId, sqlCheckRecord);
  const resultCheckRecord = await db.query(
      sqlCheckRecord
  );

  // record exists, update
  if (resultCheckRecord[0].if_exist){
    var sqlUpdateRecord = 'UPDATE TandC SET agreed = 1, updateTime = "' + currentTimeSql + '" WHERE userId = ' + resultCheckUser[0].userId + ';';
    logger.log('debug', '%s %s %s sql: %s', 'TandC', 'updateTandC', appleId, sqlUpdateRecord);

    const resultUpdateRecord = await db.query(
      sqlUpdateRecord
    );

    logger.log('info', '%s %s %s Record updated successfully', 'TandC', 'updateTandC', appleId);
    return 'Record updated successfully' 
  // if record doesn't exist, create
  }else{
    var sqlCreateRecord = 'INSERT INTO TandC (userId, agreed, createTime, updateTime) VALUES (' + resultCheckUser[0].userId + ', ' + '1, ' + '"' + currentTimeSql + '", "' + currentTimeSql + '");';
    logger.log('debug', '%s %s %s sql: %s', 'TandC', 'updateTandC', appleId, sqlCreateRecord);

    const resultCreateRecord = await db.query(
      sqlCreateRecord
    );

    logger.log('info', '%s %s %s Record created successfully', 'TandC', 'updateTandC', appleId);
    return 'Record created successfully' 
  }
}

module.exports = {
  getTandC,
  updateTandC
};
