var router = require('express').Router();

// api router will mount other routers
router.use('/users', require('./user/userRoutes'));
router.use('/auth', require('./auth/routes'));

module.exports = router;
