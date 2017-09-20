/**
 * ROUTES
 *
 * entry point for route definitions. Avoid handling domain
 * logic within route handlers. Instead defer to controllers
 * to organise domain logic and return values
 */
const express 		= require('express');
const controllers 	= require('../controllers');

// Init Router
const router 		= express.Router();


// Controller Example
router.get('/api/transport/stations', controllers.transport.stations);
router.get('/api/transport/journeys', controllers.transport.journeys);
router.get('/api/transport/service', controllers.transport.service);




module.exports = router;