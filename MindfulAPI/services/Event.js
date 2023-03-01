const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get Event */
async function getEvent(eventId, title, startTime, endTime){

    if (eventId == null){
      eventId = "%";
    }
    if (title == null){
      title = "%";
    }
    if (startTime == null){
      startTime = "2000-01-01 00:00:00";
    }
    if (endTime == null){
      endTime = "2050-01-01 00:00:00";
    }

    var rows = await db.query(
      `SELECT * FROM event WHERE eventId LIKE ? AND title LIKE ? AND startTime >= ? AND endTime <= ?`, [eventId, title, startTime, endTime]
      //sql
    );

  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create Event */
async function createEvent(eventRecord){

  // construct the SQL statement
  var sql = 'INSERT INTO event (title, paragraphText, image, hyperlink, timerDescription, startTime, endTime) VALUES ';

  for (var i =0; i < eventRecord.length; i++){

    // combine into 1 single SQL
    if (i == (eventRecord.length-1)){
      sql = sql + '("' + eventRecord[i].title + '", "' + eventRecord[i].paragraphText + '", "' + eventRecord[i].image + '", "' + eventRecord[i].hyperlink + '", "' + eventRecord[i].timerDescription + '", "' + eventRecord[i].startTime + '", "' + eventRecord[i].endTime + '");';
    }else{
      sql = sql + '("' + eventRecord[i].title + '", "' + eventRecord[i].paragraphText + '", "' + eventRecord[i].image + '", "' + eventRecord[i].hyperlink + '", "' + eventRecord[i].timerDescription + '", "' + eventRecord[i].startTime + '", "' + eventRecord[i].endTime + '"),';
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
async function updateEvent(id, eventRecord){

  sql = 'UPDATE event SET title= "' + eventRecord.title + '", paragraphText = "' + eventRecord.paragraphText + '", hyperlink = "' + eventRecord.hyperlink + '", timerDescription = "' + eventRecord.timerDescription + '", startTime = "' + eventRecord.startTime + '", endTime = "' + eventRecord.endTime + '" WHERE eventId = ' + id + ';';

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
  getEvent,
  createEvent,
  updateEvent
};
