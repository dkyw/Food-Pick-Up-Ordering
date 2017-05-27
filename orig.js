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

var twilio = require('twilio');

var client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

//client views

// Home page

// app.get("/", (req, res) => {
//   res.render("index");
// });
app.post('/', (req,res) => {
  //Create TwiML response
  //var twiml = new twilio.TwimlResponse();

 // twiml.say("Hello from your pals at Twilio! Have fun. Love " + name);
/*var twiml = new twilio.TwimlResponse();

  twiml.say("Hello from your pals at Twilio! Have fun. Love " + name);

    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(twiml.toString());*/
  res.set('Content-Type', 'text/xml');
//   res.send(`<?xml version="1.0" encoding="UTF-8"?>
// <Response>
//     <Say voice="woman">Please leave a message after the tone.</Say>
//     <Record maxLength="20" />
// </Response>`);
  res.render('order')
});




app.post("/makecall", (req,res) => {
  client.calls.create({
    method: 'POST',
    url: 'https://2ef948c0.ngrok.io',
    from: "+17782007487",
    to: "+16047823702",
    // timeout: 12
  }, function(err, call) {
    console.log("call made");
});
  res.send("OK");
});


//checkout
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
  to: "+16047823702",
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
