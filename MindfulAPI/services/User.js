const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get Event */
async function getUser(appleId){

    if (appleId){
      var rows = await db.query(
        `SELECT * FROM user WHERE appleId = ? ORDER by userId ASC;`, [appleId]
        //`SELECT * FROM user ORDER by userId ASC;`
      );
    }else{
      var rows = await db.query(
        `SELECT * FROM user ORDER by userId ASC;`
      );      
    }

  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create User */
async function createUser(userRecord){

  // construct the SQL statement
  var sql = 'INSERT INTO user (appleId, walletAddress, personInfo, createTime, updateTime) VALUES ';

  for (var i =0; i < userRecord.length; i++){

    // combine into 1 single SQL
    if (i == (userRecord.length-1)){
      sql = sql + '("' + userRecord[i].appleId + '", "' + userRecord[i].walletAddress + '", "' + userRecord[i].personInfo + '", "' + userRecord[i].createTime + '", "' + userRecord[i].updateTime + '");';
    }else{
      sql = sql + '("' + userRecord[i].appleId + '", "' + userRecord[i].walletAddress + '", "' + userRecord[i].personInfo + '", "' + userRecord[i].createTime + '", "' + userRecord[i].updateTime + '"),';
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
async function updateUser(appleId, userRecord){

  sql = 'UPDATE user SET walletAddress = "' + userRecord.walletAddress + '", personInfo = "' + userRecord.personInfo + '", createTime = "' + userRecord.createTime + '", updateTime = "' + userRecord.updateTime  + '" WHERE appleId = "' + appleId + '";';
  
  const result = await db.query(
    sql
  );

  if (result.affectedRows) {
    message = 'Record updated successfully';
  }

  return {message};
}



module.exports = {
  getUser,
  createUser,
  updateUser
};
