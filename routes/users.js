"use strict";

const express = require('express');
const router  = express.Router();
const twilio = require('twilio');

// module.exports = (knex) => {

//   router.get("/", (req, res) => {
//     knex
//       .select("*")
//       .from("users")
//       .then((results) => {
//         res.json(results);
//     });
// //   });

//   return router;
// }

// Create a Twilio REST API client for authenticated requests to Twilio
// const client = twilio(config.accountSid, config.authToken);
// const client = twilio('AC2c4d471f332036add1edc93d1df0d401', "d3e24b09e118c87bb455c29220cccac4");
