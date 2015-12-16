var express = require('express');
var router = express.Router();
var config = require('../config/config');
var checkToken = require('../api/auth/auth').checkToken;
var User = require('../api/user/userModel');

var _ = require('underscore');

var request = require('request');

router.get('/:id', checkToken(), function(req, res, next) {
    var RouteModel = require('../api/route/routeModel');

    RouteModel.findById(req.params.id, function(err, route) {
        if (err == null) {
            console.log(route);
            res.render('route', {title: 'Route', level: req.user.level, route: route});
        } else {
            //  Handle Error
        }
    });
});

router.get('/', checkToken(), function(req, res, next) {
    var RouteModel = require('../api/route/routeModel');

    User.findById(req.user._id).then(function(user) {
        RouteModel.find({username: user.username}).exec(function(err, routes) {
            if (err == null) {
                res.render('routes', { title: 'Routes', level: req.user.level, routes: routes });
            } else {
                //  Handle Error!
            }
        });
    });
});

module.exports = router;
