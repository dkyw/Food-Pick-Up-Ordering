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
// const usersRoutes = require("./routes/users");
const restaurantsRoutes = require("./routes/restaurants");
const itemsRoutes = require("./routes/items");
const restaurantsOrders = require("./routes/orders")

const twilio = require('./twilio')

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

// var twilio = require('twilio');

// var client = require('twilio')(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );




// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
app.use("/api/restaurants", restaurantsRoutes(knex));
app.use("/api/items", itemsRoutes(knex));
app.use("/api/orders", restaurantsOrders(knex));

//client views

//Home page -- view all orders

app.get("/", (req, res) => {
  res.render("index");
});

app.post('/orders/:id/message', (req,res) => {
  res.render('message');
});

app.post("/checkout", (req,res) => {
  twilio.callRestaurants();

//   client.calls.create({
//     method: 'POST',
//     url: 'https://e31cd9d3.ngrok.io/orders/message',
//     from: "+17782007487",
//     to: "+16047823702",
//     // timeout: 12
//   }, function(err, call) {
//     console.log("call made");
// });
//   res.send("OK");
});


//checkout
app.post("/checkout", (req,res) => {
  res.send('checkout');
});


// restaurant views

app.get("/orders", (req,res) => {
  res.render('orders');
});

app.get("/orders/:id", (req,res) => {
  res.render('form');
});



app.post("/orders", (req,res) => {
  twilio.sendSMS(req.body.time);
  res.send('message sent')

  // client.messages.create({
  // from: "+17782007487",
  // to: "+16047823702",
  // body: req.body.time
  // }, function(err, message) {
  //   if(err) {
  //     console.error(err.message);
  //   }
  // });
  // res.send('thanks!')
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
