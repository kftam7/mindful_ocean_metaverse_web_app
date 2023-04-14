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

let authInstance = new AppleAuth(config, fs.readFileSync('./AuthKey_8Y456M46UL.p8').toString(), 'text');

async function login(){
	return(`<a href="${authInstance.loginURL()}">Sign in with Apple</a>`);
}

async function auth(req){

    try {

        const response = await authInstance.accessToken(req.body.code);
        const idToken = jwt.decode(response.id_token);

        const user = {};
        user.id = idToken.sub;

        if (idToken.email) user.email = idToken.email;
        if (req.body.user) {
            const { name } = JSON.parse(req.body.user);
            user.name = name;
        }

        //res.json(user);
        const body = JSON.stringify(req.body);
        return(body);

    } catch (ex) {
        console.error(ex);
    }
}

async function token(){
	return(authInstance._tokenGenerator.generate());
}

async function refresh(req){
		console.log(req.query.refreshToken);
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