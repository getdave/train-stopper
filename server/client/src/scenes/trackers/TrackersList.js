import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withConditionalRender from '../../hoc/withConditionalRender';

class TrackersList extends Component {


	renderTrackers() {
		return this.props.trackers.map( (tracker, index) => {
			// TODO - remove index as key and use uid
			return (
				<Link key={index} to={`/trackers/${index}`} className="list-group-item flex-column align-items-start">
					TRACKER 
				</Link>
			);			
		});
	}

	render() {

	    return (
	    	<ul>
		    	{this.renderTrackers()}
		    </ul>
	    )
	}
};

export default withConditionalRender(TrackersList, 'trackers');