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

  // update results on DB
  const result = await db.query(
    sql
  );

  // will return SQL error if fails, otherwise return the following succesful msg
  let message = 'Records added susccessfully';
  return {message};
  
}

/* update JoinedEvent */
async function updateJoinedEvent(joinedEventId, joinedEventRecord){

  sql = 'UPDATE joinedEvent SET userId = "' + joinedEventRecord.userId + '", eventId = "' + joinedEventRecord.eventId + '" WHERE joinedEventId = "' + joinedEventId + '";';

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
  getJoinedEvent,
  createJoinedEvent,
  updateJoinedEvent
};
