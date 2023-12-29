const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
const moment = require('moment');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get Event */
async function getEvent(eventId, title, startTime, endTime){

    const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    logger.log('info', '%s %s', 'Event', 'getEvent');

    if (eventId == null){
      eventId = "%";
    }
    if (title == null){
      title = "%";
    }

    /*
    if (startTime == null){
      startTime = "2000-01-01 00:00:00";
    }
    if (endTime == null){
      endTime = "2050-01-01 00:00:00";
    }
    */

    if (startTime == null && endTime == null){
      var rows = await db.query(
        //`SELECT * FROM event WHERE eventId LIKE ? AND title LIKE ? AND startTime <= ? AND endTime >= ? AND isActive = 1`, [eventId, title, currentTimeSql, currentTimeSql]
        `SELECT * FROM event WHERE eventId LIKE ? AND title LIKE ? AND isActive = 1`, [eventId, title, currentTimeSql, currentTimeSql]
      );
    }else{
      var rows = await db.query(
        `SELECT * FROM event WHERE eventId LIKE ? AND title LIKE ? AND startTime >= ? AND endTime <= ?`, [eventId, title, startTime, endTime]
        //sql
      );
    }

  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create Event */
async function createEvent(eventRecord){

  logger.log('info', '%s %s', 'Event', 'createEvent');

  // construct the SQL statement
  var sql = 'INSERT INTO event (title, titleCN, titleTW, paragraphText, paragraphTextCN, paragraphTextTW, image, hyperlink, timerDescription, timerDescriptionCN, timerDescriptionTW, startTime, endTime, isActive) VALUES ';

  for (var i =0; i < eventRecord.length; i++){

    // combine into 1 single SQL
    if (i == (eventRecord.length-1)){
      sql = sql + '("' + eventRecord[i].title + '", "' + eventRecord[i].titleCN + '", "' + eventRecord[i].titleTW + '", "' + eventRecord[i].paragraphText + '", "' + eventRecord[i].paragraphTextCN + '", "' + eventRecord[i].paragraphTextTW + '", "' + eventRecord[i].image + '", "' + eventRecord[i].hyperlink + '", "' + eventRecord[i].timerDescription + '", "' + eventRecord[i].timerDescriptionCN + '", "' + eventRecord[i].timerDescriptionTW + '", "' + eventRecord[i].startTime + '", "' + eventRecord[i].endTime + '", ' + eventRecord[i].isActive  + ');';
    }else{
      sql = sql + '("' + eventRecord[i].title + '", "' + eventRecord[i].titleCN + '", "' + eventRecord[i].titleTW + '", "' + eventRecord[i].paragraphText + '", "' + eventRecord[i].paragraphTextCN + '", "' + eventRecord[i].paragraphTextTW + '", "' + eventRecord[i].image + '", "' + eventRecord[i].hyperlink + '", "' + eventRecord[i].timerDescription + '", "' + eventRecord[i].timerDescriptionCN + '", "' + eventRecord[i].timerDescriptionTW + '", "' + eventRecord[i].startTime + '", "' + eventRecord[i].endTime + '", ' + eventRecord[i].isActive  + '),';
    }

  }

  logger.log('debug', '%s %s sql: %s', 'Event', 'createEvent', sql);

  // update results on DB
  const result = await db.query(
    sql
  );

  // will return SQL error if fails, otherwise return the following succesful msg
  let message = 'Records added susccessfully';
  logger.log('info', '%s %s Records added susccessfully', 'Event', 'createEvent');
  return {message};
  
}


/* update Event */
async function updateEvent(id, eventRecord){

  logger.log('info', '%s %s id: %s', 'Event', 'updateEvent', id);

  sql = 'UPDATE event SET title= "' + eventRecord.title + '", titleCN = "' + eventRecord.titleCN + '", titleTW = "' + eventRecord.titleTW + '", paragraphText = "' + eventRecord.paragraphText + '", paragraphTextCN = "' + eventRecord.paragraphTextCN  + '", paragraphTextTW = "' + eventRecord.paragraphTextTW + '", image = "' + eventRecord.image + '", hyperlink = "' + eventRecord.hyperlink + '", timerDescription = "' + eventRecord.timerDescription + '", timerDescriptionCN = "' + eventRecord.timerDescriptionCN + '", timerDescriptionTW = "' + eventRecord.timerDescriptionTW + '", startTime = "' + eventRecord.startTime + '", endTime = "' + eventRecord.endTime + '", isActive = ' + eventRecord.isActive + ' WHERE eventId = ' + id + ';';

  logger.log('debug', '%s %s sql: %s', 'Event', 'updateEvent', sql);
  //console.log(sql);
  
  const result = await db.query(
    sql
  );

  if (result.affectedRows) {
    logger.log('info', '%s %s Records updated successfully, id: %s', 'Event', 'updateEvent', id);
    message = 'Record updated successfully';
  }

  return {message};
  
}

module.exports = {
  getEvent,
  createEvent,
  updateEvent
};
