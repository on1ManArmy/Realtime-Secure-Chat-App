// Node server which will handle sockeet io connections
const io = require('socket.io')(8000)

const user = {};

io.on('connection', socket =>{
    // if any new user, joins we call it -- let others user to connected 
    socket.on('new-user-joined', name =>{
        // console.log('New User', name);
        user[socket.id] = name; // name user update ho gya
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message broadcast to all
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: user[socket.id]})
    });
    // If someone leaves a chat broadcast to all
    socket.on('disconnect', message =>{
        socket.broadcast.emit('Left', user[socket.id]);
        delete user[socket.id];
    });


})