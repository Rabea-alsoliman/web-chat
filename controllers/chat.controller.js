const messageModel = require('../models/message.modle');
const chatModel = require('../models/chat.model');

exports.getChat = (req, res, net) => {
    let chatId = req.params.id;
    messageModel.getMessages(chatId).then(messages => {
        if (messages.length === 0) {
            chatModel.getChat(chatId).then(chat => {
                let friendData = chat.users.find(
                    user => user._id != req.session.userId
                )
                res.render('chat', {
                    pageTitle: friendData.username,
                    isUser: req.session.userId,
                    messages: messages,
                    friendRequests: req.friendRequests,
                    friendData: friendData,
                    chatId: chatId
                });
            })
        } else {
            let friendData = messages[0].chat.users.find(
                user => user._id != req.session.userId
            )
            res.render('chat', {
                pageTitle: friendData.username,
                isUser: req.session.userId,
                friendRequests: req.friendRequests,
                messages: messages,
                friendData: friendData,
                chatId: chatId
            });
        }
    });
};
