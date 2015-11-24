var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res, next) {
    console.log(req.cookies);
    res.render('route', { title: 'Route' });
});

module.exports = router;
