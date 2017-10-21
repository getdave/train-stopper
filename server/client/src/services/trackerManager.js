/**
 * TRACKER MANAGER
 *
 * uses Redux store to check for any expired Trackers 
 * (ie: trackers which have passed their expected arrival time)
 * and dispatches appropriate archive action to disable them
 */

import uuid from 'uuid';
import { isEmpty, last } from 'lodash';
import { differenceInMilliseconds, isPast, getTime } from 'date-fns';

import * as trackersSelectors from '../trackers/reducer';
import * as trackersActions from '../trackers/actions';
import * as notificationsActions from '../notifications/actions';

// TODO - extract as this is not testable
const NOTIFICATION_TIME_CONFIG_DEFAULTS = [
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

class TrackerManager {

	constructor(store, notificatonTimerConfig=NOTIFICATION_TIME_CONFIG_DEFAULTS) {
		// The Redux store
		this.store = store;

		this.notificatonTimerConfig = notificatonTimerConfig;
	}


	handleTrackerNotifications() {
		
		const state = this.getStoreState();

		// Get all non-archived Trackers
		const trackers = trackersSelectors.selectNonArchivedTrackers(state);


		trackers.forEach(tracker => {

			const isInPast = isPast( tracker.date );

			// Get the first config level where the threshold has been exceeded
			const alertConf = this.getNearestAlertThresholdConfig(tracker);

			// Check whether the Trackers has already been alerted for the given threshold
			const hasAlerted = tracker.alerts[alertConf.threshold];
			
			// If the Tracker journey is not in the past then...
			if ( !isInPast && !isEmpty(alertConf) && !hasAlerted ) {

				// Notify user for active Trackers only!
				if(tracker.status === 'active') {
					this.createTrackerNotification(tracker, alertConf);  
				}

				// update tracker alert
				this.dispatchAction(
		        	trackersActions.setAlertThresholdComplete(tracker.uid, alertConf.threshold)
		        );
			}

			// Archive any Trackers that are in the past	
			if ( isInPast ) { 
				this.archiveTracker(tracker.uid);
			}
		});
	}


	createTrackerNotification(tracker, alertConf, uid=uuid()) {
		this.dispatchAction(
        	notificationsActions.createNotification({                		
		        uid: uid,
		        title: `Train ${alertConf.message}`,		 
		        body: `Your train from ${tracker.originName} to ${tracker.destinationName} ${alertConf.message}`,
        	})
        );
	}


	dispatchAction(action) {
		this.store.dispatch(action);
	}


	getNearestAlertThresholdConfig(tracker) {
		let level;

		level = this.notificatonTimerConfig.find( config => { 
			const bool = this.thresholdExceeded( tracker, config.threshold );
			return bool;
		});

		
		if (level !== undefined) {
			return level;
		}

		// If we haven't exceeded any thresholds
		// then return the highest threshold
		return last(this.notificatonTimerConfig);
	}


	archiveTracker(uid) {
		this.dispatchAction(
        	trackersActions.archiveTracker(uid)
        );
	}


	getStoreState() {
		return this.store.getState();
	}


	thresholdExceeded(tracker, threshold) {
		const diff = this.msTillArrival(tracker);
		return (diff <= threshold);
	}

	msTillArrival(tracker) {
		const currentTime = getTime(new Date()); // datetimestamp
		const arrivalTime = tracker.date; // datetimestamp

        const diff 	  	  = differenceInMilliseconds(arrivalTime, currentTime);
    	return diff;
	}
}


export default TrackerManager;