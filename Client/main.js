// client/main.js
const socket = io();

// Send message
document.getElementById('send-button').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    if (message.trim()) {
        socket.emit('chatMessage', message);
        document.getElementById('message-input').value = '';
    }
});

// Receive message
socket.on('chatMessage', (message) => {
    const messageBox = document.getElementById('message-box');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    messageBox.appendChild(newMessage);
    messageBox.scrollTop = messageBox.scrollHeight;
});

