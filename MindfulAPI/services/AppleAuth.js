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
