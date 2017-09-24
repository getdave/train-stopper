import * as TYPES from './types';


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


export function setTracker(tracker) {
    return (dispatch, getState, api) => { 

        // Pull out interesting parts of API response for easier access
        const entry = prepareTrackerEntry(tracker);

        dispatch({ 
            type: TYPES.SETTING_TRACKER,
        });

        return api.setTracker(entry).then(response => {

            if (response.status !== 200) {
                throw new Error(`Transport API: ${response.statusText}`);
            }
            dispatch({ 
                type: TYPES.SETTING_TRACKER_SUCCESS,
                payload: response.data
            });  

            

        }).catch(function (error) {
            dispatch({ 
                type: TYPES.SETTING_TRACKER_FAILED,
            });
        }); 
    }
}


