import parse from 'date-fns/parse';
import { 
	createStoreWithFakeAPI,
	makeDispatchWithStore,
		rejectedPromise
} from '../../tests/helpers';

import * as actions from '../actions';
import * as types from '../types';

const fakeStationServicesData = [
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

const fakeServiceData = [
    {
        "station_code": "FRO",
        "tiploc_code": "FROME",
        "station_name": "Frome",
        "stop_type": "LI",
        "platform": null,
        "aimed_departure_date": "2017-09-22",
        "aimed_departure_time": "08:02",
        "aimed_arrival_date": "2017-09-22",
        "aimed_arrival_time": "08:02",
        "aimed_pass_date": null,
        "aimed_pass_time": null,
        "expected_departure_date": null,
        "expected_departure_time": null,
        "expected_arrival_date": null,
        "expected_arrival_time": null,
        "expected_pass_date": null,
        "expected_pass_time": null,
        "status": null
    },
    {
        "station_code": "BRI",
        "tiploc_code": "BRSTLTM",
        "station_name": "Bristol Temple Meads",
        "stop_type": "LI",
        "platform": "5",
        "aimed_departure_date": "2017-09-22",
        "aimed_departure_time": "09:10",
        "aimed_arrival_date": "2017-09-22",
        "aimed_arrival_time": "09:06",
        "aimed_pass_date": null,
        "aimed_pass_time": null,
        "expected_departure_date": null,
        "expected_departure_time": null,
        "expected_arrival_date": null,
        "expected_arrival_time": null,
        "expected_pass_date": null,
        "expected_pass_time": null,
        "status": null
    }
];

describe('journey action creators', () => {

	describe('setUserInput', () => {
		it('should create SETTING_USERINPUT_SUCCESS ', () => {

			const originStation 		= 'FRO';
			const destinationStation 	= 'BRI';
			const date 					= '2017-09-27';
			const time 					= '08:00';

			const expectedAction = {
				type: types.SETTING_USERINPUT_SUCCESS,
				payload: {
		            originStation,
		            destinationStation,
		            date: parse(`${date} ${time}`).getTime()
		        }
			};

			expect(actions.setUserInput({
				originStation,
				destinationStation,
				date,
				time
			})).toEqual(expectedAction)
		})
	})



	describe('fetchStationServices', () => {

		const mockSuccessStore   = createStoreWithFakeAPI({
		  	fetchStationServices: () => {
		  		return Promise.resolve({
					status: 200,
					data: fakeStationServicesData
				})
		  	}
		});

		const mockErrorStore   = createStoreWithFakeAPI({
		  	fetchStationServices: rejectedPromise
		});

		
		const dispatchWithStore = makeDispatchWithStore(actions, 'fetchStationServices', ['FRO', 'BRI', '2017-09-23','08:00']);


		it('should create FETCHING_STATION_SERVICES when fetching Journeys is started', () => {

			const expectedActions = [
				{ 
					type: types.FETCHING_STATION_SERVICES
				}
			]
			const store = mockSuccessStore()



			// Note: we are testing the actual action here not a fake action!
			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create FETCHING_STATION_SERVICES_SUCCESS when fetching Journeys is successful', () => {

			const expectedActions = [
				{ 
					type: types.FETCHING_STATION_SERVICES_SUCCESS, 
					payload: fakeStationServicesData 
				}
			]
			const store = mockSuccessStore()

			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create FETCHING_STATION_SERVICES_FAILED when fetching Journeys is unsuccessful', () => {

			const expectedActions = [
				{ 
					type: types.FETCHING_STATION_SERVICES_FAILED, 
				}
			]
			const store = mockErrorStore()

			return dispatchWithStore(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

	})

	describe('fetchService', () => {

		const mockSuccessStore   = createStoreWithFakeAPI({
		  	fetchService: () => {
		  		return Promise.resolve({
					status: 200,
					data: fakeServiceData
				})
		  	}
		});

		const mockErrorStore   = createStoreWithFakeAPI({
		  	fetchService: rejectedPromise
		});


		const dispatchFetchService = makeDispatchWithStore(actions, 'fetchService', 'C29442', 'FRO', 'BRI', '2017-09-23');


		it('should create FETCHING_SERVICE when fetching a Service is started', () => {

			const expectedActions = [
				{ 
					type: types.FETCHING_SERVICE
				}
			]
			const store = mockSuccessStore()

			// Note: we are testing the actual action here not a fake action!
			return dispatchFetchService(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create FETCHING_SERVICE_SUCCESS when fetching a Service is successful', () => {

			const expectedActions = [
				{ 
					type: types.FETCHING_SERVICE_SUCCESS,
					payload: {
						data: fakeServiceData,
						trainUid: 'C29442',
					}
				}
			]
			const store = mockSuccessStore()

			// Note: we are testing the actual action here not a fake action!
			return dispatchFetchService(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})

		it('should create FETCHING_SERVICE_ERROR when fetching a Service is unsuccessful', () => {

			const expectedActions = [
				{ 
					type: types.FETCHING_SERVICE_FAILED,
				}
			]
			const store = mockErrorStore()

			// Note: we are testing the actual action here not a fake action!
			return dispatchFetchService(store).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
			})
		})
	});
})