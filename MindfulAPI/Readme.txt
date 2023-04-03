To run API on local: 
---------------------
Step 1. - MYSQL 
install mysql and import the "mindful" schema and sample data using file
mindful_ocean_metaverse_web_app/DB/MindfulToken.sql

Step 2. - Install
cd mindful_ocean_metaverse_web_app/MindfulAPI/
npm install

Step 3. - Config
edit config file config.js for mysql info
const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "127.0.0.1",
    user: "mindful",
    password: "xxxxxxxx",
    database: "mindful",
  },
  logConfig: {
    logFolder: "./logs/",
    logFile: "mindfulapi-%DATE%.log",
   },
  listPerPage: 1000000,
};

Step 4. - Run
node index.js

Step 5 - Test on Postman
API can be tested by Postman by importing the following files:
Collectioin - mindful_ocean_metaverse_web_app/DB/MindfulToken.postman_collection.json
Environment - mindful_ocean_metaverse_web_app/DB/Mindful Local Environment.postman_environment.json