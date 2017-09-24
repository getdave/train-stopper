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


export function setTracker() {
    return (dispatch, getState, api) => {         
        dispatch({ 
            type: TYPES.SETTING_TRACKER,
        });
        
        return api.setTracker().then(response => {
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


