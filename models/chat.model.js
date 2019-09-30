const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/chat-app';

const chatSchema = mongoose.Schema({
    users: [String]
});

const Chat = mongoose.model('chat', chatSchema);
exports.Chat = Chat;