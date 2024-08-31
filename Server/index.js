// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../client')));

class User {
    constructor(username) {
        this.username = username;
    }
}

class Chat {
    constructor() {
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
    }

    getMessages() {
        return this.messages;
    }
}

const chat = new Chat();

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send chat history on connection
    socket.emit('chatMessage', chat.getMessages().join('\n'));

    socket.on('chatMessage', (msg) => {
        chat.addMessage(msg);
        io.emit('chatMessage', msg); // Broadcast to all users
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

