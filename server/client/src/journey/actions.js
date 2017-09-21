import axios from 'axios';

import { 
    SETTING_STATIONS_SUCCESS,
    FETCHING_JOURNEYS,
    FETCHING_JOURNEYS_SUCCESS,
    FETCHING_JOURNEYS_FAILED,
    FETCHING_SERVICE,
    FETCHING_SERVICE_SUCCESS,
    FETCHING_SERVICE_FAILED,
} from './types';



export function fetchJourneys(origin, destination, date, time) {
    return (dispatch, getState) => { 
        const url = `/api/transport/journeys`;
        
        dispatch({ 
            type: FETCHING_JOURNEYS,
        });
        
        return axios.get(url, {
            params: {
                origin: origin,
                destination: destination, 
                date: date,
                time: time
            }
        }).then(response => {
            debugger;
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

export function fetchService(train_uid, origin, destination) {
    return (dispatch, getState) => { 
        const url = `/api/transport/service`;
        
        dispatch({ 
            type: FETCHING_SERVICE,
        });
        
        return axios.get(url, {
            params: {
                train_uid: train_uid,
                origin: origin,
                destination: destination
            }
        }).then(response => {
            if (response.status !== 200) {
                throw new Error(`Transport API: ${response.statusText}`);
            }
            dispatch({ 
                type: FETCHING_SERVICE_SUCCESS,
                payload: response.data
            });       
        }).catch(function (error) {
            dispatch({ 
                type: FETCHING_SERVICE_FAILED,
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