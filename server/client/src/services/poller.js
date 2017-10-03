/**
 * POLLER
 *
 * uses Redux store to check for any expired Trackers 
 * (ie: trackers which have passed their expected arrival time)
 * and dispatches appropriate archive action to disable them
 */

import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import * as trackersSelectors from '../trackers/reducer';
import * as trackersActions from '../trackers/actions';
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
			
			// If destination arrival time is in the past...
			if ( this.hasArrived(tracker) ) {
                
                // Archive the tracker
                this.store.dispatch(
                	trackersActions.archiveTracker(tracker.uid)
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