'use strict';

// const { io } = require("socket.io-client");

const socket = io()
  // Get the modal
console.log(socket);
socket.emit('send', { hi: 'asdsa' })
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
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
// socket.on('first delivered', payload => {
//   console.log(payload);
//   // let response = document.getElementsById('foodResponse')

// })

// socket.on('theLast', (payLoad) => {
//   console.log('the last', payLoad);
// })
socket.on('last', payload => {
  swal("Hi Client", `Your Order (${payload.Meal}) is prepared`);
})

// `You order ${payload.Quantity} ${payload.Meal} and u have to pay ${payload.thePrice}`