var router = require('express').Router();
var controller = require('./routeController');

router.param('id', controller.paramId);

router.route('/')
	.get(controller.get)
	
router.route('/:id')
  .put(controller.put)
  .get(controller.getOne)
  .delete(controller.delete)

module.exports = router;
