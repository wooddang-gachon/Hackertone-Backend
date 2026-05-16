import mysql from "mysql2/promise";
import config from "../config/index.js";

const pool = mysql.createPool({
  host: config.databaseHOST,
  port: config.databasePORT,
  user: config.databaseUSER,
  password: config.databasePASSWORD,
  database: config.databaseNAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
