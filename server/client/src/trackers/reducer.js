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

// CREATING
function handleCreatingTrackerSuccess(state, action) { 
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
    [TYPES.CREATING_TRACKER_SUCCESS]: handleCreatingTrackerSuccess,
    [TYPES.CREATING_TRACKER_FAILED]: getInitialDataState,
});


/**
 * TRACKER
 * get a single Tracker
 */
function handleFetchingTrackerSuccess(state, action) {
    return action.payload; // the selected tracker object
}

const currentReducer = createReducer({}, {
    [TYPES.FETCHING_TRACKER_SUCCESS]: handleFetchingTrackerSuccess,
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
export const selectTrackers = state => {
    const trackersState = state.trackers.data;
    return trackersState.allIds.map( id => trackersState.byId[id] );
};

export const selectTracker = (state, id) => state.trackers.data.byId[id];

export const selectIsFetching = state => state.trackers.ui.isFetching;

export const selectIsError = state => state.trackers.ui.isError;


export const selectCurrentTracker = state => state.trackers.current;

// Export combined reducer
export default combineReducers({
    data: trackersReducer,
    ui: uiReducer,
    current: currentReducer
});


