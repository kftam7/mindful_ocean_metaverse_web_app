const db = require('../db');
const helper = require('../helper');
const path = require('path');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const fs = require('fs');
const config = fs.readFileSync('./appleConfig.json');
const AppleAuth = require('apple-auth');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const moment = require('moment');

let authInstance = new AppleAuth(config, fs.readFileSync('./AuthKey_UCD8U8J4M4.p8').toString(), 'text');

async function login(){
    logger.log('info', '%s %s', 'AppleAuth', 'login');
	return(`<a href="${authInstance.loginURL()}">Sign in with Apple</a>`);
}

async function auth(req){

    try {

        const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const response = await authInstance.accessToken(req.body.code);
        const idToken = jwt.decode(response.id_token);
        const user = {};
        var ifEmailExist = 0;
        var ifNameExist = 0;

        user.id = idToken.sub;

        logger.log('info', '%s %s %s', 'AppleAuth', 'auth', user.id);

        let body = "?access_token=" + response.access_token + "&id_token=" + response.id_token + "&expires_in=" + response.expires_in + "&refresh_token=" + response.refresh_token + "&appleId=" + user.id;

        // check if email exist
        if (idToken.email) {
            user.email = idToken.email;
            ifEmailExist = 1;
	    }

        // check if name exist
        if (req.body.user) {
            const { name } = JSON.parse(req.body.user);
            user.name = name;
            ifNameExist = 1;
        }

        // construct the insert and update SQL
        if (ifEmailExist && ifNameExist){
            var sqlCreate = 'INSERT INTO user (appleId, firstName, lastName, email, refreshToken, createTime, updateTime, isActive) VALUES ("' + user.id + '", "' + user.name.firstName + '", "' + user.name.lastName + '", "' + user.email + '", "' + response.refresh_token + '", "' + currentTimeSql + '", "' + currentTimeSql + '", ' + '1)';;
            var sqlUpdate = 'UPDATE user SET firstName = "' + user.name.firstName + '", lastName = "' + user.name.lastName + '", email = "' + user.email + '", refreshToken = "' + response.refresh_token + '", updateTime = "' + currentTimeSql + '" WHERE appleId = "' + user.id + '";';
        }else if (ifEmailExist && !ifNameExist) {
            var sqlCreate = 'INSERT INTO user (appleId, email, refreshToken, createTime, updateTime, isActive) VALUES ("' + user.id + '", "' + user.email + '", "' + response.refresh_token + '", "' + currentTimeSql + '", "' + currentTimeSql + '", ' + '1)';;
            var sqlUpdate = 'UPDATE user SET email = "' + user.email + '", refreshToken = "' + response.refresh_token + '", updateTime = "' + currentTimeSql + '" WHERE appleId = "' + user.id + '";';
        }else if (!ifEmailExist && ifNameExist){
            var sqlCreate = 'INSERT INTO user (appleId, firstName, lastName, refreshToken, createTime, updateTime, isActive) VALUES ("' + user.id + '", "' + user.name.firstName + '", "' + user.name.lastName + '", "' + response.refresh_token + '", "' + currentTimeSql + '", "' + currentTimeSql + '", ' + '1)';;
            var sqlUpdate = 'UPDATE user SET firstName = "' + user.name.firstName + '", lastName = "' + user.name.lastName + '", refreshToken = "' + response.refresh_token + '", updateTime = "' + currentTimeSql + '" WHERE appleId = "' + user.id + '";';
        }else{
            var sqlCreate = 'INSERT INTO user (appleId, refreshToken, createTime, updateTime, isActive) VALUES ("' + user.id + '", "' + response.refresh_token + '", "' + currentTimeSql + '", "' + currentTimeSql + '", ' + '1)';;
            var sqlUpdate = 'UPDATE user SET refreshToken = "' + response.refresh_token + '", updateTime = "' + currentTimeSql + '" WHERE appleId = "' + user.id + '";';
        }

        //console.log("body: ", body);
        //console.log("sqlCreate: ", sqlCreate);
        //console.log("sqlUpdate: ", sqlUpdate);

        logger.log('debug', '%s %s sqlCreate: %s', 'AppleAuth', 'auth', sqlCreate);
        logger.log('debug', '%s %s sqlUpdate: %s' , 'AppleAuth', 'auth', sqlUpdate);

        // update database

        // check if user already exist
        let sqlCheck = 'SELECT COUNT(*) AS if_exist FROM user WHERE appleId = "' + user.id +'"';
        const resultCheck = await db.query(
            sqlCheck
        );

        logger.log('debug', '%s %s sqlCheck: %s' , 'AppleAuth', 'auth', sqlCheck);

        // if appleId already exist
        if (resultCheck[0].if_exist){
            /*
            const resultUpdate = await db.query(
                sqlUpdate
            );
            logger.log('info', '%s %s Record updated successfully', 'AppleAuth', 'auth');
            */

            let sqlCheckInfo = 'SELECT b.firstName, b.lastName, b.email, b.emailVerified AS firstName, lastName, email, emailVerified FROM TandC a, user b WHERE a.userId=b.userId AND a.agreed = 1 AND b.appleId = "' + user.id +'"';
            const resultCheckInfo = await db.query(
                sqlCheckInfo
            );
            logger.log('debug', '%s %s sqlCheck: %s' , 'AppleAuth', 'auth', sqlCheckInfo);

            if (resultCheckInfo[0].firstName && resultCheckInfo[0].lastName && resultCheckInfo[0].email && (resultCheckInfo[0].emailVerified == 1)){
                body = body + "&firstTime=0";
            }else{
                body = body + "&firstTime=1";
            }

            // check if agreed T&C
            //let sqlCheckTandC = 'SELECT COUNT(*) AS if_tandc FROM TandC a, user b WHERE a.userId=b.userId AND a.agreed = 1 AND b.appleId = "' + user.id +'"';
            //const resultCheckTandC = await db.query(
            //    sqlCheckTandC
            //);
            //logger.log('debug', '%s %s sqlCheck: %s' , 'AppleAuth', 'auth', sqlCheckTandC);

            //if (resultCheckTandC[0].if_tandc){
            //    body = body + "&firstTime=0";
            //}else{
            //    body = body + "&firstTime=1";
            //}
        }else{
            const resultCreate = await db.query(
                sqlCreate
            );
            logger.log('info', '%s %s Record created successfully', 'AppleAuth', 'auth');
            //console.log("Record created successfully")
            body = body + "&firstTime=1";
        }

        // include email, firstname & lastname in the body
        let sqlCheckInfo = 'SELECT email, firstName, lastName FROM user WHERE appleId = "' + user.id +'" ';
        const resultCheckInfo = await db.query(
            sqlCheckInfo
        );
        logger.log('debug', '%s %s sqlCheckInfo: %s' , 'AppleAuth', 'auth', sqlCheckInfo);

        body = body + "&email=" + resultCheckInfo[0].email;
        body = body + "&firstName=" + resultCheckInfo[0].firstName + "&lastName=" + resultCheckInfo[0].lastName;

        logger.log('info', '%s %s Redirect link: %s' , 'AppleAuth', 'auth', body);
        //console.log("body:", body);

        return(body);

    } catch (ex) {
        logger.log('error', '%s %s %s', 'AppleAuth', 'auth', ex);
        //console.error(ex);
    }
}

async function token(){
    logger.log('info', '%s %s', 'AppleAuth', 'token');
	return(authInstance._tokenGenerator.generate());
}

async function refresh(req){
    try {
        logger.log('info', '%s %s', 'AppleAuth', 'refresh');
        const accessToken = await authInstance.refreshToken(req.query.refreshToken);
        return(accessToken);
    } catch (ex) {
        logger.log('error', '%s %s An error occurred!', 'AppleAuth', 'refresh');
        //console.error(ex);
        res.send("An error occurred!");
    }
}

module.exports = {
    login,
    auth,
    token,
    refresh
};

