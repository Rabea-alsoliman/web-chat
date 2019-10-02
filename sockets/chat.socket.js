const newMessage = require('../models/message.modle').newMessage;

module.exports =  io => {
    io.on('connection', socket => {
        socket.on('joinChat', chatId => {
            socket.join(chatId)
        })

        socket.on('sendMessage', (msg , cb) => {
            newMessage(msg).then(() => {
                io.to(msg.chat).emit('newMessage', msg);
                cb();
            });
        });
    });
};