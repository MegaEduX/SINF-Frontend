var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./controller');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/login', verifyUser(), controller.login);

module.exports = router;
