const db = require('../db');
const helper = require('../helper');
const path = require('path');
const logger = require("../logger");
const moment = require('moment');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

async function updateWallet(appleId, walletAddress){

	// check if appleId/walletAddress pair already exist
    var sqlCheck = 'SELECT COUNT(*) AS if_exist FROM walletAddress WHERE appleId = "' + appleId + '" AND walletAddress = "' + walletAddress + '";';
    console.log("check: ", sqlCheck);
    const resultCheck = await db.query(
        sqlCheck
    );

    const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    // if appleId/walletAddress pair already exist
    if (resultCheck[0].if_exist){
        var sqlUpdate = 'UPDATE walletAddress SET updateTime = "' + currentTimeSql + '" WHERE appleId = "' + appleId + '" AND walletAddress = "' + walletAddress + '";';
        console.log("sqlUpdate: ", sqlUpdate);

        const resultUpdate = await db.query(
            sqlUpdate
        );

        let message = 'Record updated successfully';
        return {message};
        
    // if appleId/walletAddress pair doesn't exist
    }else{
        var sqlCreate = 'INSERT INTO walletAddress (appleId, walletAddress, createTime, updateTime) VALUES ("' + appleId + '", "' + walletAddress + '", "' + currentTimeSql + '", "' + currentTimeSql + '");'
        console.log("sqlCreate: ", sqlCreate);
        const resultCreate = await db.query(
            sqlCreate
        );
        let message = 'Record created successfully';
        return {message};
    }

}

module.exports = {
    updateWallet
};