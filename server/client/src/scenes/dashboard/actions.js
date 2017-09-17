import axios from 'axios';
// import { SubmissionError } from 'redux-form'


import { 
    FETCHING_STATIONS,
    FETCHING_STATIONS_SUCCESS,
    FETCHING_STATIONS_FAILED,
    SETTING_STATIONS_SUCCESS
} from './types';



export function fetchStations(query) {
    return (dispatch, getState) => { 
        const url = `/api/transport/stations`;
        
        dispatch({ 
            type: FETCHING_STATIONS,
        });
        
        return axios.get(url, {
            params: {
                query: query
            }
        }).then(response => {
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


export function setStations({originStation, destinationStation}) {

    // if (originStation === destinationStation) {
    //     return Promise.reject( 
    //         new SubmissionError({
    //             username: 'User does not exist',
    //             _error: 'Login failed!'
    //         })
    //     );
    // }

    return { 
        type: SETTING_STATIONS_SUCCESS,
    };
}