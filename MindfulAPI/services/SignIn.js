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
const crypto = require('crypto')

async function signin(req){


    //console.log(req.headers.time_stamp);
    //console.log(req.headers.secret);
    //console.log(req.params.appleId);
    //console.log(req.body.name.firstName);
    //console.log(req.body.name.lastName);
    //console.log(req.body.email);
    console.log(req.body.code);
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

    let authInstance = new AppleAuth(config, fs.readFileSync('./AuthKey_8Y456M46UL.p8').toString(), 'text');
    const response = await authInstance.accessToken(req.body.code);
    console.log("response", response);
    //const idToken = jwt.decode(response.id_token);

/*
    // appleId is wrong
    if (!(idToken.sub === req.params.appleId)){
        return("appleId doesn't match");
    }
*/
    /*
    // refresh token is wrong
    if (!(response.refresh_token == req.body.refresh_token)){
        return("refresh token doesn't match");
    }

    var sqlCheck = 'SELECT COUNT(*) AS if_exist FROM user WHERE appleId = "' + req.params.appleId +'"';
    const resultCheck = await db.query(
        sqlCheck
    );

    // if appleId already exist
    if (resultCheck.if_exist){
        var sqlUpdate = 'UPDATE user SET firstName = "' + req.body.name.firstname + '", lastName = "' + req.body.name.lastname + '", refreshToken = "' + req.body.refresh_token + '", updateTime = "' + current_time + ' WHERE appleId = "' + req.params.appleId + '";';
        const resultUpdate = await db.query(
            sqlUpdate
        );
        let message = 'Record updated successfully';

    // if appleId doesn't exist
    }else{
        var sqlCreate = 'INSERT INTO user (appleId, firstName, lastName, refreshToken, createTime, updateTime, isActive) VALUES ("' + req.params.appleId + '", "' + req.body.name.firstname + '", "' + req.body.name.lastname + '", "' + req.body.refresh_token + '", "' + current_time + '", "' + current_time + '", "' + '", 1)';
        const resultCreate = await db.query(
            sqlCreate
        );
        let message = 'Record created successfully';

    }
    return {message};
    */

}

module.exports = {
    signin
};
