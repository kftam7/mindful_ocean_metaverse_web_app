const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get JoinedEvent */
async function getJoinedEvent(appleId){

    logger.log('info', '%s %s %s', 'JoinedEvent', 'getJoinedEvent', appleId);

    if (appleId){
        var rows = await db.query(
        `SELECT a.eventId FROM joinedEvent a, user b WHERE a.userId=b.userId AND b.appleId = ? ORDER by a.eventId ASC;`, [appleId]
      );
    }else{
        var rows = await db.query(
        `SELECT a.joinedEventId, a.userId, a.eventId FROM joinedEvent a, user b WHERE a.userId=b.userId ORDER by a.eventId ASC;`
      );
    }
  
  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create JoinedEvent */
async function createJoinedEvent(joinedEventRecord){

  logger.log('info', '%s %s', 'JoinedEvent', 'createJoinedEvent');

  // construct the SQL statement
  var sql = 'INSERT INTO joinedEvent (userId, eventId) VALUES ';

  for (var i =0; i < joinedEventRecord.length; i++){

    // combine into 1 single SQL
    if (i == (joinedEventRecord.length-1)){
      sql = sql + '("' + joinedEventRecord[i].userId + '", "' + joinedEventRecord[i].eventId + '");';
    }else{
      sql = sql + '("' + joinedEventRecord[i].userId + '", "' + joinedEventRecord[i].eventId + '"),';
    }

  }

  logger.log('debug', '%s %s sql: %s', 'JoinedEvent', 'createJoinedEvent', sql);

  // update results on DB
  const result = await db.query(
    sql
  );

  // will return SQL error if fails, otherwise return the following succesful msg
  let message = 'Records added susccessfully';
  logger.log('info', '%s %s Records added susccessfully', 'JoinedEvent', 'createJoinedEvent');
  return {message};
  
}

/* update JoinedEvent */
async function updateJoinedEvent(joinedEventId, updateJoinedEvent){

  logger.log('info', '%s %s %s', 'JoinedEvent', 'updateJoinedEvent', joinedEventId);
  
  sql = 'UPDATE joinedEvent SET userId = "' + updateJoinedEvent.userId + '", eventId = "' + updateJoinedEvent.eventId + '" WHERE joinedEventId = "' + joinedEventId + '";';

  logger.log('debug', '%s %s sql: %s', 'JoinedEvent', 'updateJoinedEvent', sql);
  
  const result = await db.query(
    sql
  );

  if (result.affectedRows) {
    logger.log('info', '%s %s %s Record updated successfully', 'JoinedEvent', 'updateJoinedEvent', joinedEventId);
    message = 'Record updated successfully';
  }

  return {message};
  
}

module.exports = {
  getJoinedEvent,
  createJoinedEvent,
  updateJoinedEvent
};
