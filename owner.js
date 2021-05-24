'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT;
app.set('view engine', 'ejs');
app.use(express.static('./public/'));
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected with ID --->', socket.id);
});

server.listen(port, () => {
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
resManage.on('connection', (socket)=> {
    console.log('A CLIENT GOT CONNECTED TO resManage : socket.id', socket.id);
    

})