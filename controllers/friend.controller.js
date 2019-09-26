const userModel = require('../models/user.model');

exports.add = (req, res, next) => {
    userModel
        .sendFriendRequest(req.body)
        .then(() => {
            res.redirect('/profile/' + req.body.frindId);
        })
        .catch(err => {
            res.redirect('/error');
        });
};

exports.cancel = (req, res, next) => {
    userModel
        .cancelFriendRequest(req.body)
        .then(() => {
            res.redirect('/profile/' + req.body.frindId);
        })
        .catch(err => {
            res.redirect('/error');
        });
};

exports.accept = (req, res, next) => {};

exports.reject = (req, res, next) => {};

exports.delete = (req, res, next) => {};