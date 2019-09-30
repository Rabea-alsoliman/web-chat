const {sendFriendRequest, getFriends} = require('../models/user.model')

// prepare notification from server-side  

module.exports = (io) => {
    io.on('connection', socket => {
        socket.on('sendFriendRequests', data => {
            sendFriendRequest(data).then(() => {
                // if sendFriendRequest is done must send to msg done to user that sent msg 
                // by socket emit 
                socket.emit('requestSent')
                // && and send msg receive to another user
                io.to(data.friendId).emit('newFriendRequest', { name: data.myName, id: data.myId })
            }).catch(err => {
                socket.emit('requestFailed')
            });
        });

        socket.on('getOnlineFriends', id => {
            getFriends(id).then(friends => {
                let onlineFriends = friends.filter(friend => io.onlineUsers[friend.id]);
                console.log(onlineFriends);
                socket.emit('onlineFriends', onlineFriends)
            })
        })
    });
};