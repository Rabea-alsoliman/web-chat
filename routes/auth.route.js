const router = require('express').Router();

const bodyParser = require('body-parser');

const check = require('express-validator').check;

const authGuard = require('./guards/auth.guard')

const authContoller = require('../controllers/auth.controller')

router.get('/signup', authGuard.notAuth, authContoller.getSignup)

router.post(
    '/signup', authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check('username').not().isEmpty().withMessage('username is require'),
    check('email').not().isEmpty().withMessage('email is require').isEmail().withMessage('invalid format'),
    
    check('password')
    .not().isEmpty().withMessage('password is require')
    .isLength({min: 6}).withMessage('password must be at least 6 charachters'),
    // (req, res, next) => {
    //     let value = req.body.confirmPassword
    //     return check('confirmPassword').equals(value)
    // },
    // another solution by custom validator midellware
    check('confirmPassword').custom((value, {req}) => {
        if (value === req.body.password) return true
        else throw 'password do not equal'
    }),
    authContoller.postSignup
)

router.get('/login', authGuard.notAuth, authContoller.getLogin)

router.post(
    '/login', authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check('email').not().isEmpty().withMessage('email is require').isEmail().withMessage('invalid format'),
    check('password')
    .not().isEmpty().withMessage('password is require')
    .isLength({min: 6}).withMessage('password must be at least 6 charachters'),
    authContoller.postLogin
)

router.all('/logout', authGuard.isAuth, authContoller.logout)

module.exports = router


