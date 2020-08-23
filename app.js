var path = require('path');
var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var formatMessage = require('./utils/messages');
const { format } = require('path');

var app = express();
var server = http.createServer(app);
const io = socketio(server);

// static 폴더 설정
app.use(express.static(path.join(__dirname, 'public')));

// client가 연결 했을 때
io.on('connection', socket => { 
    const botName = 'ChatDSM'
    socket.emit('message', formatMessage(botName, 'Welcome to ChatDSM!'));

    // connects가 있을 때 방송
    socket.broadcast.emit('message', formatMessage(botName, '유저가 들어왔습니다.'));

    // client가 비연결 했을 때
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, '유저가 나갔습니다.'));
    })

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg));
    })
});

server.listen(3000, () => console.log('Server running on port 3000'));