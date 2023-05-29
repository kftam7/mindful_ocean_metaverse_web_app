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

        const response = await authInstance.accessToken(req.body.code);
        const idToken = jwt.decode(response.id_token);

	    console.log("code: ", req.body.code);
	    console.log("refresh_token: ", response.refresh_token);
	    //console.log("body: ", req.body);
	    //console.log("idToken: ", idToken);
	    //console.log("response: ", response);
        const user = {};
        user.id = idToken.sub;

	    let body = "?access_token=" + response.access_token + "&id_token=" + response.id_token + "&expires_in=" + response.expires_in + "&refresh_token=" + response.refresh_token + "&appleId=" + user.id;

        if (idToken.email) {
		  user.email = idToken.email;
		  body = body + "&email=" + user.email;
	    }

        if (req.body.user) {
            const { name } = JSON.parse(req.body.user);
            user.name = name;
	        body = body + "&name=" + user.name;	
        }

    // update database
    // check if user already exist
    var sqlCheck = 'SELECT COUNT(*) AS if_exist FROM user WHERE appleId = "' + user.id +'"';
    const resultCheck = await db.query(
        sqlCheck
    );

    const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    // if appleId already exist
    if (resultCheck[0].if_exist){
        //var sqlUpdate = 'UPDATE user SET firstName = "' + user.name.firstName + '", lastName = "' + user.name.lastName + '", refreshToken = "' + response.refresh_token + '", updateTime = "' + currentTimeSql + '" WHERE appleId = "' + user.id + '";';
        var sqlUpdate = 'UPDATE user SET refreshToken = "'+ response.refresh_token + '", updateTime = "' + currentTimeSql + '" WHERE appleId = "' + user.id + '";';
        console.log(sqlUpdate);
        const resultUpdate = await db.query(
            sqlUpdate
        );
        let message = 'Record updated successfully';
        return {message};
        
    // if appleId doesn't exist
    }else{
        var sqlCreate = 'INSERT INTO user (appleId, firstName, lastName, email, refreshToken, createTime, updateTime, isActive) VALUES ("' + user.id + '", "' + user.name.firstName + '", "' + user.name.lastName + '", "' + user.email + '", "' + response.refresh_token + '", "' + currentTimeSql + '", "' + currentTimeSql + '", ' + '1)';
        console.log(sqlCreate);
        const resultCreate = await db.query(
            sqlCreate
        );
        let message = 'Record created successfully';
        return {message};
    }

        //res.json(user);
        //const body = JSON.stringify(req.body);
	//const body = JSON.stringify(idToken);
	//const body = "?access_token=" + response.access_token + "&expires_in=" + response.expires_in + "&refresh_token=" + response.refresh_token + "&appleId=" + user.id;
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
