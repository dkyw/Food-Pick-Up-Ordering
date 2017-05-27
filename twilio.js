// Twilio Credentials and resturant number
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const resturantNumber = process.env.FROM_NUMBER;
const clientNumber = process.env.TO_NUMBER;
const url = process.env.URL;

const client = require('twilio')(accountSid, authToken);

function sendSMS(smsbody) {
  client.messages.create({
    from: resturantNumber,
    to: clientNumber,
    body: smsbody,
  }, (err, message) => {
    console.log(message.sid);
  });
}

function callRestaurants() {
  client.calls.create({
    method: 'POST',
    url: `${url}/checkout/message`,
    to: clientNumber,
    from: resturantNumber,
  }, (err, call) => {
    console.log(call.sid);
  });
}


module.exports = { sendSMS, callRestaurants };
