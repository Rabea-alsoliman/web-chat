const express = require('express');
const path = require('path');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const authRouter = require('./routes/auth.route');
const profileRouter = require('./routes/profile.route');
const friendRouter = require('./routes/friend.route');

const app = express();

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


app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/friend", friendRouter);

app.get('/error', (req, res, next) => {
    res.status(500)
    res.render('error.ejs', {
        isUser: req.session.userId,
        pageTitle: 'Error'
    });
});


app.use('/not-found',(req, res, next) => {
    res.status(404)
    res.render('not-found', {
        isUser: req.session.userId,
        pageTitle: "Page Not Found"
    });
});

app.listen(3000, () => {
    console.log('server listen on port 3000')
});
