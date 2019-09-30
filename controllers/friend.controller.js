const userModel = require('../models/user.model');

// exports.add = (req, res, next) => {
//     // add user1 data to user2 friend requests
//     // add user2 data to user1 sent requests

//     userModel
//         .sendFriendRequest(req.body)
//         .then(() => {
//             res.redirect('/profile/' + req.body.frindId);
//         })
//         .catch(err => {
//             res.redirect('/error');
//         });
// };

exports.cancel = (req, res, next) => {
    userModel
        .cancelFriendRequest(req.body)
        .then(() => {
            res.redirect('/profile/' + req.body.friendId);
        })
        .catch(err => {
            res.redirect('/error');
        });
};

exports.accept = (req, res, next) => {
    userModel
        .acceptFriendRequest(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/error');
        });
};
                        

exports.reject = (req, res, next) => {
    userModel
        .rejectFriendRequest(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.redirect('/error');
        });
};

exports.delete = (req, res, next) => {
    userModel
        .deleteFriend(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.redirect('/error');
        });
};