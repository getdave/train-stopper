import * as TYPES from './types';
import uid from 'uid';
import { timeStampFromDateTime } from '../helpers';
import isPast from 'date-fns/is_past';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import { cloneDeep } from 'lodash';
import { 
    selectTracker,
    selectTrackers
} from './reducer';



export function fetchTrackers() {
    return (dispatch, getState, api) => {         
        dispatch({ 
            type: TYPES.FETCHING_TRACKERS,
        });

        
        return api.fetchTrackers().then(response => {

            if (response.status !== 200) {
                throw new Error(`${response.statusText}`);
            }
            dispatch({ 
                type: TYPES.FETCHING_TRACKERS_SUCCESS,
                payload: response.data
            });       

        }).catch(function (error) {
            dispatch({ 
                type: TYPES.FETCHING_TRACKERS_FAILED,
            });
        }); 
    }
}

export function fetchTracker(trackerId) {
    return (dispatch, getState, api) => {         
        dispatch({ 
            type: TYPES.FETCHING_TRACKER,
        });

        
        return api.fetchTracker(trackerId).then(response => {
            if (response.status !== 200) {
                throw new Error(`${response.statusText}`);
            }
            dispatch({ 
                type: TYPES.FETCHING_TRACKER_SUCCESS,
                payload: response.data
            });       
        }).catch(function (error) {
            dispatch({ 
                type: TYPES.FETCHING_TRACKER_FAILED,
            });
        }); 
    }
}


/**
 * Sets the ID of the tracker
 * which is currently active
 */
export function setCurrentTracker(trackerId) {
    return {
        type: TYPES.SETTING_CURRENT_TRACKER_SUCCESS,
        payload: trackerId
    }
}








export function createTracker(entry) {
    return (dispatch, getState, api) => { 
        
        // Pull out interesting parts of API response for easier access
        const tracker = prepareTrackerEntry(entry);


        dispatch({ 
            type: TYPES.CREATING_TRACKER,
        });

        const arrivalTS = timeStampFromDateTime(tracker.date, tracker.time);

        if (isPast(arrivalTS)) {
            dispatch({ 
                type: TYPES.CREATING_TRACKER_FAILED,
                message: `Cannot create Trackers which have arrived in the past`
            });
        }


        return api.createTracker(tracker).then(response => {

            if (response.status !== 200) {
                throw new Error(`${response.statusText}`);
            }
            dispatch({ 
                type: TYPES.CREATING_TRACKER_SUCCESS,
                payload: response.data
            });  

            

        }).catch(function (error) {
            dispatch({ 
                type: TYPES.CREATING_TRACKER_FAILED,
            });
        }); 
    }
}


function _updateTracker(dispatch, api, trackerId, newTracker) {
    dispatch({ 
        type: TYPES.UPDATING_TRACKER,
    });
    
    return api.updateTracker(trackerId, newTracker).then(response => {
       
        if (response.status !== 200) {
            throw new Error(`${response.statusText}`);
        }
        dispatch({ 
            type: TYPES.UPDATING_TRACKER_SUCCESS,
            payload: response.data
        });       
    }).catch(function (error) {

        dispatch({ 
            type: TYPES.UPDATING_TRACKER_FAILED,
        });
    }); 
}



export function activateTracker(trackerId) {
    return (dispatch, getState, api) => {     

        const state = getState();

        const newTracker = makeFreshTrackerWithStatus(state, trackerId, 'active');

        const arrivalTS = timeStampFromDateTime(newTracker.date, newTracker.time);

        if (isPast(arrivalTS)) {
            dispatch({ 
                type: TYPES.UPDATING_TRACKER_FAILED,
                message: `Cannot activate a Tracker which arrives in the past`
            });
            return; // bail out!
        }

        _updateTracker(dispatch, api, trackerId, newTracker);
    }
}

export function deActivateTracker(trackerId) {
    return (dispatch, getState, api) => {     

        const state = getState();

        const newTracker = makeFreshTrackerWithStatus(state, trackerId, 'inactive');

        _updateTracker(dispatch, api, trackerId, newTracker);
    }
}


export function archiveTracker(trackerId) {
    return (dispatch, getState, api) => {     

        const state = getState();
        
        const newTracker = makeFreshTrackerWithStatus(state, trackerId, 'archived');

        _updateTracker(dispatch, api, trackerId, newTracker);
    }
}



// UTILS
function makeFreshTrackerWithStatus(state, trackerId, status) {
    const tracker       = selectTracker(state, trackerId);

    const newTracker    = cloneDeep(tracker);

    newTracker.status   = state;

    return newTracker;
}

function prepareTrackerEntry(tracker) {
    return {
        uid: uid(),
        status: "inactive",
        originCode: tracker.origin.station_code,
        originName: tracker.origin.station_name,
        destinationCode: tracker.destination.station_code,
        destinationName: tracker.destination.station_name,
        date: timeStampFromDateTime( tracker.origin.aimed_arrival_date, tracker.origin.aimed_arrival_time ),
        // data: tracker, // this is a dump of all the tracker data. Really we should only take what we need...
    };
}

