const express = require("express");
const app = express();
const port = 3001;
const MindfulAPIRouter = require("./routes/MindfulAPIRoutes");
const logger = require("./logger");
const cors = require("cors");

// require authorization header
/*
app.use((req, res, next) => {
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

  return next()
})
*/

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

app.use("/mindfulapi", MindfulAPIRouter);

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
