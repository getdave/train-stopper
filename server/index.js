/**
 * BOOT INDEX
 * 
 * bootstraps the application 
 */

// Environmental variables from our .env file
require('dotenv').config({ path: '.env' });


/**
 * SERVER SETUP
 */

// Express Application
const app 		= require('./app');


// Set port
app.set('port', process.env.PORT || 3000);

// Tell the server to listen 
const server = app.listen(app.get('port'), () => {
	console.log(`Express running on port ${server.address().port}`);
});




