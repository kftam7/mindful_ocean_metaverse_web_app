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

  logger.log('info', '%s %s %s', 'Credential', 'getCrendential', login);

  // check if login exist
  const ifExist = await db.query(
    'SELECT count(*) as ifExist FROM CMSUser WHERE name LIKE "' + login + '" AND credential LIKE "' + credential + '" AND isActive = 1'
  );
  if (!ifExist[0].ifExist){
    logger.log('error', '%s %s %s Login doesn\'t exist or credential doesn\'t match or is not active or doesn\'t have admin right', 'Credential', 'getCrendential', login);
    let message = 'Login doesn\'t exist or credential doesn\'t match or is not active or doesn\'t have admin right';
    return {message};
  }else{
    var rows = await db.query(
      'SELECT isAdmin FROM CMSUser WHERE name LIKE "' + login + '"'
    );
  }

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