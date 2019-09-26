const userModel = require('../models/user.model');

// exports.redirect = (req, res, next) => {
//     res.redirect('/profile' + req.session.userId);
// };

exports.getProfile = (req, res, next) => {
    let id = req.params.id;
    if(!id) return res.redirect('/profile/' + req.session.userId);
    userModel
        .getUserData(id)
        .then(data => {
            res.render('profile', {
                pageTitle: data.username,
                isUser: true,
                myId: req.session.userId,
                myName: req.session.name,
                myImage: req.session.image,
                username: data.username,
                userImage: data.image,
                friendId: data._id,
                isOwner: id === require.session.userId,
                isFriends: data.friends.find(
                    friend => friend.id === req.session.userId
                ),
                isRequestSent: data.friendRequests.find(
                    friend => friend.id === req.session.userId
                ),
                isRequestRecieved: data.sentRequests.find(
                    friend => friend.id === req.session.userId
                )
            });
        })
        .catch(err => {
            res.redirect('/error');
        })
}