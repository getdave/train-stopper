/**
 * STATION REDUCER
 */

import { combineReducers } from 'redux';
import createReducer from '../utils/create-reducer';

import {
    FETCHING_STATION_SERVICES,
    FETCHING_STATION_SERVICES_SUCCESS,
    FETCHING_STATION_SERVICES_FAILED,
    FETCHING_SERVICE_SUCCESS,
    SETTING_USERINPUT_SUCCESS
} from './types';



/**
 * JOURNEYS
 */
function setStationServices(state, action) {
    return action.payload;
}

const stationServicesReducer = createReducer([], {
    [FETCHING_STATION_SERVICES_SUCCESS]: setStationServices,
});

/**
 * SERVICE
 */
function handleService(state, action) {
    return {
        origin: action.payload.data[0],
        destination: action.payload.data[1],
        trainUid: action.payload.trainUid
    }
}

const serviceReducer = createReducer({
    origin: '',
    destination: '',
    trainUid: '',
}, {
    [FETCHING_SERVICE_SUCCESS]: handleService,
});



/**
 * USER INPUT REDUCER
 */
function handleUserInput(state, action) {
    return {
        originStation: action.payload.originStation,
        destinationStation: action.payload.destinationStation,
        date: action.payload.date
    }
}

const userInputReducer = createReducer({
    originStation: '',
    destinationStation: '',
    date: ''
}, {
    [SETTING_USERINPUT_SUCCESS]: handleUserInput,
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
    [FETCHING_STATION_SERVICES] : handleUIFetching,
    [FETCHING_STATION_SERVICES_SUCCESS]: handleUISuccess,
    [FETCHING_STATION_SERVICES_FAILED] : handleUIError,
});



/**
 * SELECTORS
 */

export const selectIsFetching = state => state.journey.ui.isFetching;

export const selectIsError = state => state.journey.ui.isError;

export const selectOrigin = state => state.journey.userInput.originStation;

export const selectDestination = state => state.journey.userInput.destinationStation;

export const selectStationServices = state => state.journey.stationServices;

export const selectService = state => state.journey.service;

export const selectDate = state => state.journey.userInput.date;

// export const selectTime = state => state.journey.userInput.time;


// Export combined reducer
export default combineReducers({
    // active: activeReducer,
    service: serviceReducer, // specific details about the specific train journey "service"
    stationServices: stationServicesReducer, // refers to list of possible journeys loaded from train API
    ui: uiReducer,
    userInput: userInputReducer,
});


