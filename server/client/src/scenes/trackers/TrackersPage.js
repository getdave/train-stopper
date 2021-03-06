import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import * as trackersSelectors from '../../trackers/reducer';
import * as trackersActions from '../../trackers/actions';

import { Container } from 'semantic-ui-react';
import TrackersList from './components/TrackersList';

class TrackersPage extends Component {

	componentDidMount() {
		// Fetch if not already populated (unlikely but...)
		if (isEmpty(this.props.trackers)) {
			this.props.fetchTrackers();
		}
    }


	render() {
		return (
			<Container>
				<h1>Your Trackers</h1>
				<TrackersList {...this.props} />
			</Container>
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
