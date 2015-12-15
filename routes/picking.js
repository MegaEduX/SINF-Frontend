var express = require('express');
var checkToken = require('../api/auth/auth').checkToken;
var router = express.Router();

router.get('/create', checkToken(), function(req, res, next) {
    var cart = JSON.parse(req.cookies.itemsCart);

    var RouteModel = require('../api/route/routeModel');
    var User = require('../api/user/userModel');

    console.log('Got here.');
    console.log(req.cookies.itemsCart);
    User.findById(req.user._id).then(function(user) {
        try {
            var r = new RouteModel({
                username: user.username,
                objects: cart,
                picked: [],
                date: Date.now()
            });
        } catch (e) {
            console.log("Exception! - " + e);
        }

        r.save(function(err, route) {
            if (err == null) {
                res.redirect('/routes/' + route.id);
            } else {
                console.log(err);
            }
        });
    });
});

router.get('/', checkToken(), function(req, res, next) {
    var cart = [];

    try {
        cart = JSON.parse(req.cookies.itemsCart);
    } catch (e) {

    }

    res.render('picking', { title: 'Confirm Picking Route Creation', level: req.user.level, toPick: cart });
});

module.exports = router;
