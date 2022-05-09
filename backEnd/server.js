const express = require('express');
const knex = require('knex');
const port = process.env.PORT || 8080;
require("dotenv").config({
    path: "../.env.local",
  });
const config = require('./knexfile');
const app = express();
const axios = require("axios");

app.use(express.json())





app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });