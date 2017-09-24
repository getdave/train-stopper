import { 
    FETCHING_STATIONS,
    FETCHING_STATIONS_SUCCESS,
    FETCHING_STATIONS_FAILED,
} from './types';


export function fetchStations(query) {
    return (dispatch, getState, api) => { 
       
        dispatch({ 
            type: FETCHING_STATIONS,
        });
        
        return api.fetchStations(query).then(response => {
            if (response.status !== 200) {
                throw new Error(`Transport API: ${response.statusText}`);
            }
            dispatch({ 
                type: FETCHING_STATIONS_SUCCESS,
                payload: response.data
            });       
        }).catch(function (error) {
            dispatch({ 
                type: FETCHING_STATIONS_FAILED,
            });
        }); 
    }
}
