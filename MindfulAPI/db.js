const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  connection.query('SET SESSION group_concat_max_len = 10000');
  const [results, ] = await connection.execute(sql, params);
  connection.end();
  return results;
}

module.exports = {
  query
}
