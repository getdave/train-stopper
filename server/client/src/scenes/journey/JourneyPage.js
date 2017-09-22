import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as journeyActions from '../../journey/actions';
import * as journeySelectors from '../../journey/reducer';

import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

class JourneyPage extends Component {


	componentDidMount() {
		
		// Capture data from url and store in state
		this.storeRouteData();

		// Pull origin and dest from Route params
		const { originStation, destinationStation, date, time } = this.props.match.params;
		
		this.props.fetchJourneys(originStation, destinationStation, date, time);		
	}


	storeRouteData() {

		// Pull origin and dest from Route params
		const { originStation, destinationStation, date, time } = this.props.match.params;

		// TODO handle error where neither are defined
		this.props.setStations({
			originStation,
			destinationStation
		});

		this.props.setDatetime({
			date,
			time
		});
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

		const journeysItems = this.props.journeys.map( journey => {
			return (
				<ListGroupItem key={journey.train_uid} tag="a" href={`/journey/${this.props.originStation}/${this.props.destinationStation}/${journey.train_uid}`}>
					<ListGroupItemHeading>{journey.origin_name} - {journey.destination_name}</ListGroupItemHeading>
					<ListGroupItemText>
					This train departs from <strong>{this.props.originStation}</strong> at {journey.aimed_departure_time}
					</ListGroupItemText>
				</ListGroupItem>
				
			)
		});

		return (
			<ListGroup>
			{journeysItems}
        	</ListGroup>
		)
	}
};


function mapStateToProps(state) {
	console.log(state);
	return {
		originStation: journeySelectors.selectOrigin(state),
		destinationStation: journeySelectors.selectDestination(state),
		journeys: journeySelectors.selectJourneys(state),
		isError: journeySelectors.selectIsError(state),
        isFetching: journeySelectors.selectIsFetching(state),
	}
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, journeyActions)
);


export default enchance(JourneyPage);
