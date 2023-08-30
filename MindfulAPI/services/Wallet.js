const db = require('../db');
const helper = require('../helper');
const path = require('path');
const logger = require("../logger");
const moment = require('moment');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

async function updateWallet(appleId, walletAddress){

    logger.log('info', '%s %s %s %s', 'Wallet', 'updateWallet', appleId, walletAddress);

	// check if walletAddress already exist
    var sqlCheck = 'SELECT appleId FROM walletAddress WHERE walletAddress = "' + walletAddress + '";';
    const resultCheck = await db.query(
        sqlCheck
    );

    logger.log('debug', '%s %s sqlCheck: %s', 'Wallet', 'updateWallet', sqlCheck);

    const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    // if walletAddress already exist
    if (resultCheck.length){

        // if the same appleId is found
        if(resultCheck[0].appleId == appleId){
            var sqlUpdate = 'UPDATE walletAddress SET updateTime = "' + currentTimeSql + '" WHERE appleId = "' + appleId + '" AND walletAddress = "' + walletAddress + '";';
            logger.log('debug', '%s %s sqlUpdate: %s', 'Wallet', 'updateWallet', sqlUpdate);
            const resultUpdate = await db.query(
                sqlUpdate
            );
            logger.log('info', '%s %s %s %s Record updated successfully', 'Wallet', 'updateWallet', appleId, walletAddress);
            let message = 'Record updated successfully';
            return {message};

        // if different appleId is found, that wallet address can't be used 
        }else{
            logger.log('info', '%s %s %s %s Walletaddress already taken by another appleId', 'Wallet', 'updateWallet', appleId, walletAddress);
            return('Walletaddress already taken by another appleId');
        }
        
    // if walletAddress doesn't exist
    }else{
        var sqlCreate = 'INSERT INTO walletAddress (appleId, walletAddress, createTime, updateTime) VALUES ("' + appleId + '", "' + walletAddress + '", "' + currentTimeSql + '", "' + currentTimeSql + '");'
        logger.log('debug', '%s %s sqlCreate: %s', 'Wallet', 'updateWallet', sqlCreate);
        const resultCreate = await db.query(
            sqlCreate
        );
        logger.log('info', '%s %s %s %s Record created successfully', 'Wallet', 'updateWallet', appleId, walletAddress);
        let message = 'Record created successfully';
        return {message};
    }

}

module.exports = {
    updateWallet
};