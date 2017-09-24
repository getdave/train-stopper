import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import * as journeyActions from '../../journey/actions';
import * as journeySelectors from '../../journey/reducer';



class ServicePage extends Component {


	componentDidMount() {

		// Pull origin and dest from Route params
		const { trainUId } = this.props.match.params;

		const { originStation, destinationStation, date } = this.props;

		if (originStation || destinationStation || date) {
			this.props.fetchService(trainUId, originStation, destinationStation, date);		
		}
		
	}

	render() {

		const originDetail = this.props.service.origin;
		const destinationDetail = this.props.service.destination;

		// Todo - pass state on redirect to indicate what data was missing
		if (!this.props.originStation || !this.props.destinationStation || !this.props.date) {
			return <Redirect to="/" />
		}

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
		service: journeySelectors.selectService(state),
		originStation: journeySelectors.selectOrigin(state),
		destinationStation: journeySelectors.selectDestination(state),
		date: journeySelectors.selectDate(state),
		isError: journeySelectors.selectIsError(state),
        isFetching: journeySelectors.selectIsFetching(state),
	}
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, journeyActions)
);


export default enchance(ServicePage);
