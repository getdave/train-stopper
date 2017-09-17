/**
 * STATION REDUCER
 */

import { combineReducers } from 'redux';
import createReducer from '../../utils/create-reducer';

import {
    FETCHING_STATIONS,
    FETCHING_STATIONS_SUCCESS,
    FETCHING_STATIONS_FAILED
} from './types';


/**
 * DATA
 */
function updateStations(state, action) {
    return action.payload;
}

const dataReducer = createReducer([], {
    [FETCHING_STATIONS_SUCCESS]: updateStations,
});



/**
 * UI
 */
function handleUIFetching(state, action) {
    return {
        isError: false,
        isFetching: true
    }
}

function handleUISuccess(state, action) {
    return {
        isError: false,
        isFetching: false
    }
}

function handleUIError(state, action) {
    return {
        isError: true,
        isFetching: false
    }
}

const uiReducer = createReducer({
    isFetching: false,
    isError: false
}, {
    [FETCHING_STATIONS] : handleUIFetching,
    [FETCHING_STATIONS_SUCCESS]: handleUISuccess,
    [FETCHING_STATIONS_FAILED] : handleUIError,
});



// Export combined reducer
export default combineReducers({
    data: dataReducer,
    ui: uiReducer
});


