const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "127.0.0.1",
    user: "mindful",
    password: "RU%ru9VD",
    database: "mindful",
    //multipleStatements: true,
  },
  logConfig: {
    logFolder: "./logs/",
    logFile: "mindfulapi-%DATE%.log",
    level: "debug"
   },
  listPerPage: 1000000,
};
module.exports = config;
