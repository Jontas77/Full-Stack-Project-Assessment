const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
}

const prodConfig = {
  connectionString: process.env.DATABASE_URL
}

const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);
  
module.exports = pool;

