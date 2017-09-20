/**
 * STATION REDUCER
 */

import { combineReducers } from 'redux';
import createReducer from '../utils/create-reducer';

import {
    // SETTING_STATIONS,
    SETTING_STATIONS_SUCCESS,
    // SETTING_STATIONS_FAILED,
    FETCHING_JOURNEYS,
    FETCHING_JOURNEYS_SUCCESS,
    FETCHING_JOURNEYS_FAILED
} from './types';





/**
 * SET STATIONS
 */
function setSelectedStations(state, action) {
    return {
        origin: action.payload.origin,
        destination: action.payload.destination
    };
}

const stationsReducer = createReducer({
    origin: '',
    destination: ''
}, {
    [SETTING_STATIONS_SUCCESS]: setSelectedStations,
});


/**
 * FETCH JOURNEYS
 */
function setJourneys(state, action) {
    return action.payload;
}

const journeysReducer = createReducer([], {
    [FETCHING_JOURNEYS_SUCCESS]: setJourneys,
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
    [FETCHING_JOURNEYS] : handleUIFetching,
    [FETCHING_JOURNEYS_SUCCESS]: handleUISuccess,
    [FETCHING_JOURNEYS_FAILED] : handleUIError,
});



/**
 * SELECTORS
 */

export const selectIsFetching = state => state.journey.ui.isFetching;

export const selectIsError = state => state.journey.ui.isError;

export const selectOrigin = state => state.journey.stations.origin;

export const selectDestination = state => state.journey.stations.destination;

export const selectJourneys = state => state.journey.journeys;

// Export combined reducer
export default combineReducers({
    stations: stationsReducer,
    journeys: journeysReducer,
    ui: uiReducer
});


