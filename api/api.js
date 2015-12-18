var router = require('express').Router();

// api router will mount other routers
router.use('/users', require('./user/userRoutes'));
router.use('/auth', require('./auth/routes'));
router.use('/routes', require('./route/routeRoutes'));
module.exports = router;
