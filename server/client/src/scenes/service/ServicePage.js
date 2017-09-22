import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as journeyActions from '../../journey/actions';
import * as journeySelectors from '../../journey/reducer';



class ServicePage extends Component {


	componentDidMount() {

		// Pull origin and dest from Route params
		const { originStation, destinationStation, trainUId, date } = this.props.match.params;
		
		//  TODO handle error where neither are defined
		this.props.setStations({
			originStation,
			destinationStation
		});

		this.props.fetchService(trainUId, originStation, destinationStation, date);		
	}

	render() {

		const originDetail = this.props.service.origin;
		const destinationDetail = this.props.service.destination;

	    return (
	    	<div>
		    	<h1>Confirm your Journey</h1>
		    			    	
		    	<p>Your train is leaving {originDetail.station_name} at {originDetail.aimed_departure_time} and arriving at {destinationDetail.station_name} at {destinationDetail.aimed_arrival_time}.</p>

		    	
		    	<Link to={`/trackers/`} className="btn btn-primary">Correct, start tracking</Link>

		    </div>
	    )
	}

	
};


function mapStateToProps(state) {
	console.log(state);
	return {
		service: journeySelectors.selectService(state)
		 //originStation: journeySelectors.selectOrigin(state),
		// journeys: journeySelectors.selectJourneys(state),
		// isError: journeySelectors.selectIsError(state),
  //       isFetching: journeySelectors.selectIsFetching(state),
	}
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, journeyActions)
);


export default enchance(ServicePage);
