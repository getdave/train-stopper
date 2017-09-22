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