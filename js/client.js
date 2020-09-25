// This is alone client.js and we will connect with the nodeserver
const socket = io('http://localhost:8000');

// Get DOM Element in respective js variable
const form = document.getElementById('send-container');
const msgInp = document.getElementById('msgInp');
const msgContainer = document.querySelector(".container");

// Audio will play on receiving msgs
var audio = new Audio('pristine.mp3');

// Function which will append to container
const append = (message, position) =>{

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }
    
}

// if form gets submiited send the msg to the server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = msgInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);

    msgInp.value = '';
})




// Ask new user for/his her name
const name = prompt("Enter your name to join :)");

// if new user joins let recieve the evemt from server
socket.emit('new-user-joined', name);

// New user joined msg, and let the server know
socket.on('user-joined', name=>{

    append(`${name} joined the chat`, 'right');

})

// if socket recieve data, if server sends the message
socket.on('recieve', data=>{

    append(`${data.name}: ${data.message}`, 'left');

})

// if anyone leaves the chat room
socket.on('Left', name=>{

    append(`${name}: Left the chat room`, 'left');

})

