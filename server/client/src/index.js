import 'bootstrap/dist/css/bootstrap.css';
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



/**
 * RENDER APP
 */
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

registerServiceWorker();