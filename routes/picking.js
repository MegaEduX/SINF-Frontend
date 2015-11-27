var express = require('express');
var checkToken = require('../api/auth/auth').checkToken;
var router = express.Router();

/* GET login page. */
router.get('/', checkToken(), function(req, res, next) {
    var cart = JSON.parse(req.cookies.itemsCart);

    res.render('picking', { title: 'Items for Picking', toPick: cart });
});

module.exports = router;
