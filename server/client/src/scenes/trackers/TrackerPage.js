import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import isEmpty from 'lodash';

import * as trackersSelectors from '../../trackers/reducer';
import * as trackersActions from '../../trackers/actions';
import TrackerDetail from './TrackerDetail';


class TrackerPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			timeDiffMs: ''
		}

		this.checkTime = this.checkTime.bind(this);

	}


	componentDidMount() {

		// Fetch the tracker passed in the Route params
		const trackerId = this.props.match.params.trackerId;
		this.props.fetchTracker(trackerId);

		if(!isEmpty(this.props.tracker)) {
        	this.arrivalCheckerTimer = setInterval(this.checkTime, 1000);
		}
    }

    componentWillUnmount() {
        clearInterval(this.arrivalCheckerTimer);
    }

    checkTime() {
    	return;


  //   	const arrivalTime 	= this.props.tracker.destination.aimed_arrival_time;
  //   	const arrivalDate 	= this.props.tracker.destination.aimed_arrival_date;
  //   	const arrivalTS 	= Date.parse(`${arrivalTime} ${arrivalDate}`);
		// const now 			= new Date();    	
		// debugger;
		// // Difference in m/s between arrival datetime and now
		// const diff 			= differenceInMilliseconds(arrivalTS, now);

  // 		this.setState({
  // 			timeDiffMs: diff
  // 		});

  // 		if (diff <= 0) {
		// 	clearInterval(this.arrivalCheckerTimer);
  // 		}
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
		const { tracker, isFetching, isError } = this.props;

		// TODO - if Tracker is in past then show warning
		// ...and don't track!
	    return (
	    	<TrackerDetail isFetching={isFetching} isError={isError} tracker={tracker} />
	    )
	}

	
};


function mapStateToProps(state) {

	return {
		tracker: trackersSelectors.selectCurrentTracker(state),
		isError: trackersSelectors.selectIsError(state),
        isFetching: trackersSelectors.selectIsFetching(state),
	}
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, trackersActions)
);


export default enchance(TrackerPage);
