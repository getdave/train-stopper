import React from 'react';
import { Alert } from 'reactstrap';

const TrackerDetail = props => {

	const originData 		= props.originData;
	const destinationData 	= props.destinationData;
	    	// <h5>Time till arrival</h5>
	    	// <p>{this.state.timeTillArrival.days} days</p>
	    	// <p>{this.state.timeTillArrival.hours} hours</p>
	    	// <p>{this.state.timeTillArrival.minutes} minutes</p>
	    	// <p>{this.state.timeTillArrival.seconds} seconds</p>


	if (originData === '' || destinationData === '') {
		return <Alert color="warning">No data for this service</Alert>
	}


    return (
    	<div>
	    	<h1>{originData.station_name} to {destinationData.station_name}</h1>
	    			    	
	    	<p>Your train is leaving {originData.station_name} at {originData.aimed_departure_time} and arriving at {destinationData.station_name} at {destinationData.aimed_arrival_time}.</p>


	    </div>
    )
};

export default TrackerDetail;