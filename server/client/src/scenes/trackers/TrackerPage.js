import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty, bindAll } from 'lodash';

import * as trackersSelectors from '../../trackers/reducer';
import * as trackersActions from '../../trackers/actions';
import TrackerDetail from './components/TrackerDetail';


class TrackerPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			timeDiffMs: ''
		}

		bindAll(this, [
			'handleTrackerActivation',
			'handleTrackerDeactivation',
			'handleTrackerDeletion'
		]);

	}


	componentDidMount() {
		this.doTrackersFetch(this.props);

    }

    componentWillUnmount() {
    	if (!isEmpty(this.props.trackers)) {
			this.props.setCurrentTracker(false); // once we unmount there is no current tracker
		}
    }

    componentWillReceiveProps(nextProps) {
		this.doTrackersFetch(nextProps);
    }


    doTrackersFetch(props) {

		// Fetch the tracker passed in the Route params
		const trackerId = this.props.match.params.trackerId;

    	// We must eagar load all trackers upfront 
		// just in case we don't have them
		if (!isEmpty(props.trackers)) {
			this.props.setCurrentTracker(trackerId);
		}
	}
	
	handleTrackerActivation(e) {
		e.preventDefault();

		const {tracker} = this.props;

		this.props.activateTracker(tracker.uid);
	}

	handleTrackerDeactivation(e) {
		e.preventDefault();

		const {tracker} = this.props;

		this.props.deActivateTracker(tracker.uid);
	}

	handleTrackerDeletion(e) {
		e.preventDefault();

		const {tracker} = this.props;

		this.props.deleteTracker(tracker.uid);

		// TODO - add UI to indicate Tracker was deleted
		this.props.history.push(`/trackers/`);
	}


	render() {
		const { tracker, isFetching, isError } = this.props;

		// TODO - if Tracker is in past then show warning
		// ...and don't track!
	    return (
	    	<TrackerDetail isFetching={isFetching} isError={isError} tracker={tracker} onStart={this.handleTrackerActivation} onStop={this.handleTrackerDeactivation} onDelete={ this.handleTrackerDeletion} />
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
