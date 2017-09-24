import { 
	createStoreWithFakeAPI,
	makeDispatchWithStore,
	rejectedPromise
} from '../../tests/helpers';

import * as actions from '../actions';
import * as types from '../types';


const fakeStationsData = [
    {
        "id": 0,
        "value": "fro",
        "label": "Frome"
    },
    {
        "id": 1,
        "value": "fny",
        "label": "Finchley Road & Frognal"
    },
    {
        "id": 2,
        "value": "frd",
        "label": "Frodsham"
    }
];


describe('journey action creators', () => {


	describe('fetchingStations', () => {

		const mockSuccessStore   = createStoreWithFakeAPI({
		  	fetchStations: () => {
		  		return Promise.resolve({
					status: 200,
					data: fakeStationsData
				})
		  	}
		});

		const mockErrorStore   = createStoreWithFakeAPI({
		  	fetchStations: rejectedPromise
		});


		const dispatchFetchStations = makeDispatchWithStore(actions, 'fetchStations', 'frome');


		it('should create FETCHING_STATIONS when fetching Stations is started', () => {

			const expectedActions = [
				{ 
					type: types.FETCHING_STATIONS
				}
			]
			const store = mockSuccessStore()

			// Note: we are testing the actual action here not a fake action!
			return dispatchFetchStations(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create FETCHING_STATIONS_SUCCESS when fetching Stations is successful', () => {

			const expectedActions = [
				{ 
					type: types.FETCHING_STATIONS_SUCCESS,
					payload: fakeStationsData
				}
			]
			const store = mockSuccessStore()

			// Note: we are testing the actual action here not a fake action!
			return dispatchFetchStations(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create FETCHING_STATIONS_ERROR when fetching Stations is unsuccessful', () => {

			const expectedActions = [
				{ 
					type: types.FETCHING_STATIONS_FAILED,
				}
			]
			const store = mockErrorStore()

			// Note: we are testing the actual action here not a fake action!
			return dispatchFetchStations(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})
	});
})