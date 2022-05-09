require("dotenv").config({
    path: "./.env.local",
  });
  const pg = require("pg"); 
  
  module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      migrations: {
        directory: './backend/db/migrations',
      },
      seeds: { directory: './backend/db/seeds' },
    },
  };