var router = require('express').Router();
var controller = require('./userController');
var auth = require('../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/')
  .get(controller.get)
  .post(checkUser, controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

module.exports = router;
