import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as journeyActions from '../../journey/actions';
import * as journeySelectors from '../../journey/reducer';

import ServiceList from './components/ServiceList';

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
		    	<ServiceList isFetching={this.props.isFetching} isError={this.props.isError} stationServices={this.props.stationServices} originStation={this.props.originStation}/>
		    </div>
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
