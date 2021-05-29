'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path')
const http = require('http').createServer(app);
app.use(cors)
app.use(express.static(path.join(__dirname, 'public')))

const io = require('socket.io')(http, {
  cors: {
    origin: "https://elephant-project.herokuapp.com/",
    methods: ["GET", "POST"]
  }
});

// const { Server } = require("socket.io");
// const io = new Server(server);
const users = {}
const port = process.env.PORT;

io.on('connection', (socket) => {

  console.log('a user connected with ID --->', socket.id)

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });


  let sum = 0;
  socket.on('send Obj', payload => {
    console.log(payload);
    // socket.emit('first delivered', payload)
    console.log('inside first de');

    if (payload.Meal === 'Shawrma regular sandwich') {
      payload.thePrice = parseInt(payload.Quantity) * 0.75;
    } else if (payload.Meal === 'Shawrma super sandwich') {
      payload.thePrice = parseInt(payload.Quantity) * 1.25;
    } else if (payload.Meal === 'fahita') {
      payload.thePrice = parseInt(payload.Quantity) * 2.20;
    } else if (payload.Meal === 'zenger') {
      payload.thePrice = parseInt(payload.Quantity) * 2.25;
      console.log(payload.thePrice);

    }
    sum = sum + payload.thePrice

    console.log('payload from the waiter', payload, '-----' + sum);

    payload.total = sum

    setTimeout(() => {
      console.log(payload);
      socket.emit('profit', payload)
    }, 5000)

  })
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })


});



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