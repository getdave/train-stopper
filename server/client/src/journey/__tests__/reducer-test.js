import reducer, {
    selectIsFetching,
    selectIsError,
    selectOrigin,
    selectDestination,
    selectStationServices,
    selectService,
    selectDate,
    selectTime
} from '../reducer';

import {
    SETTING_STATIONS_SUCCESS,
    FETCHING_STATION_SERVICES,
    FETCHING_STATION_SERVICES_SUCCESS,
    FETCHING_STATION_SERVICES_FAILED,
    FETCHING_SERVICE,
    FETCHING_SERVICE_SUCCESS,
    FETCHING_SERVICE_FAILED,
    SETTING_DATETIME_SUCCESS,
    SETTING_USERINPUT_SUCCESS
} from '../types';

import { timeStampFromDateTime } from '../../helpers';

const INITIAL_STATE = {
    userInput: {
        originStation: '',
        destinationStation: '',
        date: ''
    },
    service: {
        origin: '',
        destination: ''
    }, 
    stationServices: [], 
    ui: {
        isFetching: false,
        isError: false
    }
};


/**
 * REDUCERS
 */

describe('journeys reducer', () => {
    it('returns the initial state', () => {

        const expected  = INITIAL_STATE;

        const result = reducer(undefined, {});

        expect(result).toEqual(expected);
    })

    describe('userInput', () => {
        it('handles SETTING_USERINPUT_SUCCESS', () => {

            const payload = {
                originStation: 'fro',
                destinationStation: 'bri',
                date: timeStampFromDateTime('2017-10-23','08:00')

            };

            const expected  = Object.assign({}, INITIAL_STATE, {
                userInput: payload
            });            

            const result = reducer(INITIAL_STATE, {
                type: SETTING_USERINPUT_SUCCESS,
                payload: payload
            });
        
            expect(result).toEqual(expected);
        })
    });

    

    describe('station services', () => {
        it('handles FETCHING_STATION_SERVICES_SUCCESS type', () => {

            const payload = [
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
                }
            ];

            const expected  = Object.assign({}, INITIAL_STATE, {
                stationServices: payload
            });            

            const result = reducer(INITIAL_STATE, {
                type: FETCHING_STATION_SERVICES_SUCCESS,
                payload: payload
            });
        
            expect(result).toEqual(expected);
        })
    });



    describe('service', () => {
        it('handles FETCHING_SERVICE_SUCCESS type', () => {

            const payload = [
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

            

            const expected  = Object.assign({}, INITIAL_STATE, {
                service: {
                    origin: payload[0],
                    destination: payload[1]
                }
            });            

            const result = reducer(INITIAL_STATE, {
                type: FETCHING_SERVICE_SUCCESS,
                payload: payload
            });
        
            expect(result).toEqual(expected);
        })
    });
});


/**
 * SELECTORS
 */
describe('journeys selectors', () => {
    const globalState  = {
        journey: INITIAL_STATE // TODO generate some real test data
    };
    test('selectIsFetching correctly selects from state', () => {
        
        const result = selectIsFetching(globalState);

        expect(result).toBe(false);
    })

    test('selectIsError correctly selects from state shape', () => {

        const result = selectIsError(globalState);

        expect(result).toBe(false);
    })

    test('selectOrigin correctly selects from state shape', () => {

        const result = selectOrigin(globalState);

        expect(result).toEqual('');
    })

    test('selectDestination correctly selects from state shape', () => {

        const result = selectDestination(globalState);

        expect(result).toEqual('');
    })

    test('selectDate correctly selects date from state shape', () => {

        const result = selectDate(globalState);

        expect(result).toEqual('');
    })

    // test('selectTime correctly selects date from state shape', () => {

    //     const result = selectTime(globalState);

    //     expect(result).toEqual('');
    // })
    
    test('selectStationServices correctly selects from state shape', () => {

        const result = selectStationServices(globalState);

        expect(result).toEqual([]);
    })

    test('selectService correctly selects from state shape', () => {

        const result = selectService(globalState);

        expect(result).toEqual({
            origin: '',
            destination: ''
        });
    })
})