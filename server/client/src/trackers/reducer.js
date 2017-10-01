/**
 * STATION REDUCER
 */

import { combineReducers } from 'redux';
import createReducer from '../utils/create-reducer';

import * as TYPES from './types';



/**
 * TRACKERS
 */

// FETCHING
function handFetchingTrackersSuccess(state, action) {
    return action.payload; // Array
}

// SETTING
function handleSettingTrackerSuccess(state, action) {
    return action.payload; // Array
}

const trackersReducer = createReducer([], {
    [TYPES.FETCHING_TRACKERS_SUCCESS]: handFetchingTrackersSuccess,
    [TYPES.SETTING_TRACKER_SUCCESS]: handleSettingTrackerSuccess,
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
    [TYPES.FETCHING_TRACKERS] : handleUIFetching,
    [TYPES.FETCHING_TRACKERS_SUCCESS]: handleUISuccess,
    [TYPES.FETCHING_TRACKERS_FAILED] : handleUIError,
    [TYPES.SETTING_TRACKER] : handleUIFetching,
    [TYPES.SETTING_TRACKER_SUCCESS]: handleUISuccess,
    [TYPES.SETTING_TRACKER_FAILED] : handleUIError,
});



/**
 * SELECTORS
 */

export const selectTrackers = state => state.trackers.data;

export const selectIsFetching = state => state.trackers.ui.isFetching;

export const selectIsError = state => state.trackers.ui.isError;


// Export combined reducer
export default combineReducers({
    data: trackersReducer,
    ui: uiReducer,
});


