import * as TYPES from './types';


export function fetchStations(query) {
    return (dispatch, getState, api) => { 
       
        dispatch({ 
            type: TYPES.FETCHING_STATIONS,
        });
        
        return api.fetchStations(query).then(response => {
            if (response.status !== 200) {
                throw new Error(`Transport API: ${response.statusText}`);
            }
            dispatch({ 
                type: TYPES.FETCHING_STATIONS_SUCCESS,
                payload: response.data
            });       
        }).catch(function (error) {
            dispatch({ 
                type: TYPES.FETCHING_STATIONS_FAILED,
            });
        }); 
    }
}


export function fetchStationGeoLocation(station) {
    return (dispatch, getState, api) => { 
        dispatch({ 
            type: TYPES.FETCHING_STATION_GEOLOCATION,
        })

        return api.fetchStationGeoLocation(station).then(response => {
            if (response.status !== 200) {
                throw new Error(`${response.statusText}`);
            }
            dispatch({ 
                type: TYPES.FETCHING_STATION_GEOLOCATION_SUCCESS,
                payload: response.data
            });  
        }).catch(function (error) {
            dispatch({ 
                type: TYPES.FETCHING_STATION_GEOLOCATION_FAILED,
            });
        }); 
    }
}
