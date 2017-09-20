import axios from 'axios';

import { 
    SETTING_STATIONS_SUCCESS,
    FETCHING_JOURNEYS,
    FETCHING_JOURNEYS_SUCCESS,
    FETCHING_JOURNEYS_FAILED,
} from './types';



export function fetchJourneys(origin, destination) {
    return (dispatch, getState) => { 
        const url = `/api/transport/journeys`;
        
        dispatch({ 
            type: FETCHING_JOURNEYS,
        });
        
        return axios.get(url, {
            params: {
                origin: origin,
                destination: destination
            }
        }).then(response => {
            if (response.status !== 200) {
                throw new Error(`Transport API: ${response.statusText}`);
            }
            dispatch({ 
                type: FETCHING_JOURNEYS_SUCCESS,
                payload: response.data
            });       
        }).catch(function (error) {
            dispatch({ 
                type: FETCHING_JOURNEYS_FAILED,
            });
        }); 
    }
}


export function setStations({originStation, destinationStation}) {
    return { 
        type: SETTING_STATIONS_SUCCESS,
        payload: {
            origin: originStation,
            destination: destinationStation
        }
    };
}