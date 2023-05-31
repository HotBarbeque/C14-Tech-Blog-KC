// Importing required modules and routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Mounting the apiRoutes on the '/api' path
router.use('/api', apiRoutes);

// Mounting the homeRoutes on the root path '/'
router.use('/', homeRoutes);

// Mounting the dashboardRoutes on the '/dashboard' path
router.use('/dashboard', dashboardRoutes);

// Catch-all route to handle any other routes not matched above
router.use((req, res) => {
    res.status(404).end();
});

// Exporting the router module
module.exports = router;