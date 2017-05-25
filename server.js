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
const twilio = require('twilio');
var VoiceResponse = twilio.twiml.VoiceResponse;

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

 var twiml = new twilio.TwimlResponse();


var accountSid = 'AC2c4d471f332036add1edc93d1df0d401' ;
var authToken = "d3e24b09e118c87bb455c29220cccac4";
var client = require('twilio')(
  accountSid,
  authToken
);


// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

//client views

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

//checkout
app.post("/checkout", (req,res) => {
  console.log("this works");
  // const client = twilio('AC2c4d471f332036add1edc93d1df0d401', "d3e24b09e118c87bb455c29220cccac4");

  // This should be the publicly accessible URL for your application
  // Here, we just use the host for the application making the request,
  // but you can hard code it or use something different if need be
  var restaurantNumber = '+17788749852';
  // var url = 'http://' + request.headers.host + '/checkout/:order/';

  var options = {
    to: '+17788749852',
    from: '+16043300924',
    url: 'http://21eeab64.ngrok.io/orders/345455/message'
  };

  client.calls.create(options)
    .then((message) => {
      console.log('successful call');
      res.render('order');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});


app.post('/orders/:id/message', (req, res) => {
  var twiml = twilio.TwimlResponse();
  var restaurantNumber = '+17788749852';
  var twimlResponse = new VoiceResponse();

  twimlResponse.say('Thanks for contacting our sales department. Our ' +
                    'next available representative will take your call. ',
                    { voice: 'alice' });
  twimlResponse.dial(restaurantNumber);
    res.send(twimlResponse.toString());
});





// app.get('/orders/:id/message', (req, res) => {
//  const name = 'alex'
//  // twiml.say(`Hello from lighthouse! ${Alex}`)
//  res.writeHead(200, {'Content-Type': 'text/xml'});
//  client.calls.create({
//   to: '+17788749852',
//   from: '+16043300924',
//   twiml.say(`Thanks for contacting our sales department. Our ' +
//                           'next available representative will take your call.`,
//                           { voice: 'alice' });
//  })
//  res.send('hello');
//  })





//   res.type('text/xml');
//   res.send(`
//     <Response>
//       <Say>Hello World</Say>
//       <Play>https://api.twilio.com/Cowbell.mp3</Play>
//     </Response>
//   `);
// });



//restaurant views

app.get("/orders", (req,res) => {
  res.send('restaurant view');
});

app.get("/orders/:id", (req,res) => {
  res.send('restauarnt view for individual orders');
});


app.post("/orders/:id", (req,res) => {
  res.send('update orders here')
});


// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
// var accountSid = 'AC2c4d471f332036add1edc93d1df0d401';
// var authToken = "d3e24b09e118c87bb455c29220cccac4";
// var client = require('twilio')(accountSid, authToken);

// client.calls.create({
//     url: "http://demo.twilio.com/docs/voice.xml",
//     to: "+17788749852",
//     from: "+16043300924"
// }, function(err, call) {
//     process.stdout.write(call.sid);
// });




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
