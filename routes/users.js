var express = require('express');
var router = express.Router();
var checkToken = require('../api/auth/auth').checkToken;

/* GET users listing. */
router.get('/', checkToken(), function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
