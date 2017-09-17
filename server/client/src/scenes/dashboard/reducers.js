/**
 * STATION REDUCER
 */

import { combineReducers } from 'redux';
import createReducer from '../../utils/create-reducer';

import {
    FETCHING_STATIONS,
    FETCHING_STATIONS_SUCCESS,
    FETCHING_STATIONS_FAILED,
    SETTING_STATIONS,
    SETTING_STATIONS_SUCCESS,
    SETTING_STATIONS_FAILED
} from './types';


/**
 * STATIONS API
 */
function updateStations(state, action) {
    return action.payload;
}

const stationsReducer = createReducer([], {
    [FETCHING_STATIONS_SUCCESS]: updateStations,
});


/**
 * SET STATIONS
 */
function setSelectedStations(state, action) {
    return action.payload;
}

const selectedStationsReducer = createReducer({
    origin: '',
    destination: ''
}, {
    [SETTING_STATIONS_SUCCESS]: setSelectedStations,
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



/**
 * SELECTORS
 */

export const selectIsFetching = state => state.stations.ui.isFetching;

export const selectIsError = state => state.stations.ui.isError;

export const selectStations = state => state.stations.stations;

// Export combined reducer
export default combineReducers({
    stations: stationsReducer,
    selected: selectedStationsReducer,
    ui: uiReducer
});


