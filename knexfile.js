require("dotenv").config({
    path: "./.env.local",
  });
  const pg = require("pg"); 
  
  module.exports = {
    development: {
      client: 'pg',
      connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      migrations: {
        directory: __dirname + '/backend/db/migrations',
      },
      seeds: { directory: __dirname + '/backend/db/seeds' },
    },
    production: {
      client: 'pg',
      connection:  process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorised: false
      },
      migrations: {
        directory: __dirname + '/backEnd/db/migrations',
      },
      seeds: { directory: __dirname +'/backEnd/db/seeds' }
    },
  };