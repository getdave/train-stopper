import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import * as trackersSelectors from '../../trackers/reducer';
import * as trackersActions from '../../trackers/actions';

import TrackersList from './TrackersList';

class TrackersPage extends Component {

	componentDidMount() {
		this.props.fetchTrackers();
    }


	render() {
		return (
			<div>
				<h1>Your Trackers</h1>
				<TrackersList {...this.props} />
			</div>
		);		
	}

	
};


function mapStateToProps(state) {
	return {
		trackers: trackersSelectors.selectTrackers(state),
		isFetching: trackersSelectors.selectIsFetching(state),
		isError: trackersSelectors.selectIsError(state),
	}
}


const enchance = compose(
    withRouter,
	connect(mapStateToProps, trackersActions)
);


export default enchance(TrackersPage);
