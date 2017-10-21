import { timeStampFromDateTime } from '../helpers';
import * as TYPES from './types';



export function fetchStationServices(origin, destination, date, time) {
    return (dispatch, getState, api) => {         
        dispatch({ 
            type: TYPES.FETCHING_STATION_SERVICES,
        });
        
        return api.fetchStationServices(origin, destination, date, time).then(response => {
            if (response.status !== 200) {
                throw new Error(`Transport API: ${response.statusText}`);
            }
            dispatch({ 
                type: TYPES.FETCHING_STATION_SERVICES_SUCCESS,
                payload: response.data
            });       
        }).catch(function (error) {
            dispatch({ 
                type: TYPES.FETCHING_STATION_SERVICES_FAILED,
            });
        }); 
    }
}

export function fetchService(train_uid, origin, destination, date) {
    return (dispatch, getState, api) => { 
        
        dispatch({ 
            type: TYPES.FETCHING_SERVICE,
        });
        
        return api.fetchService(train_uid, origin, destination, date).then(response => {
            if (response.status !== 200) {
                throw new Error(`Transport API: ${response.statusText}`);
            }
            dispatch({ 
                type: TYPES.FETCHING_SERVICE_SUCCESS,
                payload: {
                    trainUid: train_uid,
                    data: response.data,
                }
            });       
        }).catch(function (error) {
            dispatch({ 
                type: TYPES.FETCHING_SERVICE_FAILED,
            });
        }); 
    }
}


export function setUserInput({originStation, destinationStation, date, time}) {

    // TODO - convert data and time into a single timestamp
    const dateTimeStamp = timeStampFromDateTime(date,time);

    return { 
        type: TYPES.SETTING_USERINPUT_SUCCESS,
        payload: {
            originStation,
            destinationStation,
            date: dateTimeStamp
        }
    };
}
