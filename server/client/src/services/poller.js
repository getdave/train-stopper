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
import distanceInWordsToNow from 'date-fns/distance_in_words'
import * as trackersSelectors from '../trackers/reducer';
import * as trackersActions from '../trackers/actions';
import * as notificationsActions from '../notifications/actions';
import * as TYPES from '../trackers/types';

// TODO - extract as this is not testable
const notificatonTimerConfig = [
	{
		threshold: 1000 * 60 * 5, // 5 mins
		shouldArchive: false
	},
	{
		threshold: 1000 * 60, // 1 min
		shouldArchive: false 
	},
	{
		threshold: 1000, // 1 sec
		shouldArchive: true  // archive the tracker
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
		debugger;
		const trackers = this.getNonArchivedTrackers();

		trackers.forEach(tracker => {
			
			// Get the current alert level on this tracker and extract
			// the relevant config setting for this level
			let alertLevel 	= tracker.alertLevel; 
			const alertConf = notificatonTimerConfig[alertLevel];

			// If the threshold for this alert level has been exceeded then
			// 1. Notify the user immediately
			// 2. Increment the alert level on the tracker
			if ( !isEmpty(alertConf) && this.thresholdExceeded( tracker, alertConf.threshold ) ) {

				// Only Notify for active Trackers
				if(tracker.status === 'active') {
					this.store.dispatch(
	                	notificationsActions.createNotification({                		
					        uid: uuid(),
					        title: `Alert Level ${alertLevel}: Train Arriving!`,		 
					        body: `Your train from ${tracker.originName} to ${tracker.destinationName} is arriving in ${alertConf.threshold}`,
	                	})
	                );
				}
				
				// For both "active" & "inactive" ensure alert level is incremented appropriately
				this.store.dispatch(			
					trackersActions.setTrackerAlertLevel( tracker.uid, alertLevel++ )
				);
			}

			// If the current alert level config indcates we should archive the Tracker
			// then do it!			
			if ( !isEmpty(alertConf) && alertConf.shouldArchive ) { 
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