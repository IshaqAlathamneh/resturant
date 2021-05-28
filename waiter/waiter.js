'use strict';
const io = require('socket.io-client');
// I want to connect to this host
const host = 'http://localhost:3000/waiter';
const host2 = 'http://localhost:3000';

// const host = 'https://myapp.heroku.com';
let sum = 0
const waiterConnection = io.connect(host)
const socket = io.connect(host2)
  // console.log(sum);
waiterConnection.on('first delivered', waiterHandler);

function waiterHandler(payload) {
  console.log('payload from the waiter', payload);
  waiterConnection.on('completed', (confirm) => {
    console.log(confirm);
    if (payload.Meal === 'Shawrma regular sandwich') {
      payload.thePrice = parseInt(payload.Quantity) * 0.75
    }
    if (payload.Meal === 'Shawrma super sandwich') {
      payload.thePrice = parseInt(payload.Quantity) * 1.25
    }
    if (payload.Meal === 'Fahita') {
      payload.thePrice = parseInt(payload.Quantity) * 2.20
    }
    if (payload.Meal === 'Zenger') {
      payload.thePrice = parseInt(payload.Quantity) * 2.25
    }
    sum = sum + payload.thePrice
    socket.emit('order with price', payload)
  });

}