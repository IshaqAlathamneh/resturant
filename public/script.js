'use strict';
// const { io } = require("socket.io-client");
const socket = io('http://localhost:3000')
let useName = '';
// Get the modal
// console.log(socket);

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

btn.onclick = function() {
    modal.style.display = "block";
    appendMessage(`${useName} JOIN THE CHAIR`)
  }
  // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {

  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var myForm = document.getElementById('myForm')
myForm.addEventListener('submit', handelForm);

function handelForm(event) {
  event.preventDefault()
  socket.emit('send Obj', {
    Meal: event.target.foodName.value,
    Quantity: event.target.Quantity.value
  })
}
socket.on('profit', payload => {

  swal("Hi client", `You Have payed ${payload.thePrice} dollars `);

  setTimeout(() => {

    swal("Hi Client", `You order ${payload.Quantity} ${payload.Meal} and u have  payed ${payload.thePrice}`);
  }, 5000)

});


swal({
    text: 'What\'s Your Name',
    content: "input",
    button: {
      text: "Sure!!",
      closeModal: false,
    },
  })
  .then(name => {
    if (!name) throw null;
    useName = name
    console.log(useName);
    return swal(`Welcome ${name} In our Resturant`);
  }).then(() => {



    const name = useName

    appendMessage('You joined')

    socket.emit('new-user', name)

    socket.on('chat-message', data => {
      appendMessage(`${data.name}: ${data.message}`)
    })

    socket.on('user-connected', name => {
      appendMessage(`${name} connected`)
    })

    socket.on('user-disconnected', name => {
      appendMessage(`${name} disconnected`)
    })

    messageForm.addEventListener('submit', e => {
      e.preventDefault()
      const message = messageInput.value
      appendMessage(`You: ${message}`)
      socket.emit('send-chat-message', message)
      messageInput.value = ''
    })

  })

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}