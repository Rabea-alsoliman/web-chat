const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/chat-app';

const messageSchema = mongoose.Schema({
    chat: String,
    content: String,
    sender: String,
    timestamp: String,
});

const Chat = mongoose.model('chat', chatSchema);
exports.Chat = Chat;