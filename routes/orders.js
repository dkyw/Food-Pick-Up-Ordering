"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("orders")
      .then((results) => {
        res.json(results);
    });
  });
<<<<<<< HEAD
  return router;
};
=======

  // router.post("/", (req, res) => {
  //   knex.insert({
  //     status: "ordered",
  //     total_amount: req.body.total,
  //     user_id: 1
  //   }).into("orders")
  //   .then ()
  //   res.redirect("/orders")
  // });

  return router;


};
>>>>>>> elo/front-end
