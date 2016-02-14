var User = require('./userModel');
var _ = require('lodash');
var signToken = require('../auth/auth').signToken;

exports.params = function(req, res, next, id) {
  User.findById(id)
    .select('-password')
    .exec()
    .then(function(user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.IdedUser = user;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  User.find({})
    .select('-password')
    .select('-__v')
    .exec()
    .then(function(users){
      res.json(users.map(function(user){
        return user.toJson();
      }));
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var user = req.IdedUser.toJson();
  res.json(user);
};

exports.put = function(req, res, next) {
  var user = req.IdedUser;

  var update = req.body;

  _.merge(user, update);

  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved.toJson());
    }
  })
};

exports.post = function(req, res, next) {
  req.body.role.code = Number(req.body.role.code);
  var newUser = new User(req.body);
  
  newUser.save(function(err, user) {
    if(err) { 
      console.log("error");
      return next(err);
    }

    var token = signToken(user._id);
    res.json({token: token});
  });
};

exports.delete = function(req, res, next) {
  req.IdedUser.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed.toJson());
    }
  });
};

exports.me = function(req, res) {
  res.json(req.IdedUser.toJson());
};
