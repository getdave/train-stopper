import axios from 'axios';
import sequential from 'promise-sequential';

/**
 * FETCH JOURNEYS
 */
export const fetchStationServices = (origin, destination, date, time) => {

	const url = `/api/transport/station-services`;
  
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
 *
 * information about a given service based on the id of the train
 * as provided by the Travel API. Also grabs the GeoLocation info for
 * the destination station
 */
export const fetchService = (train_uid, origin, destination, date) => {

    // Sequential list of Promises
    const promises = [
        (previousResponse, responses, count) => {
            return axios.get(`/api/transport/service`, {
                params: {
                    train_uid: train_uid,
                    origin: origin,
                    destination: destination,
                    date: date
                }
            })
        },
        (previousResponse, responses, count) => {
            // We need access to the proper Stations name in order to query the places.json endpoint as the Transport API doesn't acccept station codes
            return axios.get(`/api/transport/station-geolocation`, {
                params: {
                    query: previousResponse.data[1].station_name // destination station
                }
            })
        }
    ];

    return sequential(promises);
};

/**
 * FETCH STATIONS GEOLOCATION
 */
export const fetchPlaceGeoLocation = (query) => {

    const url = `/api/transport/station-geolocation`;
  
    return axios.get(url, {
        params: {
            query: query
        }
    });
};
