/**
 * HOME CONTROLLER
 *
 * controller for all home routes
 */

const uid 			= require('uid');
const Promise 		= require('promise');
const axios 		= require('axios');
const winston 		= require('winston');
const format 		= require('date-fns/format')

/**
 * STATIONS
 * returns information about a given station 
 */
exports.stations = async (req, res) => {
	
	const url = `https://transportapi.com/v3/uk/places.json`;
	
	try {		
		const response = await axios.get(url, {
			params: {
				app_id: process.env.TRANSPORT_API_ID,
				app_key: process.env.TRANSPORT_API_KEY,
				query: req.query.query,
				type: 'train_station'
			}
		});
		
		if (response.status !== 200) {
			throw new Error(response.statusText);
		}

		const data = response.data.member.map( (station, index) => {
			return {
				id: index,
				value: station.station_code.toLowerCase(),
				label: station.name
			};
		})

		return res.json(data);
	} catch(e) {
		winston.info(e);
		return res.status(500).send({ error: e })
	}
};



/**
 * JOURNEYS
 * returns services that pass through origin and destination stations 
 */
exports.journeys = async (req, res) => {
	
	const { origin, destination } = req.query;


	const date = ( req.query.date !== undefined ) ? req.query.date : format(Date.now(), 'YYYY-MM-DD');
	const time = ( req.query.time !== undefined ) ? req.query.time : format(Date.now(), 'HH:mm');
	
	const url = `https://transportapi.com/v3/uk/train/station/${origin}/${date}/${time}/timetable.json`;



	try {		
		const response = await axios.get(url, {
			params: {
				app_id: process.env.TRANSPORT_API_ID,
				app_key: process.env.TRANSPORT_API_KEY,
				calling_at: destination,
				darwin: true,
				train_status: 'passenger',
				date: date,
				time: time,
			}
		});



		if (response.status !== 200) {
			throw new Error(response.statusText);
		}

		const data = response.data.departures.all;

		return res.json(data);
	} catch(e) {
		winston.info(e);
		return res.status(500).send({ error: e })
	}
};



/**
 * SERVICE
 * returns services that pass through origin and destination stations 
 */
exports.service = async (req, res) => {
	
	const { train_uid, origin, destination, date } = req.query;
	
	const url = `https://transportapi.com/v3/uk/train/service/train_uid:${train_uid}/${date}/timetable.json`;

	try {		
		const response = await axios.get(url, {
			params: {
				app_id: process.env.TRANSPORT_API_ID,
				app_key: process.env.TRANSPORT_API_KEY,
				darwin: true,
				live: true,
				train_status: 'passenger'
			}
		});

		if (response.status !== 200) {
			throw new Error(response.statusText);
		}
	
		// Just get the stops		
		let data = response.data.stops;

		if (!data || !data.length) {
			throw new Error('No stops data returned from transport API');
		}

		// Filter out all but origin and destination
		data = data.filter(stop => stop.station_code.toLowerCase() === origin.toLowerCase() || stop.station_code.toLowerCase() === destination.toLowerCase());

		return res.json(data);
	} catch(e) {
		winston.info(e);
		return res.status(500).send({ error: e })
	}
};


