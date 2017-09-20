import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as journeyActions from '../../journey/actions';
import * as journeySelectors from '../../journey/reducers';



class ServicePage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			timeTillArrival: {}
		}
	}


	componentDidMount() {

        this.interval = setInterval(this.checkTime.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    checkTime() {
    	console.log(this.state);
    	const arrivalTime = this.props.service.destination.aimed_arrival_time;
    	const arrivalDate = this.props.service.destination.aimed_arrival_date;

    	const arrivalTS = Date.parse(`${arrivalTime} ${arrivalDate}`);

    	const diff = this.timeBetweenDates(arrivalTS);

  		this.setState({
  			timeTillArrival: diff
  		});
    }

    timeBetweenDates(toDate) {
	  var dateEntered = new Date(toDate);
	  var now = new Date();
	  var difference = dateEntered.getTime() - now.getTime();

	  if (difference <= 0) {

	    // Timer done
	    clearInterval(this.interval);
	  
	  } else {
	    
	    var seconds = Math.floor(difference / 1000);
	    var minutes = Math.floor(seconds / 60);
	    var hours = Math.floor(minutes / 60);
	    var days = Math.floor(hours / 24);

	    hours %= 24;
	    minutes %= 60;
	    seconds %= 60;

	    return {
	    	days,
	    	hours,
	    	minutes,
	    	seconds
	    };
	    
	  }
	}


	render() {

		const originDetail = this.props.service.origin;
		const destinationDetail = this.props.service.destination;

	    return (
	    	<div>
		    	<h1>{originDetail.station_name} to {destinationDetail.station_name}</h1>
		    			    	
		    	<p>Your train is leaving {originDetail.station_name} at {originDetail.aimed_departure_time} and arriving at {destinationDetail.station_name} at {destinationDetail.aimed_arrival_time}.</p>

		    	<h5>Time till arrival</h5>
		    	<p>{this.state.timeTillArrival.days} days</p>
		    	<p>{this.state.timeTillArrival.hours} hours</p>
		    	<p>{this.state.timeTillArrival.minutes} minutes</p>
		    	<p>{this.state.timeTillArrival.seconds} seconds</p>

		    </div>
	    )
	}

	
};


function mapStateToProps(state) {
	console.log(state);
	return {
		service: journeySelectors.selectService(state)
	}
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, journeyActions)
);


export default enchance(ServicePage);
