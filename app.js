const express = require('express');
const path = require('path');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const socketIO = require('socket.io');
const homeRouter = require('./routes/home.route');
const authRouter = require('./routes/auth.route');
const profileRouter = require('./routes/profile.route');
const friendRouter = require('./routes/friend.route');

const getFriendRequests = require('./models/user.model').getFriendRequests;

const app = express();
// create server to use it in socketIO 
const server = require('http').createServer(app);
// set up socketIO on my server 
const io = socketIO(server);

io.onlineUsers = {};

require('./sockets/friend.socket')(io);
require('./sockets/init.socket')(io);    


app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(flash());

const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/chat-app',
    collection: 'sessions'
});

app.use(
    session({
        secret: 'this is my secret secret to hash hash th hash',
        saveUninitialized: false,
        store: STORE
    })
);

app.set("view engine", "ejs");
app.set("views", "views"); //default value


// create millerwate to send it to next midllewates ...
app.use((req, res, next) => {
    if (req.session.userId) {
        getFriendRequests(req.session.userId).then(requests => {
            req.friendRequests = requests
            next()
        }).catch(err => res.redirect('/error'))
    } else {
        next()
    }
})

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/friend", friendRouter);

app.get('/error', (req, res, next) => {
    res.status(500)
    res.render('error.ejs', {
        isUser: req.session.userId,
        friendRequests: req.friendRequests,
        pageTitle: 'Error'
    });
});

app.use((req, res, next) => {
    res.status(404);
    res.render('not-found', {
        isUser: req.session.userId,
        friendRequests: req.friendRequests,
        pageTitle: "Page Not Found"
    });
});

const port = process.env.PORT || 3000;

server.listen(3000, () => {
    console.log('server listen on port ' + port)
});
