import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import * as journeyActions from '../../journey/actions';
import * as trackerActions from '../../trackers/actions';
import * as journeySelectors from '../../journey/reducer';



class ServicePage extends Component {


	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {

		// Pull origin and dest from Route params
		const { trainUId } = this.props.match.params;

		const { originStation, destinationStation, date } = this.props;

		if (originStation || destinationStation || date) {
			this.props.fetchService(trainUId, originStation, destinationStation, date);		
		}		
	}


	handleSubmit(e) {
		e.preventDefault(); // stop form submission

		// TODO handle "cancel" button

		this.props.createTracker(this.props.service);
		
		this.props.history.push(`/trackers/`);		
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

		    	<form onSubmit={this.handleSubmit} action={`/trackers/`}>
		    		<button name="ok" value="ok" className="btn btn-primary">Correct, start tracking</button>
		    		<button name="cancel" value="cancel" className="btn btn-link">Cancel</button>
		    	</form>

		    </div>
	    )
	}

	
};


function mapStateToProps(state) {
	return {
		service: journeySelectors.selectService(state),
		originStation: journeySelectors.selectOrigin(state),
		destinationStation: journeySelectors.selectDestination(state),
		date: journeySelectors.selectDate(state),
		// originStation: 'fro',
		// destinationStation: 'bri',
		// date: '2017-09-28',
		isError: journeySelectors.selectIsError(state),
        isFetching: journeySelectors.selectIsFetching(state),
	}
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...journeyActions,
    ...trackerActions
  }, dispatch);
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, mapDispatchToProps)
);


export default enchance(ServicePage);
