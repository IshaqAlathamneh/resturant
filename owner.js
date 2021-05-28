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
  socket.on('send', payload => {
    console.log(payload);
  });

  socket.on('send Obj', payload => {
    console.log(payload);
    socket.emit('first delivered', payload)

  })
  socket.on('order with price', payload => {
    socket.emit('theLast', payload)
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