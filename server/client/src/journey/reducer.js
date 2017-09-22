/**
 * STATION REDUCER
 */

import { combineReducers } from 'redux';
import createReducer from '../utils/create-reducer';

import {
    SETTING_STATIONS_SUCCESS,
    FETCHING_JOURNEYS_LIST,
    FETCHING_JOURNEYS_LIST_SUCCESS,
    FETCHING_JOURNEYS_LIST_FAILED,
    FETCHING_SERVICE_SUCCESS,
    SETTING_DATETIME_SUCCESS
} from './types';





/**
 * STATIONS
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
 * JOURNEYS
 */
function setJourneys(state, action) {
    return action.payload;
}

const journeysReducer = createReducer([], {
    [FETCHING_JOURNEYS_LIST_SUCCESS]: setJourneys,
});

/**
 * SERVICE
 */
function handleService(state, action) {
    return {
        origin: action.payload[0],
        destination: action.payload[1]
    }
}

const serviceReducer = createReducer({
    origin: '',
    destination: ''
}, {
    [FETCHING_SERVICE_SUCCESS]: handleService,
});



/**
 * DATE TIME
 */
function handleDatetime(state, action) {
    return {
        date: action.payload.date,
        time: action.payload.time
    }
}

const datetimeReducer = createReducer({
    date: '',
    time: ''
}, {
    [SETTING_DATETIME_SUCCESS]: handleDatetime,
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
    [FETCHING_JOURNEYS_LIST] : handleUIFetching,
    [FETCHING_JOURNEYS_LIST_SUCCESS]: handleUISuccess,
    [FETCHING_JOURNEYS_LIST_FAILED] : handleUIError,
});



/**
 * SELECTORS
 */

export const selectIsFetching = state => state.journey.ui.isFetching;

export const selectIsError = state => state.journey.ui.isError;

export const selectOrigin = state => state.journey.stations.origin;

export const selectDestination = state => state.journey.stations.destination;

export const selectJourneys = state => state.journey.journeys;

export const selectService = state => state.journey.service;

export const selectDatetime = state => state.journey.datetime;

// Export combined reducer
export default combineReducers({
    // active: activeReducer,
    datetime: datetimeReducer, // desired date and time entered by the user into form 
    stations: stationsReducer, // origin and destination stations for this trip
    service: serviceReducer, // specific details about the specific train journey "service"
    journeys: journeysReducer, // refers to list of possible journeys loaded from train API
    ui: uiReducer
});


