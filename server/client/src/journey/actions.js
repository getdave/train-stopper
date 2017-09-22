import axios from 'axios';

import { 
    FETCHING_JOURNEYS_LIST,
    FETCHING_JOURNEYS_LIST_SUCCESS,
    FETCHING_JOURNEYS_LIST_FAILED,
    FETCHING_SERVICE,
    FETCHING_SERVICE_SUCCESS,
    FETCHING_SERVICE_FAILED,
    SETTING_STATIONS_SUCCESS,
    SETTING_DATETIME_SUCCESS
} from './types';



export function fetchJourneys(origin, destination, date, time) {
    return (dispatch, getState, api) => { 
        
        dispatch({ 
            type: FETCHING_JOURNEYS_LIST,
        });
        
        return api.fetchJourneys(origin, destination, date, time).then(response => {
            if (response.status !== 200) {
                throw new Error(`Transport API: ${response.statusText}`);
            }
            dispatch({ 
                type: FETCHING_JOURNEYS_LIST_SUCCESS,
                payload: response.data
            });       
        }).catch(function (error) {
            dispatch({ 
                type: FETCHING_JOURNEYS_LIST_FAILED,
            });
        }); 
    }
}

export function fetchService(train_uid, origin, destination, date) {
    return (dispatch, getState) => { 
        const url = `/api/transport/service`;
        
        dispatch({ 
            type: FETCHING_SERVICE,
        });
        
        return axios.get(url, {
            params: {
                train_uid: train_uid,
                origin: origin,
                destination: destination,
                date: date
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

export function setDatetime({date, time}) {
    return { 
        type: SETTING_DATETIME_SUCCESS,
        payload: {
            date,
            time
        }
    };
}