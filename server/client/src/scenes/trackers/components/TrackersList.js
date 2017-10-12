import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { dateFromTS, timeFromTS } from '../../../helpers';

import withConditionalRender from '../../../hoc/withConditionalRender';

class TrackersList extends Component {


	renderTrackers() {
		return this.props.trackers.map( (tracker ) => {
			return (
				<li key={tracker.uid} className="list-group-item flex-column align-items-start">
					<Link to={`/trackers/${tracker.uid}`} className="w-100">
						
						<div className="d-flex w-100 justify-content-between">
					      	<h5 className="mb-1">{tracker.originName} to {tracker.destinationName}</h5>
					      	<span className="align-right badge badge-default badge-pill">{tracker.status}</span>
					    </div>
						<div className="d-flex w-100 justify-content-between">
					    	<div>
					    		<small>Arriving on { dateFromTS(tracker.date) } at { timeFromTS( tracker.date ) }</small>
					    	</div>
					    </div>
					</Link>
				</li>
			);			
		});
	}

	render() {

	    return (
	    	<ul className="list-group">
		    	{this.renderTrackers()}
		    </ul>
	    )
	}
};

export default withConditionalRender(TrackersList, 'trackers');

