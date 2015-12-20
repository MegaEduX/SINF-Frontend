var express = require('express');
var router = express.Router();
var config = require('../config/config');
var checkToken = require('../api/auth/auth').checkToken;
var User = require('../api/user/userModel');

var _ = require('underscore');
var request = require('request');

Date.prototype.formatString = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();

    var hh = this.getHours().toString();
    var MM = this.getMinutes().toString();
    var ss = this.getSeconds().toString();
    return (dd[1] ? dd : "0"+dd[0]) + "/" + (mm[1] ? mm : "0"+mm[0]) + "/" + yyyy + " " 
        + (hh[1] ? hh : "0"+hh[0]) + ":" + (MM[1] ? MM : "0"+MM[0]) + ":" + (ss[1] ? ss : "0"+ss[0]); // padding
};

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

router.get('/', function(req, res, next) {
    var RouteModel = require('../api/route/routeModel');
    
    User.findById(req.user._id).then(function(user) {
        RouteModel.find({username: user.username}).exec(function(err, routes) {
            if (err == null) {
                for (var idx in routes) {
                    var route = routes[idx];

                    var picked = 0;

                    for (var objIdx in route.objects)
                        if (route.objects[objIdx].picked == true)
                            picked++;

                    routes[idx].picked = picked;
                    routes[idx].dateFormated = new Date(routes[idx].date).formatString();
                }

                res.render('routes', { title: 'Routes', level: req.user.level, routes: routes });
            } else {
                //  Handle Error!
            }
        });
    });
});

module.exports = router;
