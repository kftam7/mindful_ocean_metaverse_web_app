const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get Artwork */
async function getArtwork(appleId){

    if (appleId){
        var rows = await db.query(
        `SELECT a.artworkId, a.name, a.URL, a.description FROM artwork a, user b WHERE a.userId=b.userId AND b.appleId = ? ORDER by artworkId ASC;`, [appleId]
      );
    }else{
        var rows = await db.query(
        `SELECT a.artworkId, a.name, a.URL, a.description FROM artwork a, user b WHERE a.userId=b.userId ORDER by artworkId ASC;`
      );
    }
  
  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

/* create Artwork */
async function createArtwork(artworkRecord){

  // construct the SQL statement
  var sql = 'INSERT INTO artwork (userId, name, URL, description) VALUES ';

  for (var i =0; i < artworkRecord.length; i++){

    // combine into 1 single SQL
    if (i == (artworkRecord.length-1)){
      sql = sql + '("' + artworkRecord[i].userId + '", "' + artworkRecord[i].name + '", "' + artworkRecord[i].URL + '", "' + artworkRecord[i].description + '");';
    }else{
      sql = sql + '("' + artworkRecord[i].userId + '", "' + artworkRecord[i].name + '", "' + artworkRecord[i].URL + '", "' + artworkRecord[i].description + '"),';
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

/* update Artwork */
async function updateArtwork(artworkId, artworkRecord){

  sql = 'UPDATE artwork SET userId = "' + artworkRecord.userId + '", name = "' + artworkRecord.name + '", URL = "' + artworkRecord.URL + '", description = "' + artworkRecord.description + '" WHERE artworkId = "' + artworkId + '";';

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
  getArtwork,
  createArtwork,
  updateArtwork
};
