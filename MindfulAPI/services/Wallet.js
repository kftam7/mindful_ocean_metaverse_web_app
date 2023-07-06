const db = require('../db');
const helper = require('../helper');
const path = require('path');
const logger = require("../logger");
const moment = require('moment');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

async function updateWallet(appleId, walletAddress){

	// check if walletAddress already exist
    //var sqlCheck = 'SELECT COUNT(*) AS if_exist FROM walletAddress WHERE appleId = "' + appleId + '" AND walletAddress = "' + walletAddress + '";';
    var sqlCheck = 'SELECT appleId FROM walletAddress WHERE walletAddress = "' + walletAddress + '";';
    console.log("check: ", sqlCheck);
    const resultCheck = await db.query(
        sqlCheck
    );

    const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    // if walletAddress already exist
    //if (resultCheck[0].appleId){
    if (resultCheck.length){

        // if the same appleId is found
        if(resultCheck[0].appleId == appleId){
            var sqlUpdate = 'UPDATE walletAddress SET updateTime = "' + currentTimeSql + '" WHERE appleId = "' + appleId + '" AND walletAddress = "' + walletAddress + '";';
            const resultUpdate = await db.query(
                sqlUpdate
            );
            let message = 'Record updated successfully';
            return {message};

        // if different appleId is found, that wallet address can't be used 
        }else{
            //let message = 'Walletaddress already taken by another appleId';
            //return {message};
            //throw new Error("Walletaddress already taken by another appleId")
            return('Walletaddress already taken by another appleId');
        }
        
    // if walletAddress doesn't exist
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