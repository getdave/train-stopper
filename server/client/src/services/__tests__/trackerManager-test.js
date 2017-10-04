import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import faker from 'faker';
import { keyBy, omit, times, filter } from 'lodash';
import format from 'date-fns/format';
import addHours from 'date-fns/add_hours';
import addMinutes from 'date-fns/add_minutes'
import MockDate from 'mockdate';

import TrackerManager from '../trackerManager';

const middlewares = [ reduxThunk ]
const mockStore = configureMockStore(middlewares);

// Some random stops based on real data from the API
const stopData = [
	{
		name: 'Frome',
		code: 'FRO'
	},
	{
		name: 'Bristol Temple Meads',
		code: 'BRI'
	},
	{
		name: 'Bradford-upon-Avon',
		code: 'BOA'
	},
	{
		name: 'Bath Spa',
		code: 'BTH'
	},
];

// Generate our fake data
const fakeTrackers = times(5, () => {
	const start 	= faker.date.future();
	const end 		= addHours(start, 1);
	const random 	= faker.random.number({min:0, max:stopData.length-1});

	// Grab random station from stops data
	const origin = stopData[ random ];

	// Filter out this value to ensure it cannot be selected again as dest
	const newStopData = filter(stopData, (value, index ) => {
		return index !== random;
	})

	// Grab random station
	const dest = newStopData[ faker.random.number({min:0, max: newStopData.length-1}) ];
	
	return {
        uid: faker.random.uuid(),
        status: faker.random.arrayElement(['active', 'inactive', 'archived']),
        data: {},
        originCode: origin.code,
        originName: origin.name,
        destinationCode: dest.code,
        destinationName: dest.name,
        date: format( start, 'YYYY-MM-DD'),
        time: format( start, 'HH:mm')
    };
})

// Map fake data as required by store
const fakeTrackersByID     = keyBy(fakeTrackers, item => item.uid);
const fakeTrackersAllIds   = fakeTrackers.map(item => item.uid);

describe('trackerManager service', () => {

	const middlewares = [ reduxThunk ]
	
	const store = mockStore({
		trackers: {
			data: {
				byId: fakeTrackersByID,
				allIds: fakeTrackersAllIds
			}
		}
	})

	describe('getStoreState', () => {
		it('should return the store state', () => {
			
			const subject = new TrackerManager(store);

			const expected = store.getState();

			const result = subject.getStoreState();

			expect(result).toEqual(expected)

		})
	});

	describe('thresholdExceeded', () => {
		
		afterEach(() => {
			MockDate.reset();
		})

		it('should return true when tracker has passed a known threshold', () => {
			
			// Use Mockdate to force Date to return a known value
			// https://www.npmjs.com/package/mockdate
			MockDate.set('10/25/2017', -60);

			// "now" is used within method - 
			const now = new Date();		

			const fiveMinThreshold = 1000 * 60 * 5;

			// Get a TS 4 mins away from now
			const timeAtFourMinsBeforeArrival = addMinutes(now, 4);

			const tracker = {
				date: format(timeAtFourMinsBeforeArrival, 'YYYY-MM-DD'),
				time: format(timeAtFourMinsBeforeArrival, 'HH:mm')
			};

			const subject = new TrackerManager(store);

			// We expect that the 5 min threshold will be exceeded if we're only
			// 4 mins from arrival (ie: now)
			const expected = true;

			// Have we passed the 5 minute threshold
			const result = subject.thresholdExceeded(tracker, fiveMinThreshold);

			expect(result).toEqual(expected)

		})
	});


})

	