import { 
	createStoreWithFakeAPI,
	makeDispatchWithStore,
		rejectedPromise
} from '../../tests/helpers';

import * as ACTIONS from '../actions';
import * as TYPES 	from '../types';


const fakeTrackersData = [
    {
        uid: '987puofkskdj',
        name: 'My Tracker'
    },
    {
        uid: '7948709834nbmnbc',
        name: 'My 2nd Tracker'
    }
];

describe('tracker action creators', () => {

	describe('fetch trackers', () => {

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


	describe('set tracker', () => {

		const mockSuccessStore   = createStoreWithFakeAPI({
		  	setTracker: () => {
		  		return Promise.resolve({
					status: 200,
					data: fakeTrackersData
				})
		  	}
		});

		const mockErrorStore   = createStoreWithFakeAPI({
		  	setTracker: rejectedPromise
		});

		const dispatchWithStore = makeDispatchWithStore(ACTIONS, 'setTracker');

		it('should create SETTING_TRACKER when setting a Tracker is started', () => {

			const expectedActions = [
				{ 
					type: TYPES.SETTING_TRACKER
				}
			]
			const store = mockSuccessStore()



			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create SETTING_TRACKER_SUCCESS when setting a Tracker is successful', () => {

			const expectedActions = [
				{ 
					type: TYPES.SETTING_TRACKER_SUCCESS,
					payload: fakeTrackersData
				}
			]
			const store = mockSuccessStore();


			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create FETCHING_TRACKERS_FAILED when setting a Tracker is unsuccessful', () => {

			const expectedActions = [
				{ 
					type: TYPES.SETTING_TRACKER_FAILED
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