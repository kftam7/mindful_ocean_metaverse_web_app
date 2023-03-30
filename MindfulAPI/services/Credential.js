const db = require('../db');
const helper = require('../helper');
const config = require('../config');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* get crypto */
async function getCrendential(login, credential){

  // check if login exist
  const ifExist = await db.query(
    'SELECT count(*) as ifExist FROM CMSUser WHERE name LIKE "' + login + '" AND credential LIKE "' + credential + '" AND isActive = 1'
  );
  if (!ifExist[0].ifExist){
    logger.log('error', '%s %s Login doesn\'t exist', login, 'getCrypto');
    let message = 'Login doesn\'t exist or credential doesn\'t match or is not active';
    return {message};
  }else{
    var rows = await db.query(
      'SELECT isAdmin FROM CMSUser WHERE name LIKE "' + login + '"'
    );
  }

  logger.log('info', '%s %s %s', login, credential, 'getCrypto');

  const data = helper.emptyOrRows(rows);
  const meta = "1";

  return {
    data,
    meta
  }
}

module.exports = {
		getCrendential
};