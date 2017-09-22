import { createStoreWithFakeAPI } from '../../tests/helpers';
import * as actions from '../actions';
import * as types from '../types';

const fakeJourneysData = [
    {
        "mode": "train",
        "service": "25471001",
        "train_uid": "P00229",
        "platform": null,
        "operator": "GW",
        "operator_name": "Great Western Railway",
        "aimed_departure_time": "09:32",
        "aimed_arrival_time": null,
        "aimed_pass_time": null,
        "origin_name": "Frome",
        "source": "ATOC",
        "destination_name": "Bristol Parkway",
        "category": "XX",
        "service_timetable": {
            "id": "https://transportapi.com/v3/uk/train/service/train_uid:P00229/2017-09-24/timetable.json?app_id=a2560ce6&app_key=c331f54ce5ebd37d11f0aba0d491e79b&darwin=true"
        }
    }
];

function fetchJourneysSuccess() {
	return Promise.resolve({
		status: 200,
		data: fakeJourneysData
	})
}

function fetchJourneysError() {
	return Promise.reject()
}


describe('journey action creators', () => {

	const mockSuccessStore   = createStoreWithFakeAPI({
	  	fetchJourneys: fetchJourneysSuccess
	});

	const mockErrorStore   = createStoreWithFakeAPI({
	  	fetchJourneys: fetchJourneysError
	});

	it('should create FETCHING_JOURNEYS_LIST when fetching Journeys is started', () => {

		const expectedActions = [
			{ 
				type: types.FETCHING_JOURNEYS_LIST
			}
		]
		const store = mockSuccessStore()

		return store.dispatch(actions.fetchJourneys('FRO', 'BRI', '2017-09-23','08:00')).then(() => {
			expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
		})
	})

	it('should create FETCHING_JOURNEYS_LIST_SUCCESS when fetching Journeys is successful', () => {

		const expectedActions = [
			{ 
				type: types.FETCHING_JOURNEYS_LIST_SUCCESS, 
				payload: fakeJourneysData 
			}
		]
		const store = mockSuccessStore()

		return store.dispatch(actions.fetchJourneys('FRO', 'BRI', '2017-09-23','08:00')).then(() => {
			expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
		})
	})

	it('should create FETCHING_JOURNEYS_LIST_FAILED when fetching Journeys is unsuccessful', () => {

		const expectedActions = [
			{ 
				type: types.FETCHING_JOURNEYS_LIST_FAILED, 
			}
		]
		const store = mockErrorStore()

		return store.dispatch(actions.fetchJourneys('FRO', 'BRI', '2017-09-23','08:00')).then(() => {
			expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
		})
	})
})