var express = require('express');
var router = express.Router();
var checkToken = require('../api/auth/auth').checkToken;

/* GET home page. */
router.get('/', checkToken(), function(req, res, next) {
  res.render('index', { title: 'Home', level: req.user.level });
});

module.exports = router;
