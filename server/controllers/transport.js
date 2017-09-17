/**
 * HOME CONTROLLER
 *
 * controller for all home routes
 */

const uid 			= require('uid');
const Promise 		= require('promise');
const axios 		= require('axios');
const winston 		= require('winston');

/**
 * INDEX 
 */
exports.stations = async (req, res) => {
	
	const url = `https://transportapi.com/v3/uk/places.json`;
	
	try {		
		// const response = await axios.get(url, {
		// 	params: {
		// 		app_id: process.env.TRANSPORT_API_ID,
		// 		app_key: process.env.TRANSPORT_API_KEY,
		// 		query: req.query.query,
		// 		type: 'train_station'
		// 	}
		// });

		// const data = response.data.member.map(station => {
		// 	return {
		// 		value: station.station_code.toLowerCase(),
		// 		label: station.name
		// 	};
		// })
		
		// Testing only
		const data = [
			{
				label: "Frome",
				value: "FRO"
			},
			{
				label: "Fromey Land",
				value: "FML"
			},
			{
				label: "Frankensteinville",
				value: "FNK"
			}
		];

		return res.json(data);
	} catch(e) {
		winston.info(e);
	}

};


