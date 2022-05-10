const express = require('express');
const knex = require('knex');
const port = process.env.PORT || 8080;
const path = require("path");
require("dotenv").config({ path: "../.env.local",});
const environment = process.env.DATABASE_URL ? "production" : "development"
const config = require('./../knexfile');
const app = express();
const db = knex(config[environment]);


app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/positive", async(req, res) => {
  await db.select('*')
  .from("positive_suggestions")
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((error) => console.log(error))
});

app.get("/negative", async(req, res) => {
  await db.select('*')
  .from("negative_suggestions")
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((error) => console.log(error))
});

app.post("/positive", async(req, res) => {
  await db.insert({
    popularity: 0,
    suggestion: req.body.suggestion
  })
  .into("positive_suggestions")
  .then(() => {
    res.status(200).send();
  })
  .catch((error) => console.log(error))
});

app.post("/negative", async(req, res) => {
  await db.insert({
    popularity: 0,
    suggestion: req.body.suggestion
  })
  .into("negative_suggestions")
  .then(() => {
    res.status(200).send();
  })
  .catch((error) => console.log(error))
});




app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });