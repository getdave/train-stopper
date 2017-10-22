import axios from 'axios';

/**
 * FETCH STATIONS
 */
export const fetchStations = (query) => {

	const url = `/api/transport/stations`;
  
    return axios.get(url, {
        params: {
            query: query
        }
    });
};



