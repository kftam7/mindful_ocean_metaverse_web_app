const db = require('../db');
const helper = require('../helper');
const path = require('path');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//const fs = require('fs');
//const config = fs.readFileSync('./appleConfig.json');
//const AppleAuth = require('apple-auth');
//const bodyParser = require('body-parser');
const fs = require('fs');
const config = fs.readFileSync('./appleConfig.json');
const AppleAuth = require('apple-auth');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

async function signin(req){

    // check if appleid is wrong
    const idToken = jwt.decode(req.body.id_token);
    if (!(idToken.sub == req.params.appleId)){
        logger.log('error', '%s %s appleId doesn\'t match %s %s', 'Signin', 'signin', idToken.sub, req.params.appleId);
        return("appleId doesn't match");
    }

    logger.log('info', '%s %s %s', 'AppVersion', 'createAppVersion', req.params.appleId);

    // check if user already exist
    var sqlCheck = 'SELECT COUNT(*) AS if_exist FROM user WHERE appleId = "' + req.params.appleId +'"';
    const resultCheck = await db.query(
        sqlCheck
    );
    logger.log('debug', '%s %s sqlCheck: %s', 'Signin', 'signin', sqlCheck);

    const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    // if appleId already exist
    if (resultCheck[0].if_exist){

        // need to check if email, firstName, lastName exists
        var sqlUpdate = 'UPDATE user SET updateTime = "'+ currentTimeSql + '"'; 
        if (req.body.name.firstName){
            sqlUpdate = sqlUpdate + ', firstName = "' + req.body.name.firstName + '"';
        }
        if (req.body.name.lastName){
            sqlUpdate = sqlUpdate + ', lastName = "' + req.body.name.lastName + '"';
        }
        if (req.body.email){
            sqlUpdate = sqlUpdate + ', email = "' + req.body.email + '"';
        }
        sqlUpdate = sqlUpdate + ' WHERE appleId = "' + req.params.appleId + '";';
  
        logger.log('debug', '%s %s sqlUpdate: %s', 'Signin', 'signin', sqlUpdate);
        //console.log(sqlUpdate);

        const resultUpdate = await db.query(
            sqlUpdate
        );

        let message = 'Record updated successfully';
        logger.log('info', '%s %s %s Record updated successfully', 'AppVersion', 'createAppVersion', req.params.appleId);
        return {message};
        
    // if appleId doesn't exist
    }else{
        var sqlCreate = 'INSERT INTO user (appleId, firstName, lastName, email, refreshToken, createTime, updateTime, isActive) VALUES ("' + req.params.appleId + '", "' + req.body.name.firstName + '", "' + req.body.name.lastName + '", "' + req.body.email + '", "' + req.body.refresh_token + '", "' + currentTimeSql + '", "' + currentTimeSql + '", ' + '1)';
        console.log(sqlCreate);
        const resultCreate = await db.query(
            sqlCreate
        );

        logger.log('debug', '%s %s sqlCreate: %s', 'Signin', 'signin', sqlCreate);

        let message = 'Record created successfully';
        logger.log('info', '%s %s %s Record created successfully', 'AppVersion', 'createAppVersion', req.params.appleId);
        return {message};
    }

}

module.exports = {
    signin
};
