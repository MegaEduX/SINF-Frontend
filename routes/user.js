var express = require('express');
var router = express.Router();
var checkToken = require('../api/auth/auth').checkToken;
var userModel = require('../api/user/userModel');
/* GET users listing. */
router.get('/', checkToken(), function(req, res, next) {
	userModel.findById(req.user._id)
	    .select('-password')
	    .select('-__v')
	    .exec()
	    .then(function(user){
	    	console.log(user);
	      res.render('user', { title: 'User Info', level: req.user.level, user: user});
	    }, function(err){
	    	res.render('user', { title: 'User Info', level: req.user.level, error: err });		  
	  	});
});	
module.exports = router;