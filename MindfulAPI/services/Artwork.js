const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get Event */
async function getEvent(){

    var rows = await db.query(
      'SELECT * FROM event'
    );  


  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create Event */
/*
async function createEvent(login, cryptoRecord){

  // check if login exist
  const ifExist = await db.query(
    'SELECT count(*) as ifExist FROM credential WHERE name LIKE "' + login + '"'
  );
  if (!ifExist[0].ifExist){
    logger.log('error', '%s %s Login doesn\'t exist', login, 'createCrypto');
    let message = 'Login doesn\'t exist';
    return {message};
  }

  logger.log('info', '%s %s', login, 'createCrypto');

  // construct the SQL statement
  var sql = 'INSERT INTO crypto (user, sendTime, chain, tokenAddress, walletAddress, tokenNo, gasPrice, gasLimit, note, txnHash, success) VALUES ';

  for (var i =0; i < cryptoRecord.length; i++){

    // combine into 1 single SQL
    if (i == (cryptoRecord.length-1)){
      sql = sql + '("' + cryptoRecord[i].user + '", "' + cryptoRecord[i].sendTime + '", "' + cryptoRecord[i].chain + '", "' + cryptoRecord[i].tokenAddress + '", "' + cryptoRecord[i].walletAddress + '", ' + cryptoRecord[i].tokenNo + ', ' + cryptoRecord[i].gasPrice + ', ' + cryptoRecord[i].gasLimit + ', "' + cryptoRecord[i].note + '", "' + cryptoRecord[i].txnHash + '", ' + cryptoRecord[i].success + ')';
    }else{
      sql = sql + '("' + cryptoRecord[i].user + '", "' + cryptoRecord[i].sendTime + '", "' + cryptoRecord[i].chain + '", "' + cryptoRecord[i].tokenAddress + '", "' + cryptoRecord[i].walletAddress + '", ' + cryptoRecord[i].tokenNo + ', ' + cryptoRecord[i].gasPrice + ', ' + cryptoRecord[i].gasLimit + ', "' + cryptoRecord[i].note + '", "' + cryptoRecord[i].txnHash + '", ' + cryptoRecord[i].success + '),';
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
*/

/* update Event */
/*
async function updateEvent(key, email){

  // check if key exist
  const ifExist = await db.query(
    'SELECT count(*) as ifExist FROM email WHERE uniqueKey ="' + key + '"'
  );
  if (!ifExist[0].ifExist){
    logger.log('error', '%s %s Key doesn\'t exist', key, 'updateCrypto');
    let message = 'Key doesn\'t exist';
    return {message};
  }
  
  logger.log('info', '%s %s', key, 'updateCrypto');

  now = moment().format("YYYY-MM-DD HH:mm:ss");

  const result = await db.query(
    'UPDATE email SET walletAddress= "' + email.walletAddress + '", whenClicked = "' + now + '", linkClicked = 1' + ' WHERE uniqueKey="' + key + '"'
  );

  if (result.affectedRows) {
    message = 'Wallet address updated successfully';
  }

  return {message};
}
*/


module.exports = {
  getEvent
  /*
  createEvent,
  updateEvent
  */
};
