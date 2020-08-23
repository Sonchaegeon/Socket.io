var chatForm = document.getElementById('chat-form');

var socket = io();

// Server에서 받은 메세지
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

// Message 전송
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // mesaage text 가져오기
    var msg = e.target.elements.msg.value;

    // 서버로 message emit
    socket.emit('chatMessage', msg);
})

// DOM으로 message 보내기
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p>asda</p>
        <p>${message}</p>
    `;
    document.querySelector('.chat-messages').appendChild(div);
}