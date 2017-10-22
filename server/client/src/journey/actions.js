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
        
        return api.fetchService(train_uid, origin, destination, date).then(responses => {
            
            // if (responses.status !== 200) {
            //     throw new Error(`Transport API: ${responses.statusText}`);
            // }

            const data = responses[0].data;
            const geoLocation = responses[1].data;

            dispatch({ 
                type: TYPES.FETCHING_SERVICE_SUCCESS,
                payload: {
                    trainUid: train_uid,
                    data: data,
                    geoLocation: geoLocation
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



export function fetchServiceGeoLocationInfo(origin, destination) {
    return (dispatch, getState, api) => { 
        dispatch({ 
            type: TYPES.FETCHING_SERVICE_GEOLOCATION_INFO,
        });

        // Creates an array of Fetch Promises
        const results = [origin, destination].map(place => {
            return api.fetchPlaceGeoLocation(place);
        });

        return Promise.all(results).then(responses => {
            const data = responses.map(response => response.data);

            dispatch({ 
                type: TYPES.FETCHING_SERVICE_GEOLOCATION_INFO_SUCCESS,
                payload: data
            });
        }).catch(function (error) {
            dispatch({ 
                type: TYPES.FETCHING_SERVICE_GEOLOCATION_INFO_FAILED,
            });
        }); 
    }
}





