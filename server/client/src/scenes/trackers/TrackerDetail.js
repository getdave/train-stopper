import React from 'react';
import { Alert } from 'reactstrap';
import withConditionalRender from '../../hoc/withConditionalRender';


const TrackerDetail = props => {
	const { tracker, onStart } = props;

    return (
    	<div>
	    	<h1>{tracker.originName} to {tracker.destinationName}</h1>

	    	<span className="badge badge-default badge-pill">{tracker.status}</span>
	    			    	
	    	<p>Your train is leaving {tracker.originName} at {tracker.data.origin.aimed_departure_time} and arriving at {tracker.destinationName} at {tracker.data.destination.aimed_arrival_time}.</p>

	    	<button className="btn btn-primary" type="button" onClick={onStart}>
	    		Start
	    	</button>

	    </div>
    )
};

export default withConditionalRender(TrackerDetail, 'tracker');