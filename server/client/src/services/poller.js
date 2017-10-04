/**
 * POLLER
 *
 * uses Redux store to check for any expired Trackers 
 * (ie: trackers which have passed their expected arrival time)
 * and dispatches appropriate archive action to disable them
 */

import uuid from 'uuid';
import { isEmpty } from 'lodash';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import isPast from 'date-fns/is_past';

import distanceInWordsToNow from 'date-fns/distance_in_words'
import * as trackersSelectors from '../trackers/reducer';
import * as trackersActions from '../trackers/actions';
import * as notificationsActions from '../notifications/actions';
import * as TYPES from '../trackers/types';

// TODO - extract as this is not testable
const notificatonTimerConfig = [
	{
		threshold: 1000, // 1 sec
		message: 'has arrived!'
	},
	{
		threshold: 1000 * 60, // 1 min
		message: 'arriving in 1 min'
	},
	{
		threshold: 1000 * 60 * 5, // 5 mins
		message: 'arriving in 5 mins'
	},
]

class Poller {

	constructor(store) {
		// The Redux store
		this.store = store;
	}

	start() {
		setInterval(() => {
			this.handleTrackerNotifications();			
		}, 3000);
	}


	handleTrackerNotifications() {


		// TODO - convert into a selector rather than rewrite
		const trackers = this.getNonArchivedTrackers();

		trackers.forEach(tracker => {

			const isInPast = isPast( Date.parse(`${tracker.date} ${tracker.time}`) );

			// Get the first config level where the threshold has been exceeded
			const alertConf = notificatonTimerConfig.find( config => {
				return this.thresholdExceeded( tracker, config.threshold );
			});
			
			// If the Tracker journey is not in the past then...
			if ( !isInPast && !isEmpty(alertConf) ) {

				// Notify user for active Trackers only!
				if(tracker.status === 'active') {
					this.store.dispatch(
	                	notificationsActions.createNotification({                		
					        uid: uuid(),
					        title: `Train ${alertConf.message}`,		 
					        body: `Your train from ${tracker.originName} to ${tracker.destinationName} ${alertConf.message}`,
	                	})
	                );
				}
			}

			// Archive any Trackers that are in the past	
			if ( isInPast ) { 
				this.store.dispatch(
                	trackersActions.archiveTracker(tracker.uid)
                );
			}
		});
	}



	getNonArchivedTrackers() {
		const state = this.store.getState();

		const trackers = trackersSelectors.selectTrackers(state);

		const activeTrackers = trackers.filter(tracker => tracker.status !== 'archived');

		return activeTrackers;
	}

	thresholdExceeded(tracker, threshold) {
		const diff = this.msTillArrival(tracker);
		return (diff <= threshold);
	}

	msTillArrival(tracker) {
		const arrival = Date.parse(`${tracker.date} ${tracker.time}`);
		const now 	  = new Date();
        const diff 	  = differenceInMilliseconds(arrival, new Date());

    	return diff;
	}
}


export default Poller;