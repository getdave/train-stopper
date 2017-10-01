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


// UPDATING
function handleUpdatingTrackerSuccess(state, action) { 
    const { payload } = action;

    const newState = {
        ...state,
        byId: {
            ...state.byId,
            [payload.uid]: payload
        }
    }

    return newState; // Array
}


const trackersReducer = createReducer(getInitialDataState(), {
    [TYPES.FETCHING_TRACKERS_SUCCESS]: handFetchingTrackersSuccess,
    [TYPES.FETCHING_TRACKERS_FAILED]: getInitialDataState,
    [TYPES.CREATING_TRACKER_SUCCESS]: handleCreatingTrackerSuccess,
    [TYPES.CREATING_TRACKER_FAILED]: getInitialDataState,
    [TYPES.UPDATING_TRACKER_SUCCESS]: handleUpdatingTrackerSuccess,
});


/**
 * SETTING CURRENT
 * sets the "current" tracker ID into state 
 */
function handleSettingCurrentTrackerSuccess(state, action) {
    return action.payload; // the selected tracker's uid
}

const currentReducer = createReducer(false, {
    [TYPES.SETTING_CURRENT_TRACKER_SUCCESS]: handleSettingCurrentTrackerSuccess,
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
    [TYPES.UPDATING_TRACKER] : handleUIFetching,
    [TYPES.UPDATING_TRACKER_FAILED]: handleUIError,
    [TYPES.UPDATING_TRACKER_SUCCESS]: handleUISuccess
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


export const selectCurrentTracker = (state) => {
    const currentTrackerId = state.trackers.current;
    if (!currentTrackerId) {
        return false;
    }
    return selectTracker(state, currentTrackerId);
}

// Export combined reducer
export default combineReducers({
    data: trackersReducer,
    ui: uiReducer,
    current: currentReducer
});


