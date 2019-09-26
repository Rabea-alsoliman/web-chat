const router = require('express').Router();

const authGuard = require('./guards/auth.guard');
const bodyParser = require('body-parser').urlencoded({ extended: true });

const profileController = require('../controllers/profile.controller');

router.get('/', authGuard.isAuth, bodyParser, profileController.getProfile);

router.get('/:id', authGuard.isAuth, bodyParser, profileController.getProfile);

module.exports = router;
