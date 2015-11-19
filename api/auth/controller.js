var User = require('../user/userModel');
var signToken = require('./auth').signToken;

exports.login = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.user._id);
  console.log(token);
  res.json({token: token});
};
