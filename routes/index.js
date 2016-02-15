var express = require('express');
var router = express.Router();
var checkToken = require('../api/auth/auth').checkToken;
var RouteModel = require('../api/route/routeModel');
var User = require('../api/user/userModel');

/* GET home page. */
router.get('/', checkToken(), function(req, res, next) {
	
  User.findById(req.user._id).then(function(user) {
    RouteModel.find({username: user.username}).exec(function(err, routes) {
      routesInfo = [];
      if (err == null) {
        for (var idx in routes) {
          var route = routes[idx];
          if (route.finished) {
          	continue;
          }

          var picked = 0;
          var total = 0;
          for (var objIdx in route.objects) {
          	total++;
            if (route.objects[objIdx].picked == true) {
            	picked++;
            }
          }
          var temp = {
          	left: total - picked,
          	date: new Date(routes[idx].date).formatString()
          }
        	routesInfo.push(temp);  
        }
        console.log(routesInfo);
        res.render('index', { title: 'Home', level: req.user.level, routes: routesInfo });
    	} else {
        res.render('index', { title: 'Home', level: req.user.level, routes: routesInfo });
    	}
  	});
  });
  
});

module.exports = router;
