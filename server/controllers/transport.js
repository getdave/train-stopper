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
 * STATIONS
 * returns information about a given station 
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
		
		// if (response.status !== 200) {
		// 	throw new Error(response.statusText);
		// }

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
		return res.status(500).send({ error: e })
	}
};



/**
 * JOURNEYS
 * returns services that pass through origin and destination stations 
 */
exports.journeys = async (req, res) => {
	
	
	const url = `https://transportapi.com/v3/uk/train/station/${req.query.origin}/2017-09-17/14:00/timetable.json`;

	try {		
		// const response = await axios.get(url, {
		// 	params: {
		// 		app_id: process.env.TRANSPORT_API_ID,
		// 		app_key: process.env.TRANSPORT_API_KEY,
		// 		calling_at: req.query.destination,
		// 		darwin: true,
		// 		train_status: 'passenger'
		// 	}
		// });

		// if (response.status !== 200) {
		// 	throw new Error(response.statusText);
		// }
		
		// const data = response.data;
		
		const data = [
            {
                "mode": "train",
                "service": "25471001",
                "train_uid": "P01330",
                "platform": null,
                "operator": "GW",
                "operator_name": "Great Western Railway",
                "aimed_departure_time": "15:37",
                "aimed_arrival_time": "15:37",
                "aimed_pass_time": null,
                "origin_name": "Weymouth",
                "source": "ATOC",
                "destination_name": "Bristol Temple Meads",
                "category": "OO",
                "service_timetable": {
                    "id": "https://transportapi.com/v3/uk/train/service/train_uid:P01330/2017-09-17/timetable.json?app_id=a2560ce6&app_key=c331f54ce5ebd37d11f0aba0d491e79b&darwin=true"
                }
            },
            {
		        "mode": "train",
		        "service": "25471001",
		        "train_uid": "C20543",
		        "platform": null,
		        "operator": "GW",
		        "operator_name": "Great Western Railway",
		        "aimed_departure_time": "14:41",
		        "aimed_arrival_time": "14:40",
		        "aimed_pass_time": null,
		        "origin_name": "Weymouth",
		        "source": "ATOC",
		        "destination_name": "Gloucester",
		        "category": "OO",
		        "service_timetable": {
		          "id": "https://transportapi.com/v3/uk/train/service/train_uid:C20543/2017-09-18/timetable.json?app_id=a2560ce6&app_key=c331f54ce5ebd37d11f0aba0d491e79b"
		        }
		    }
        ];

		return res.json(data);
	} catch(e) {
		winston.info(e);
		return res.status(500).send({ error: e })
	}
};



/**
 * SERVICES
 * returns services that pass through origin and destination stations 
 */
exports.services = async (req, res) => {
	
	const train_uid = req.query.train_uid;
	
	const url = `https://transportapi.com/v3/uk/train/service/train_uid:${train_uid}///timetable.json`;

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
		
		const data = response.data;

		return res.json(data);
	} catch(e) {
		winston.info(e);
		return res.status(500).send({ error: e })
	}
};


