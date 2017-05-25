"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

var accountSid = 'ACa36130d8f5d9f228af8a8f65714fb4c0'; // Your Account SID from www.twilio.com/console
var authToken = 'dbf5cf5b54015e86c6b7d4318b403c0f';   // Your Auth Token from www.twilio.com/console
var client = require('twilio')(
  accountSid,
  authToken

);


// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

//client views

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

checkout
app.post("/checkout", (req,res) => {
  res.send('checkout');
});


// restaurant views

app.get("/orders", (req,res) => {
  res.send('restaurant view');
});

app.get("/orders/:id", (req,res) => {
  res.render('form');
});

app.post("/orders", (req,res) => {
  client.messages.create({
  from: "+17782007487",
  to: "+17787823702",
  body: req.body.time
  }, function(err, message) {
    if(err) {
      console.error(err.message);
    }
  });
  res.send('thanks!')
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
