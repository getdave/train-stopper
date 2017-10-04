/**
 * POLLER
 *
 * uses Redux store to check for any expired Trackers 
 * (ie: trackers which have passed their expected arrival time)
 * and dispatches appropriate archive action to disable them
 */

import uuid from 'uuid';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import distanceInWordsToNow from 'date-fns/distance_in_words'
import * as trackersSelectors from '../trackers/reducer';
import * as trackersActions from '../trackers/actions';
import * as notificationsActions from '../notifications/actions';
import * as TYPES from '../trackers/types';


class Poller {

	constructor(store) {
		// The Redux store
		this.store = store;
	}

	start() {
		setInterval(() => {
			this.archiveExpired();			
		}, 3000);
	}


	archiveExpired() {
		const trackers = this.getExpired();

		trackers.forEach(tracker => {


			if ( this.hasNearlyArrived(tracker) ) {
				const distance = distanceInWordsToNow( Date.parse(`${tracker.date} ${tracker.time}`) );
                
                this.store.dispatch(
                	notificationsActions.createNotification({                		
				        uid: uuid(),
				        title: 'Your Station is approaching!',		 
				        body: `Arriving at ${tracker.destinationName} in ${distance}!`,
				        //icon: TODO - add icon!!  
                	})
                );
			}

			
			// If destination arrival time is in the past...
			if ( this.hasArrived(tracker) ) {
                
                // Archive the tracker
                this.store.dispatch(
                	trackersActions.archiveTracker(tracker.uid)
                );

                // Create a Notification
                this.store.dispatch(
                	notificationsActions.createNotification({                		
				        uid: uuid(),
				        title: 'Train Arriving!',		 
				        body: `Your train from ${tracker.originName} to ${tracker.destinationName} is arriving. GET OFF!`,
				        //icon: TODO - add icon!!  
                	})
                );

                
            }
		});
	}



	getExpired() {
		// Get state 
		const state = this.store.getState();

		const trackers = trackersSelectors.selectTrackers(state);

		const activeTrackers = trackers.filter(tracker => tracker.status !== 'archived');

		return activeTrackers;
	}

	hasNearlyArrived(tracker) {
		const diff = this.msTillArrival(tracker);

		const oneMin = 1000 * 60;

		return (diff > 10 && diff <= oneMin);
	}

	hasArrived(tracker) {
		const diff = this.msTillArrival(tracker);
		return (diff <= 0);
	}

	msTillArrival(tracker) {
		const arrival = Date.parse(`${tracker.date} ${tracker.time}`);
		const now 	  = new Date();
        const diff 	  = differenceInMilliseconds(arrival, new Date());

    	return diff;
	}
}


export default Poller;