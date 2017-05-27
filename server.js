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

var client = require('twilio');

// Mount all resource routes
app.use("/api/restaurants", restaurantsRoutes(knex));
app.use("/api/items", itemsRoutes(knex));
app.use("/api/orders", restaurantsOrders(knex));

//client views

//Home page -- view all orders

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/checkout/message", (req,res) => {
  res.render("message");
});

app.post("/checkout", (req,res) => {
  twilio.callRestaurants();
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
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
