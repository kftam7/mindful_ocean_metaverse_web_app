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

let authInstance = new AppleAuth(config, fs.readFileSync('./AuthKey_8Y456M46UL.p8').toString(), 'text');

async function login(){
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

        let body = "?access_token=" + response.access_token + "&id_token=" + response.id_token + "&expires_in=" + response.expires_in + "&refresh_token=" + response.refresh_token + "&appleId=" + user.id;

        if (idToken.email) {
            user.email = idToken.email;
            //body = body + "&email=" + user.email;
            ifEmailExist = 1;
	    }

        if (req.body.user) {
            const { name } = JSON.parse(req.body.user);
            user.name = name;
	        //body = body + "&firstName=" + user.name.firstName + "&lastName=" + user.name.lastName;
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

        // update database
        // check if user already exist
        let sqlCheck = 'SELECT COUNT(*) AS if_exist FROM user WHERE appleId = "' + user.id +'"';
        const resultCheck = await db.query(
            sqlCheck
        );

        // if appleId already exist
        if (resultCheck[0].if_exist){
            const resultUpdate = await db.query(
                sqlUpdate
            );
            console.log("Record updated successfully");
        // if appleId doesn't exist
            body = body + "&firstTime=0";
        }else{
            const resultCreate = await db.query(
                sqlCreate
            );
            console.log("Record created successfully")
            body = body + "&firstTime=1";
        }

        // include email, firstname & lastname in the body
        let sqlCheckInfo = 'SELECT email, firstName, lastName FROM user WHERE appleId = "' + user.id +'" ';
        const resultCheckInfo = await db.query(
            sqlCheckInfo
        );
        body = body + "&email=" + resultCheckInfo[0].email;
        body = body + "&firstName=" + resultCheckInfo[0].firstName + "&lastName=" + resultCheckInfo[0].lastName;

        console.log("body:", body);

        return(body);

    } catch (ex) {
        console.error(ex);
    }
}

async function token(){
	return(authInstance._tokenGenerator.generate());
}

async function refresh(req){
    try {
        const accessToken = await authInstance.refreshToken(req.query.refreshToken);
        return(accessToken);
    } catch (ex) {
        console.error(ex);
        res.send("An error occurred!");
    }
}

module.exports = {
    login,
    auth,
    token,
    refresh
};

