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
const restaurantsRoutes = require("./routes/restaurants");
const itemsRoutes = require("./routes/items");
const ordersRoutes = require("./routes/orders");
const orders_itemsRoutes = require("./routes/orders_items");

const twilio = require('./twilio');
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

var client = require('twilio');

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/restaurants", restaurantsRoutes(knex));
app.use("/api/items", itemsRoutes(knex));
app.use("/api/orders", ordersRoutes(knex));
app.use("/api/orders_items", orders_itemsRoutes(knex));

//client views

//Home page -- view all orders

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/checkout/message", (req,res) => {
  res.render("message");
});


function requestBody(user) {
  let userId = knex.select('id').from('users').where('user_name', user);
  return userId;
}

let orderId = knex.select('id').from('orders');

app.post("/checkout", (req,res) => {
  twilio.callRestaurants();
// COMMENTED DURING DEV
  knex('users')
  .insert({
    phone_number: req.body.userPhone,
    user_name: req.body.userName
  })
  .then(function () {
    knex('orders')
    .insert({
      status: "ordered",
      total_amount: req.body.lastTotalAmount,
      user_id: requestBody(req.body.userName)
    })
    .then(function () {
      // console.log("USERNAME",req.body.userName);
      let item = req.body.item;
      let qty = req.body.quantity;
      if (typeof([]) !== typeof(req.body.item)) {
        knex('orders_items')
        .insert({
          order_id: orderId.where('user_id',requestBody(req.body.userName)),
          item_id: knex.select('id').from('items').where('name',item),
          quantity: qty
        })
        .then({})
      } else {
      let staging = [];
      item.map(function (ele,index) {
<<<<<<< HEAD
        staging.push([ele,qty[index]]);   
      });
      // console.log("outside for",req.body.userName);
=======
        staging.push([ele,qty[index]]);
      });console.log("outside for",req.body.userName);
>>>>>>> 51f3c92e0a3b3dfd7a280fdaf6b0d0965bde9e19
      for (let i = 0; i < staging.length; i++) {
        // console.log("inside for",req.body.userName);
        knex('orders_items')
        .insert({
          order_id: orderId.where('user_id',requestBody(req.body.userName)),
          item_id: knex.select('id').from('items').where('name',item[i]),
          quantity: qty[i]
        })
        .then({})
        }}
    });res.redirect("/orders")
  }); 
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
  res.redirect("/orders");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
