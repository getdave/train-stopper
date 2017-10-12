import faker from 'faker';
import { keyBy } from 'lodash';
import { 
	createStoreWithFakeAPI,
	makeDispatchWithStore,
	rejectedPromise
} from '../../tests/helpers';

import * as ACTIONS from '../actions';
import * as TYPES 	from '../types';
import { omitByKey } from '../../helpers';


const fakeTrackersData = [
	{
		uid: faker.random.uuid(),
		origin: {
			station_code: 'FRO',
			station_name: 'Frome',
		},
		destination: {
			station_code: 'BRI',
			station_name: 'Bristol',
			aimed_departure_date: '2017-10-29',
			aimed_departure_time: '08:03'
		}
	}
];

// Map fake data as required by store
const fakeTrackersById     = keyBy(fakeTrackersData, item => item.uid);
const fakeTrackersAllIds   = fakeTrackersData.map(item => item.uid);





describe('tracker action creators', () => {

	describe('fetchTrackers', () => {

		const mockSuccessStore   = createStoreWithFakeAPI({
		  	fetchTrackers: () => {
		  		return Promise.resolve({
					status: 200,
					data: fakeTrackersData
				})
		  	}
		});

		const mockErrorStore   = createStoreWithFakeAPI({
		  	fetchTrackers: rejectedPromise
		});

		const dispatchWithStore = makeDispatchWithStore(ACTIONS, 'fetchTrackers');



		it('should create FETCHING_TRACKERS when fetching Trackers is started', () => {

			const expectedActions = [
				{ 
					type: TYPES.FETCHING_TRACKERS
				}
			]
			const store = mockSuccessStore()



			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create FETCHING_TRACKERS_SUCCESS when fetching Trackers is successful', () => {

			const expectedActions = [
				{ 
					type: TYPES.FETCHING_TRACKERS_SUCCESS,
					payload: fakeTrackersData
				}
			]
			const store = mockSuccessStore();


			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create FETCHING_TRACKERS_FAILED when fetching Trackers is unsuccessful', () => {

			const expectedActions = [
				{ 
					type: TYPES.FETCHING_TRACKERS_FAILED				}
			]
			const store = mockErrorStore();
			

			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})
	})	


	describe('createTracker', () => {

		const mockSuccessStore   = createStoreWithFakeAPI({
		  	createTracker: () => {
		  		return Promise.resolve({
					status: 200,
					data: fakeTrackersData
				})
		  	}
		});

		const mockErrorStore   = createStoreWithFakeAPI({
		  	createTracker: rejectedPromise
		});

		const dispatchWithStore = makeDispatchWithStore(ACTIONS, 'createTracker', fakeTrackersData[0]);

		it('should create CREATING_TRACKER when setting a Tracker is started', () => {

			const expectedActions = [
				{ 
					type: TYPES.CREATING_TRACKER
				}
			]
			const store = mockSuccessStore()



			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create CREATING_TRACKER_SUCCESS when setting a Tracker is successful', () => {

			const expectedActions = [
				{ 
					type: TYPES.CREATING_TRACKER_SUCCESS,
					payload: fakeTrackersData
				}
			]
			const store = mockSuccessStore();


			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create CREATING_TRACKER_FAILED when setting a Tracker is unsuccessful', () => {

			const expectedActions = [
				{ 
					type: TYPES.CREATING_TRACKER_FAILED
				}
			]
			const store = mockErrorStore();
			

			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})
	})


	describe('deleteTracker', () => {

		const fakeTrackerId = fakeTrackersData[0]['uid'];

		const mockSuccessStore = createStoreWithFakeAPI({
		  	deleteTracker: () => {
		  		return Promise.resolve({
					status: 200,
					data: fakeTrackerId
				})
		  	}
		});


		const mockErrorStore   = createStoreWithFakeAPI({
		  	deleteTracker: rejectedPromise
		});

		const dispatchWithStore = makeDispatchWithStore(ACTIONS, 'deleteTracker', [fakeTrackerId]);




		it('should create DELETING_TRACKER when deleting Tracker is started', () => {

			const expectedActions = [
				{ 
					type: TYPES.DELETING_TRACKER
				}
			]
			const store = mockSuccessStore();

			

			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create DELETING_TRACKER_SUCCESS when deleting a Tracker is successful', () => {


			const expectedActions = [
				{ 
					type: TYPES.DELETING_TRACKER_SUCCESS,
					payload: fakeTrackerId
				}
			]
			const store = mockSuccessStore();


			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create DELETING_TRACKER_FAILED when deleting a Tracker is unsuccessful', () => {

			const expectedActions = [
				{ 
					type: TYPES.DELETING_TRACKER_FAILED
				}
			]
			const store = mockErrorStore();
			

			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})
	})	

})