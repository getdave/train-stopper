import * as TYPES from './types';
import uid from 'uid';

export function fetchTrackers() {
    return (dispatch, getState, api) => {         
        dispatch({ 
            type: TYPES.FETCHING_TRACKERS,
        });

        
        return api.fetchTrackers().then(response => {

            if (response.status !== 200) {
                throw new Error(`Transport API: ${response.statusText}`);
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
                throw new Error(`Transport API: ${response.statusText}`);
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


