var path = require('path');
var http = require('http');
var express = require('express');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
const io = socketio(server);

// static 폴더 설정
app.use(express.static(path.join(__dirname, 'public')));

// 
io.on('connection', socket => { 
    console.log('New WS Connection...');
});

server.listen(3000, () => console.log('Server running on port 3000'));