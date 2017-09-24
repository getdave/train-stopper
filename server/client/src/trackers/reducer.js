/**
 * STATION REDUCER
 */

import { combineReducers } from 'redux';
import createReducer from '../utils/create-reducer';

import * as TYPES from './types';



/**
 * TRACKERS
 */
function handFetchingTrackersSuccess(state, action) {
    return action.payload; // Array
}

const trackersReducer = createReducer([], {
    [TYPES.FETCHING_TRACKERS_SUCCESS]: handFetchingTrackersSuccess,
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
});



/**
 * SELECTORS
 */

// export const selectIsFetching = state => state.journey.ui.isFetching;



// Export combined reducer
export default combineReducers({
    data: trackersReducer,
    ui: uiReducer,
});


