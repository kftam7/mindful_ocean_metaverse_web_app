const db = require('../db');
const helper = require('../helper');
const path = require('path');
//const moment = require('moment');
//const sleep = require('sleep-promise');
const logger = require("../logger");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const fs = require('fs');
const config = fs.readFileSync('./appleConfig.json');
const AppleAuth = require('apple-auth');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let authInstance = new AppleAuth(config, fs.readFileSync('./AuthKey_8Y456M46UL.p8').toString(), 'text');

async function login(){
	return(`<a href="${authInstance.loginURL()}">Sign in with Apple</a>`);
}

async function auth(req){

		//let auth = new AppleAuth(config, fs.readFileSync(process.env.PRIVATE_KEY_FILE_PATH, 'text'));
    try {
        //console.log( Date().toString() + "GET /auth");
        const response = await authInstance.accessToken(req.body.code);
        const idToken = jwt.decode(response.id_token);

        const user = {};
        user.id = idToken.sub;

        if (idToken.email) user.email = idToken.email;
        if (body.user) {
            const { name } = JSON.parse(body.user);
            user.name = name;
        }

        //res.json(user);
        return(user);

    } catch (ex) {
        console.error(ex);
        //res.send("An error occurred!");
        //return("An error occurred!");
    }
}

async function token(){
	return(auth._tokenGenerator.generate());
}

async function refresh(req){
    try {
        const accessToken = await auth.refreshToken(req.query.refreshToken);
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