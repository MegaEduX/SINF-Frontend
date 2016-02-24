var express = require('express');
var router = express.Router();
var checkToken = require('../api/auth/auth').checkToken;
var userModel = require('../api/user/userModel');
/* GET users listing. */
router.get('/', checkToken(), function(req, res, next) {
	var levels = [{name: "Worker", code: 0}, {name: "Admin", code: 1}, {name: "Manager", code: 2}];
	if (req.user.level >= 1) {
		userModel.find({})
	    .select('-password')
	    .select('-__v')
	    .exec()
	    .then(function(users){
	      res.render('users', { title: 'Users', level: req.user.level, users: users, levels: levels });
	    }, function(err){
	    	res.render('users', { title: 'Users', level: req.user.level, error: err, levels: levels });		  
	  	});
	  
	} else {
		res.redirect('/');
	}
});

module.exports = router;
