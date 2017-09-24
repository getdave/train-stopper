import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as journeyActions from '../../journey/actions';
import * as journeySelectors from '../../journey/reducer';

import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

class JourneyPage extends Component {


	componentDidMount() {
		
		// Capture data from url and store in state
		const { originStation, destinationStation, date, time } = this.storeRouteData();
		
		this.props.fetchStationServices(originStation, destinationStation, date, time);		
	}


	storeRouteData() {

		// Pull origin and dest from Route params
		const { originStation, destinationStation, date, time } = this.props.match.params;

		// TODO handle error where neither are defined
		this.props.setUserInput({
			originStation,
			destinationStation,
			date,
			time
		});

		return this.props.match.params;
	}

	render() {

	    return (
	    	<div>
		    	<h1>Select a Journey</h1>
		    	<p>Pick a journey...</p>
		    	{this.renderJourneys()}
		    </div>
	    )
	}

	renderJourneys() {
		if (this.props.isError) {
			return (
				<p className="alert alert-warning">
					We encountered an error when attempting to load train journeys.
				</p>
			)
		}

		if (this.props.isFetching) {
			return (
				<p className="alert alert-info">
					Loading Train journey times...
				</p>
			)
		}

		const stationServices = this.props.stationServices.map( service => {

			return (
				<Link key={service.train_uid} to={`/journey/service/${service.train_uid}`} className="list-group-item list-group-item-action flex-column align-items-start active">
					<div className="d-flex w-100 justify-content-between">
						<h5 className="mb-1">{service.origin_name} - {service.destination_name}</h5>
					</div>
					<p className="mb-1">his train departs from <strong>{this.props.originStation}</strong> at {service.aimed_departure_time}</p>
				</Link>
			);

			
		});

		return (
			<ListGroup>
			{stationServices}
        	</ListGroup>
		)
	}
};


function mapStateToProps(state) {
	return {
		originStation: journeySelectors.selectOrigin(state),
		destinationStation: journeySelectors.selectDestination(state),
		stationServices: journeySelectors.selectStationServices(state),
		isError: journeySelectors.selectIsError(state),
        isFetching: journeySelectors.selectIsFetching(state),
	}
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, journeyActions)
);


export default enchance(JourneyPage);
