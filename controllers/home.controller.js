const userModel = require('../models/user.model');

exports.getHome = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Home',
        isUser: req.session.userId,
        friendRequests: req.friendRequests // get friend requests from first millerware in the system
    });
};

