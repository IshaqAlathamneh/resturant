'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const http = require('http').createServer(app);
app.use(express.static(path.join(__dirname, 'public')))
const io = require('socket.io')(http);
// const { Server } = require("socket.io");
// const io = new Server(server);

const port = process.env.PORT;

io.on('connection', (socket) => {
  console.log('a user connected with ID --->', socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  // socket.on('send', payload => {
    //   console.log(payload);
    // });
    let btata;
    let sum = 0;
  socket.on('send Obj', payload => {
    console.log(payload);
    // socket.emit('first delivered', payload)
    console.log('inside first de');
    if (payload.Meal === 'Shawrma regular sandwich') {
      payload.thePrice = parseInt(payload.Quantity) * 0.75;
    }else if (payload.Meal === 'Shawrma super sandwich') {
      payload.thePrice = parseInt(payload.Quantity) * 1.25;
    }else if (payload.Meal === 'fahita') {
      payload.thePrice = parseInt(payload.Quantity) * 2.20;
    }else if (payload.Meal === 'zenger') {
      payload.thePrice = parseInt(payload.Quantity) * 2.25;
      console.log(payload.thePrice);
    }
    sum = sum + payload.thePrice
    console.log('payload from the waiter', payload, '-----'+sum);
    btata = payload
    setTimeout(()=>{
      console.log('inside timeout');
      socket.emit('profit', sum)
    },5000)
    
  })
  socket.on('completed', (confirm) => {
    console.log('inside completed', btata);
    console.log(confirm);
    socket.emit('last', btata)
    // socket.emit('order with price', payload)
  });
  // socket.on('order with price', payload => {
  //   socket.emit('theLast', payload)
  // })
  // socket.on('first delivered', (payload) => {


  // })

});
app.get('/waiter', (req, res) => {
  res.sendFile(__dirname + '/public/waiter.html')
})



http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});



// const io = require('socket.io')(port);

const resManage = io.of('/waiter'); // namespace
// connection : is an event that will be fired
// when a client connects to the brain server

// namespace localhost:3000/health-system


// io.on('connection', (socket)=> {
//     // console.log(socket);
//     console.log('A CLIENT GOT CONNECTED TO HOME : socket.id', socket.id);
//     // do whatever ... fire an event .. 

//     socket.on('sun-light', (payload)=> {
//         // broadcast
//         io.emit('brightness', payload);
//     });

// });


// when someone connects to http://localhost:3000/health-system
resManage.on('connection', (socket) => {
  console.log('A CLIENT GOT CONNECTED TO resManage : socket.id', socket.id);
})