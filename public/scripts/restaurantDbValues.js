

const pg = require("pg");
require('dotenv').config({path: '../../.env'});

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT,
    ssl      : process.env.DB_SSL
  }
});

var restaurantName = knex.select('name').from('restaurants').where('id', 1).asCallback(function (err, values) {
  if (err) {
    console.log(err);
  } else {
    console.log(values[0].name);
  }
  knex.destroy();
});

var restaurantDescription = knex.select('description').from('restaurants').where('id', 1).asCallback(function (err, values) {
  if (err) {
    console.log(err);
  } else {
    console.log(values[0].description);
  }
  knex.destroy();
});

var restaurantLogo = knex.select('logo').from('restaurants').where('id', 1).asCallback(function (err, values) {
  if (err) {
    console.log(err);
  } else {
    console.log(values[0].logo);
  }
  knex.destroy();
});

var restaurantBackgroundImage = knex.select('background_image').from('restaurants').where('id', 1).asCallback(function (err, values) {
  if (err) {
    console.log(err);
  } else {
    console.log(values[0].background_image);
  }
  knex.destroy();
});

exports.restaurantName = restaurantName;
exports.restaurantDescription = restaurantDescription;
exports.restaurantLogo = restaurantLogo;
exports.restaurantBackgroundImage = restaurantBackgroundImage;
