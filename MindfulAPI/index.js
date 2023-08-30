const db = require('./db');
const helper = require('./helper');
const express = require("express");
const app = express();
const port = 3001;
const MindfulAPIRouter = require("./routes/MindfulAPIRoutes");
const MindfulAPIAppRouter = require("./routes/MindfulAPIAppRoutes");
const MindfulAPIAdminRouter = require("./routes/MindfulAPIAdminRoutes");
const logger = require("./logger");
const cors = require("cors");
const path = require('path');
const crypto = require('crypto');
const moment = require('moment');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

app.use(express.json({limit: '50mb'}));

app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  })
);

// CORS only for local host
var corsOptions = {
  origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:3002', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://web-staging.mindfultoken.org', 'https://mindfulcms.agiisoft.com'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// API authentication
app.use(async(req, res, next) => {

  //skip checking for OPTIONS call
  if( req.method === "OPTIONS"){
    return next()
  }

  // skip for appleauth call (will remove when Apple update on their side)
  //if(req.url.startsWith("/mindfulapi/appleauth")){
  if(req.url.startsWith("/mindfulapi/apple")){
          return next()
  }

  if(req.url.startsWith("/mindfulapi/app/apple")){
          return next()
  }

  // skip for download artworkfile
  if(req.url.startsWith("/mindfulapi/app/artworkfile")){
          return next()
  }

  // skip for app version
  if(req.url.startsWith("/mindfulapi/app/appversion")){
          return next()
  }

  // skip for MintPass NFT Total
  if(req.url.startsWith("/mindfulapi/app/nfttotal/mintPass")){
          return next()
  }

  // skip for Mindful Token NFT Total
  if(req.url.startsWith("/mindfulapi/app/nfttotal/mindfulToken")){
          return next()
  }

  // skip for getting artwork info for the homepage
  if(req.url.startsWith("/mindfulapi/app/artworkhomepage")){
          return next()
  }

  // skip for getting artwork info for event
  //if(req.url.startsWith("/mindfulapi/app/event")){
  //        return next()
  //}

  // check authentication for app (mobile+desktop)
  if (req.url.startsWith("/mindfulapi/app")){

    // skip authentication if it's related to Apple login
    //if (!req.url.startsWith("/mindfulapi/app/apple")){
      // if time stamp is within range
      const current_time = Math.floor(Date.now() / 1000);
      if ((current_time - req.headers.time_stamp) > process.env.tolerance){
          logger.log('error', '%s API Authentication Failed: Timestamp expired', req.headers.appleid);
          res.set('WWW-Authenticate', 'Basic realm="401"')
          res.status(401).send('Authentication Failed: Timestamp expired')
          return;
      }
  
      // if secret is correct
      const secret = crypto.createHash('md5').update(req.headers.appleid+req.headers.time_stamp).digest("hex");
      if (!(secret === req.headers.secret)){
          logger.log('error', '%s API Authentication Failed: Wrong secret', req.headers.appleid);
          res.set('WWW-Authenticate', 'Basic realm="401"')
          res.status(401).send('Authentication Failed: Wrong secret')
          return;
      }
  
      // if refresh token is valid (only needed for non signin calls)
      if (!req.url.startsWith("/mindfulapi/app/signin")){
        var sql = 'SELECT refreshToken, validToken FROM user WHERE appleId = "' + req.headers.appleid + '"';  
        const result = await db.query(
            sql
        );
        if (!result[0].validToken){
          logger.log('error', '%s API Authentication Failed: Invalid Token', req.headers.appleid);
          res.set('WWW-Authenticate', 'Basic realm="401"')
          res.status(401).send('Authentication Failed: Invalid Token')
          return;
        }
      }
    //}

  // check authentication for admin
  }else if (req.url.startsWith("/mindfulapi/admin")){

    // check username & password
    const auth = {
      login: process.env.api_admin_user,
      password: process.env.api_admin_passwd
    }
    const [, b64auth = ''] = (req.headers.authorization || '').split(' ')
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (!(login && password && login === auth.login && password === auth.password)) {
      logger.log('error', 'Admin: API Authentication Failed: Wrong username/password, %s', login);
      res.set('WWW-Authenticate', 'Basic realm="401"')
      res.status(401).send('Authentication required: Wrong username/password')
      return;
    }

    // if time stamp is within range
    const current_time = Math.floor(Date.now() / 1000);
    if ((current_time - req.headers.time_stamp) > process.env.tolerance){
        logger.log('error', 'Admin: API Authentication Failed: Timestamp expired, %s', login);
        res.set('WWW-Authenticate', 'Basic realm="401"')
        res.status(401).send('Authentication Failed: Timestamp expired')
        return;
    }

    // if secret is correct
    const secret = crypto.createHash('md5').update(process.env.api_header_secret+req.headers.time_stamp).digest("hex");
    if (!(secret === req.headers.secret)){
        logger.log('error', 'Admin: API Authentication Failed: Wrong secret, %s', login);
        res.set('WWW-Authenticate', 'Basic realm="401"')
        res.status(401).send('Authentication Failed: Wrong secret')
        return;
    }

  }

  return next()
})

/*
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
*/

app.use("/mindfulapi/app", MindfulAPIAppRouter);
app.use("/mindfulapi/admin", MindfulAPIAdminRouter);
//app.use("/mindfulapi", MindfulAPIRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.log('error', 'Middleware error: %s %s', err.message, err.stack);
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.listen(port, () => {
  logger.log('info', 'MindfulAPI start listening at %s', port);
  console.log(`MindfulAPI start listening at ${port}`);
});
