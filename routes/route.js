var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res, next) {
    console.log(req.cookies);

    if (req.cookies.itemsCart) {
        //  the route has to be calculated.

        res.render('route', { title: 'Route', route: JSON.parse(req.cookies.itemsCart) });
    } else
        res.render('message', { title: 'Error!', description: 'No route provided.' });

    res.render('route', { title: 'Route' });
});

module.exports = router;
