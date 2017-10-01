import * as TYPES from './types';
import uid from 'uid';

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




export function createTracker(tracker) {
    return (dispatch, getState, api) => { 


        // Pull out interesting parts of API response for easier access
        const entry = prepareTrackerEntry(tracker);
        debugger;

        dispatch({ 
            type: TYPES.CREATING_TRACKER,
        });

        return api.createTracker(entry).then(response => {

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




export function updateTracker(trackerId, newTracker) {
    return (dispatch, getState, api) => {         
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
            debugger;
            dispatch({ 
                type: TYPES.UPDATING_TRACKER_FAILED,
            });
        }); 
    }
}





// UTILS
function prepareTrackerEntry(tracker) {
    return {
        uid: uid(),
        status: "inactive",
        data: tracker,
        originCode: tracker.origin.station_code,
        originName: tracker.origin.station_name,
        destinationCode: tracker.destination.station_code,
        destinationName: tracker.destination.station_name,
        date: tracker.origin.aimed_departure_date,
        time: tracker.origin.aimed_departure_time
    };
}

