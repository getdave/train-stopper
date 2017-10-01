/**
 * STATION REDUCER
 */

import { combineReducers } from 'redux';
import createReducer from '../utils/create-reducer';
import { keyBy } from 'lodash';
import * as TYPES from './types';


const getInitialDataState = () => ({
    byId: {},
    allIds: []
});

/**
 * TRACKERS
 */

// FETCHING
function handFetchingTrackersSuccess(state, action) {

    const { payload } = action;
    const keyByUid = item => item.uid;

    const newState = {
        byId: keyBy(payload, keyByUid),
        allIds: payload.map(keyByUid)
    }

    return newState; // Array
}

// SETTING
function handleSettingTrackerSuccess(state, action) {
    //return action.payload; // Array
    
    const { payload } = action;
    const keyByUid = item => item.uid;

    const newState = {
        byId: keyBy(payload, keyByUid),
        allIds: payload.map(keyByUid)
    }

    return newState; // Array

}

const trackersReducer = createReducer(getInitialDataState(), {
    [TYPES.FETCHING_TRACKERS_SUCCESS]: handFetchingTrackersSuccess,
    [TYPES.FETCHING_TRACKERS_FAILED]: getInitialDataState,
    [TYPES.CREATING_TRACKER_SUCCESS]: handleSettingTrackerSuccess,
    [TYPES.CREATING_TRACKER_FAILED]: getInitialDataState,
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
    [TYPES.CREATING_TRACKER] : handleUIFetching,
    [TYPES.CREATING_TRACKER_SUCCESS]: handleUISuccess,
    [TYPES.CREATING_TRACKER_FAILED] : handleUIError,
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


