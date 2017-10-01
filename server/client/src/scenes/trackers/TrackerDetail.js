import React from 'react';
import { Alert } from 'reactstrap';
import withConditionalRender from '../../hoc/withConditionalRender';


const TrackerDetail = props => {
	const { tracker } = props;
	
    return (
    	<div>
	    	<h1>{tracker.originName} to {tracker.destinationName}</h1>
	    			    	
	    	<p>Your train is leaving {tracker.originName} at {tracker.data.origin.aimed_departure_time} and arriving at {tracker.destinationName} at {tracker.data.destination.aimed_arrival_time}.</p>

	    </div>
    )
};

export default withConditionalRender(TrackerDetail, 'tracker');