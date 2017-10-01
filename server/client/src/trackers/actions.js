import * as TYPES from './types';
import uid from 'uid';
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

        const arrivalTS = Date.parse(`${tracker.date} ${tracker.time}`);
        const diff      = differenceInMilliseconds(arrivalTS, new Date());

        if (diff <= 0) {
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

        const tracker = selectTracker(state, trackerId);

        // TODO - dry up date comparison into helper
        const arrivalTS = Date.parse(`${tracker.date} ${tracker.time}`);
        const diff      = differenceInMilliseconds(arrivalTS, new Date());
  
        if (diff <= 0) {
            dispatch({ 
                type: TYPES.UPDATING_TRACKER_FAILED,
                message: `Cannot activate Tracker which arrives in the past`
            });
            return;
        }

        const newTracker = cloneDeep(tracker);

        newTracker.status = 'active';

        _updateTracker(dispatch, api, trackerId, newTracker);
    }
}

export function deActivateTracker(trackerId) {
    return (dispatch, getState, api) => {     

        const state = getState();

        const tracker = selectTracker(state, trackerId);

        const newTracker = cloneDeep(tracker);

        newTracker.status = 'inactive';

        _updateTracker(dispatch, api, trackerId, newTracker);
    }
}


export function archiveTracker(trackerId) {
    return (dispatch, getState, api) => {     

        const state = getState();

        const tracker = selectTracker(state, trackerId);

        const newTracker = cloneDeep(tracker);

        newTracker.status = 'archived';

        _updateTracker(dispatch, api, trackerId, newTracker);
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

