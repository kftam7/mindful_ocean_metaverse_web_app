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

        // if not 1st time login, don't update 1st & last names, just update email
        var sqlUpdate = 'UPDATE user SET updateTime = "'+ currentTimeSql + '"'; 

        /*
        if (req.body.name.firstName){
            sqlUpdate = sqlUpdate + ', firstName = "' + req.body.name.firstName + '"';
        }
        if (req.body.name.lastName){
            sqlUpdate = sqlUpdate + ', lastName = "' + req.body.name.lastName + '"';
        }
        */

        if (req.body.email){
            sqlUpdate = sqlUpdate + ', email = "' + req.body.email + '"';
        }
        sqlUpdate = sqlUpdate + ' WHERE appleId = "' + req.params.appleId + '";';
  
        logger.log('debug', '%s %s sqlUpdate: %s', 'Signin', 'signin', sqlUpdate);
        //console.log(sqlUpdate);

        const resultUpdate = await db.query(
            sqlUpdate
        );

        // check and return 1st & last name
        var sqlCheck = 'SELECT firstName, lastName FROM user WHERE appleId = "' + req.params.appleId + '";'; 
        const resultCheck = await db.query(
            sqlCheck
        );
        logger.log('debug', '%s %s sqlCheck: %s', 'Signin', 'signin', sqlCheck);

        const data = helper.emptyOrRows(resultCheck);

        let message = 'Record updated successfully';
        logger.log('info', '%s %s %s Record updated successfully', 'Signin', 'Signin', req.params.appleId);

        return {
            data,
            message
        }
        
    // if appleId doesn't exist
    }else{

        // if 1st time login, insert a new record
        var sqlCreate = 'INSERT INTO user (appleId, firstName, lastName, email, refreshToken, createTime, updateTime, isActive) VALUES ("' + req.params.appleId + '", "' + req.body.name.firstName + '", "' + req.body.name.lastName + '", "' + req.body.email + '", "' + req.body.refresh_token + '", "' + currentTimeSql + '", "' + currentTimeSql + '", ' + '1)';
        
        logger.log('debug', '%s %s sqlCreate: %s', 'Signin', 'signin', sqlCreate);

        const resultCreate = await db.query(
            sqlCreate
        );

        // check and return 1st & last name
        var sqlCheck = 'SELECT firstName, lastName FROM user WHERE appleId = "' + req.params.appleId + '";'; 
        const resultCheck = await db.query(
            sqlCheck
        );
        logger.log('debug', '%s %s sqlCheck: %s', 'Signin', 'signin', sqlCheck);

        const data = helper.emptyOrRows(resultCheck);

        let message = 'Record created successfully';
        logger.log('info', '%s %s %s Record created successfully', 'Signin', 'Signin', req.params.appleId);

        return {
            data,
            message
        }
    }

}

async function submitid(req){

    //console.log("appleId: %s", req.params.appleId);
    //console.log("firstName: %s", req.body.name.firstName);
    //console.log("lastName: %s", req.body.name.lastName);
    //console.log("email: %s", req.body.email);

    // check firstname, lastname & email format
    var namePattern=/^[a-z ,.'-]{2,20}$/i
    var emailPattern=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    if (!namePattern.test(req.body.name.firstName)) {
        return 'First Name invalid'
    }
    if (!namePattern.test(req.body.name.lastName)) {
        return 'Last Name invalid'
    }
    if (!emailPattern.test(req.body.email)) {
        return 'Email invalid'
    }

    // generate verificationToken
    let verificationToken = generateToken();
    //console.log("verificationToken: %s", verificationToken);

    // update DB
    var sqlUpdate = 'UPDATE user SET firstName = "' + req.body.name.firstName + '", lastName = "' + req.body.name.lastName + '", email = "' + req.body.email + '", verificationToken = "' + verificationToken + '" WHERE appleId = "' + req.params.appleId + '";';
    const resultUpdate = await db.query(
        sqlUpdate
    );
    //console.log("sqlUpdate: %s", sqlUpdate);
    logger.log('debug', '%s %s sqlCheck: %s', 'Signin', 'verifyemail', sqlUpdate);


    // send verification email to user

    return 'Record Updated'

}

async function verifyemail(verificationToken){

    //console.log(verificationToken);

    // check if verification token exist and doesn't expire (24 hr)
    var sqlCheck = 'SELECT vtTime FROM user WHERE verificationToken = "' + verificationToken + '";'; 
    const resultCheck = await db.query(
        sqlCheck
    );
    logger.log('debug', '%s %s sqlCheck: %s', 'Signin', 'verifyemail', sqlCheck);

    // if record doesn't exist
    if (resultCheck.length < 1){
        return 'Record doesn\'t exist'
    }

    // if record already expired
    var now =  new Date().getTime();
    var then = new Date(resultCheck[0].vtTime).getTime();

    //console.log("now: %s", now);
    //console.log("then: %s", then);
    //console.log("diff: %s", (now - then));
    //console.log("value: %s", process.env.emailVerificationValidPeriod);

    if ((now - then) > process.env.emailVerificationValidPeriod){
        return 'Record already expired'
    }

    // if record exists and hasn't expired, update
    var sqlUpdate = 'UPDATE user SET emailVerified = 1 WHERE verificationToken = "' + verificationToken + '";'; 
    const resultUpdate = await db.query(
        sqlUpdate
    );
    logger.log('debug', '%s %s sqlCheck: %s', 'Signin', 'verifyemail', sqlUpdate);
    return 'Record updated'

}

/* generate unique ID */
function generateToken(){
    // always start with a letter (for DOM friendlyness)
    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
    do {                
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode=Math.floor((Math.random()*42)+48);
        if (ascicode<58 || ascicode>64){
            // exclude all chars between : (58) and @ (64)
            idstr+=String.fromCharCode(ascicode);    
        }                
    } while (idstr.length<32);

    return (idstr);
}

module.exports = {
    signin,
    submitid,
    verifyemail
};
