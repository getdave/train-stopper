import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import { isEmpty, cloneDeep, bindAll } from 'lodash';

import * as trackersSelectors from '../../trackers/reducer';
import * as trackersActions from '../../trackers/actions';
import TrackerDetail from './TrackerDetail';


class TrackerPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			timeDiffMs: ''
		}

		bindAll(this, [
			'checkTime',
			'handleTrackerActivation',
			'handleTrackerDeactivation'
		]);

	}


	componentDidMount() {

		// TODO: can we optimise to avoid re-fetching if this is already in memory
		this.props.fetchTrackers();

    }

    componentWillReceiveProps(nextProps) {

    	// Fetch the tracker passed in the Route params
		const trackerId = this.props.match.params.trackerId;

    			// We must eagar load all trackers upfront 
		// just in case we don't have them
		if (!isEmpty(nextProps.trackers)) {
			this.props.setCurrentTracker(trackerId);
		}


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
	// 
	
	handleTrackerActivation(e) {
		e.preventDefault();

		const {tracker} = this.props;

		const newTracker = cloneDeep(tracker);

		newTracker.status = 'active';

		this.props.updateTracker(newTracker.uid, newTracker);
	}

	handleTrackerDeactivation(e) {
		e.preventDefault();

		const {tracker} = this.props;

		const newTracker = cloneDeep(tracker);

		newTracker.status = 'inactive';

		this.props.updateTracker(newTracker.uid, newTracker);
	}


	render() {
		const { tracker, isFetching, isError } = this.props;

		// TODO - if Tracker is in past then show warning
		// ...and don't track!
	    return (
	    	<TrackerDetail isFetching={isFetching} isError={isError} tracker={tracker} onStart={this.handleTrackerActivation} onStop={this.handleTrackerDeactivation} />
	    )
	}

	
};


function mapStateToProps(state) {
	return {
		tracker: trackersSelectors.selectCurrentTracker(state),
		trackers: trackersSelectors.selectTrackers(state),
		isError: trackersSelectors.selectIsError(state),
        isFetching: trackersSelectors.selectIsFetching(state),
	}
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, trackersActions)
);


export default enchance(TrackerPage);
