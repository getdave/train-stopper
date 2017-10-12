import React from 'react';
import withConditionalRender from '../../../hoc/withConditionalRender';


const TrackerDetail = props => {
	const { tracker, onStart, onStop } = props;

	const btnText 	= (tracker.status !== 'active' ? 'Start Tracking' : 'Stop Tracking');

	const btnMethod = (tracker.status !== 'active' ? onStart : onStop);

	const isEnabled = (tracker.status === 'archived' ? true : false);



    return (
    	<div>
	    	<h1>{tracker.originName} to {tracker.destinationName}</h1>

	    	<span className="badge badge-default badge-pill">{tracker.status}</span>
	    			    	
	    	<p>Your train is leaving {tracker.originName} at {tracker.departureTime} and arriving at {tracker.destinationName} at {tracker.arrivalTime}.</p>

	    	<button disabled={isEnabled} className="btn btn-primary" type="button" onClick={btnMethod}>
	    		{btnText}
	    	</button>



	    	<button className="float-right btn btn-danger" type="button" onClick={props.onDelete}>
	    		Delete Tracker
	    	</button>

	    </div>
    )
};

export default withConditionalRender(TrackerDetail, 'tracker');