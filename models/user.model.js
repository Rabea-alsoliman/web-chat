const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const DB_URL = 'mongodb://localhost:27017/chat-app';

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: { type: String, default: 'default-user-image.png' },
    isOnline: { type: Boolean, default: false },
    friedns: {
        type: [{ name: String, image: String, id: String }],
        default: []
    },
    friednRequests: {
        type: [{ name: String, id: String }],
        default: []
    },
    sentRequests: {
        type: [{ name: String, id: String }],
        default: []
    }
});

const User = mongoose.model('user', userSchema);
exports.User = User;

exports.getUserData = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return User.findById(id);
            })
            .then(data => {
                mongoose.disconnect()
                resolve(data);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.sendFriendRequest = async (data) => {
    // add my data to friend friendRequests
    // add friend data to me sentRequests
    try {
        await mongoose.connect(DB_URL);
    await User.updateOne(
        { _id: data.findById },
        { 
            $push: { 
                friendRequests: { name: data.friendNmae, id: data.friendId } 
            } 
        }
    );
    await User.updateOne(
        { _id: data.myId },
        { 
            $push: {
                sentRequests: { name: data.friendNmae, id: data.friendId } 
            } 
        }
    );
    mongoose.disconnect();
    return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
};

exports.cancelFriendRequest  = async (data) => {
    // remove me from friend friendRequests
    // remove friend from my sentRequests
    try {
        await mongoose.connect(DB_URL);
    await User.updateOne(
        { _id: data.findById },
        { 
            $pull: { 
                friendRequests: { id: data.friendId } 
            } 
        }
    );
    await User.updateOne(
        { _id: data.myId },
        { 
            $pull: {
                sentRequests: { id: data.friendId } 
            } 
        }
    );
    mongoose.disconnect();
    return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
};

exports.acceptFriendRequest  = () => {};

exports.rejectFriendRequest  = () => {};

exports.deleteFriend = () => {};