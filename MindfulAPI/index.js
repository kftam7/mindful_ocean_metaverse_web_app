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

// API authentication
app.use(async(req, res, next) => {

  // check authentication for app (mobile+desktop)
  if (req.url.startsWith("/mindfulapi/app")){

    // if time stamp is within range
    const current_time = Math.floor(Date.now() / 1000);
    if ((current_time - req.headers.time_stamp) > process.env.tolerance){
        logger.log('error', 'API Authentication Failed: Timestamp expired');
        res.set('WWW-Authenticate', 'Basic realm="401"')
        res.status(401).send('Authentication Failed: Timestamp expired')
        return;
    }

    // if secret is correct
    const secret = crypto.createHash('md5').update(req.headers.appleid+req.headers.time_stamp).digest("hex");
    if (!(secret === req.headers.secret)){
        logger.log('error', 'API Authentication Failed: Wrong secret');
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
        logger.log('error', 'API Authentication Failed: Invalid Token');
        res.set('WWW-Authenticate', 'Basic realm="401"')
        res.status(401).send('Authentication Failed: Invalid Token')
        return;
      }
    }
    
  // check authentication for admin
  }else if (req.url.startsWith("/mindfulapi/admin")){
    //console.log("no");
  }
  /* 
  const auth = {
    login: 'mindful',
    password: 'RU%ru9VD'
  }
  const [, b64auth = ''] = (req.headers.authorization || '').split(' ')
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  //skip checking for OPTIONS call

  if( req.method === "OPTIONS"){
    return next()
  }
  if (login && password && login === auth.login && password === auth.password) {
    return next()
  }
  logger.log('error', 'API Authentication Failed.');
  res.set('WWW-Authenticate', 'Basic realm="401"')
  res.status(401).send('Authentication required.')

  */
  return next()
})


app.use(express.json({limit: '50mb'}));

app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  })
);

// CORS only for local host
var corsOptions = {
  //origin: 'http://127.0.0.1:3000',
  origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:3002', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//app.use("/mindfulapi", MindfulAPIRouter);
app.use("/mindfulapi/app", MindfulAPIAppRouter);
app.use("/mindfulapi/admin", MindfulAPIAdminRouter);

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
