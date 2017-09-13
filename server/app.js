/**
 * APPLICATION
 *
 * main application file. Boostraps the app setup and organises
 * structure and logic
 */


/**
 * DEPENDENCIES
 */
const express 		= require('express');
const helmet        = require('helmet');
const bodyParser 	= require('body-parser');
const path          = require('path');


/**
 * APP FILES
 */
const routes 		= require('./routes');


/**
 * APP SETUP
 */
const app = express();

// Security - https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());

console.log(process.env.NODE_ENV)

// CORs to allow x-domain requests 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `${process.env.PROTCOL}://${process.env.DOMAIN}:${process.env.PORT}`);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Body parser (not bundled with Express by default)
app.use(bodyParser.json({type: '*/*'}));


// Tell Express to use our Route definitions
app.use('/', routes);


// Express only serves static assets in production as webpack handles locally
if (process.env.NODE_ENV === 'production') {    

    // Tell express where our "public" files live
    app.use(express.static( path.resolve(__dirname, 'client', 'build') ) );

    // Tell express to serve index.html if it doesn't recognise the route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;