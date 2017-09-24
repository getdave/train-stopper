import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds'
import * as journeyActions from '../../journey/actions';
import * as journeySelectors from '../../journey/reducer';
import TrackerDetail from './TrackerDetail';


class ServicePage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			timeDiffMs: ''
		}

		this.checkTime = this.checkTime.bind(this);

	}


	componentDidMount() {
		const { origin, destination } = this.props.service;

		// Start only if we have key data
		if(origin && destination) {
        	this.arrivalCheckerTimer = setInterval(this.checkTime, 1000);
		}
    }

    componentWillUnmount() {
        clearInterval(this.arrivalCheckerTimer);
    }

    checkTime() {
    	const arrivalTime 	= this.props.service.destination.aimed_arrival_time;
    	const arrivalDate 	= this.props.service.destination.aimed_arrival_date;
    	const arrivalTS 	= Date.parse(`${arrivalTime} ${arrivalDate}`);
		const now 			= new Date();    	
		debugger;
		// Difference in m/s between arrival datetime and now
		const diff 			= differenceInMilliseconds(arrivalTS, now);

  		this.setState({
  			timeDiffMs: diff
  		});

  		if (diff <= 0) {
			clearInterval(this.arrivalCheckerTimer);
  		}
    }

 //    timeBetweenDates(toDate) {
	//   var dateEntered = new Date(toDate);
	//   var now = new Date();
	//   var difference = dateEntered.getTime() - now.getTime();

	//   if (difference <= 0) {

	//     // Timer done
	//     clearInterval(this.arrivalCheckerTimer);
	  
	//   } else {
	    
	//     var seconds = Math.floor(difference / 1000);
	//     var minutes = Math.floor(seconds / 60);
	//     var hours = Math.floor(minutes / 60);
	//     var days = Math.floor(hours / 24);

	//     hours %= 24;
	//     minutes %= 60;
	//     seconds %= 60;

	//     return {
	//     	days,
	//     	hours,
	//     	minutes,
	//     	seconds
	//     };
	    
	//   }
	// }


	render() {

		const originData 		= this.props.service.origin;
		const destinationData 	= this.props.service.destination;

		// Todo - pass state on redirect to indicate what data was missing
		if (originData === '' || destinationData === '') {
			return <Redirect to="/" />
		}

	    return (
	    	<TrackerDetail originData={originData} destinationData={destinationData} />
	    )
	}

	
};


function mapStateToProps(state) {
	return {
		service: journeySelectors.selectService(state)
	}
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, journeyActions)
);


export default enchance(ServicePage);
