// import 'bootstrap/dist/css/bootstrap.css';
import 'react-widgets/dist/css/react-widgets.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import reducers from './reducers';
import api from './api';
import Poller from './services/poller';
import TrackerManager from './services/trackerManager';

/**
 * CONFIGURE MIDDLEWARES
 */
let middlewares = [];

// Thunk
// provide "api" as arg to all thunks 
const thunk = reduxThunk.withExtraArgument(api);
middlewares.push(thunk);



/**
 * CREATE STORE
 */
const store = createStore(
  reducers,
  applyMiddleware(...middlewares) // must be the last in the chain!
);


const trackerManager 	= new TrackerManager(store);
const boundHandler 		= trackerManager.handleTrackerNotifications.bind(trackerManager);

const poller = new Poller( boundHandler );




if (process.env.NODE_ENV === 'development') {
	window.store = store;
}



/**
 * RENDER APP
 */
ReactDOM.render(
  <Provider store={store}><App poller={poller} /></Provider>,
  document.getElementById('root')
);

registerServiceWorker();