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

    //console.log(req.headers.time_stamp);
    //console.log(req.headers.secret);
    //console.log(req.params.appleId);
    //console.log(req.body.name.firstName);
    //console.log(req.body.name.lastName);
    //console.log(req.body.email);
    //console.log(req.body.code);
    //console.log(req.body.refresh_token);
/*
    // Outside time tolerance 
    const current_time = Math.floor(Date.now() / 1000);
    if ((current_time - req.headers.time_stamp) > process.env.tolerance){
        return("Exceed time limit");
    }

    // Secret is wrong
    const secret = crypto.createHash('md5').update(req.params.appleId+req.headers.time_stamp).digest("hex");
    console.log("secret: ", secret);
    if (!(secret === req.headers.secret)){
        return("secret is wrong");
    }
*/
    //let authInstance = new AppleAuth(config, fs.readFileSync('./AuthKey_8Y456M46UL.p8').toString(), 'text');
    //const response = await authInstance.accessToken(req.body.code);
    //console.log("response", response);
    //console.log("idToken: ", idToken);

    // appleId is wrong
    //const idToken = jwt.decode(req.body.id_token);
    /*
    console.log(req.body.code);
    const idToken = jwt.decode(req.body.code);
    console.log("idToken: ", idToken);
    if (!(idToken.sub === req.params.appleId)){
        return("appleId doesn't match");
    }
    */
    //let authInstance = new AppleAuth(config, fs.readFileSync('./AuthKey_8Y456M46UL.p8').toString(), 'text');
    //const response = await authInstance.accessToken(req.body.code);
    // appleId is wrong

    // refresh token is wrong
    //if (!(response.refresh_token == req.body.refresh_token)){
    //    return("refresh token doesn't match");
    //}

    // check if appleid is wrong
    const idToken = jwt.decode(req.body.id_token);
    if (!(idToken.sub == req.params.appleId)){
        return("appleId doesn't match");
    }  


    // check if user already exist
    var sqlCheck = 'SELECT COUNT(*) AS if_exist FROM user WHERE appleId = "' + req.params.appleId +'"';
    const resultCheck = await db.query(
        sqlCheck
    );

    const currentTimeSql = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    // if appleId already exist
    if (resultCheck[0].if_exist){
        var sqlUpdate = 'UPDATE user SET firstName = "' + req.body.name.firstName + '", lastName = "' + req.body.name.lastName + '", refreshToken = "' + req.body.refresh_token + '", updateTime = "' + currentTimeSql + '" WHERE appleId = "' + req.params.appleId + '";';
        console.log(sqlUpdate);
        const resultUpdate = await db.query(
            sqlUpdate
        );
        let message = 'Record updated successfully';
        return {message};
        
    // if appleId doesn't exist
    }else{
        var sqlCreate = 'INSERT INTO user (appleId, firstName, lastName, email, refreshToken, createTime, updateTime, isActive) VALUES ("' + req.params.appleId + '", "' + req.body.name.firstName + '", "' + req.body.name.lastName + '", "' + req.body.email + '", "' + req.body.refresh_token + '", "' + currentTimeSql + '", "' + currentTimeSql + '", ' + '1)';
        console.log(sqlCreate);
        const resultCreate = await db.query(
            sqlCreate
        );
        let message = 'Record created successfully';
        return {message};
    }

}

module.exports = {
    signin
};
