var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    var cart = JSON.parse(req.cookies.itemsCart);

    res.render('picking', { title: 'Items for Picking', toPick: cart });
});

module.exports = router;
