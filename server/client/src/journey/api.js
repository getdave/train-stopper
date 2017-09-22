import axios from 'axios';

/**
 * FETCH JOURNEYS
 */
export const fetchJourneys = (origin, destination, date, time) => {

	const url = `/api/transport/journeys`;
  
    return axios.get(url, {
        params: {
            origin: origin,
            destination: destination, 
            date: date,
            time: time
        }
    });
};


/**
 * FETCH SERVICE
 */
export const fetchService = (train_uid, origin, destination, date) => {

	const url = `/api/transport/service`;
  
    return axios.get(url, {
        params: {
            train_uid: train_uid,
            origin: origin,
            destination: destination,
            date: date
        }
    })
};