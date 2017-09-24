import reducer, {

} from '../reducer';

import {
    FETCHING_STATIONS,
    FETCHING_STATIONS_SUCCESS,
    FETCHING_STATIONS_FAILED,
} from '../types';


const INITIAL_STATE = {
    stations: [],
    ui: {
        isFetching: false,
        isError: false
    }
};


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

/**
 * REDUCERS
 */

describe('stations reducer', () => {
    it('returns the initial state', () => {

        const expected  = INITIAL_STATE;

        const result = reducer(undefined, {});

        expect(result).toEqual(expected);
    })

    describe('stations', () => {
        it('handles FETCHING_STATIONS action', () => {

            const expected  = Object.assign({}, INITIAL_STATE, {
                ui: {
                    isError: false,
                    isFetching: true
                }
            });            

            const result = reducer(INITIAL_STATE, {
                type: FETCHING_STATIONS,
            });
        
            expect(result).toEqual(expected);
        })

        it('handles FETCHING_STATIONS_SUCCESS action', () => {

            const expected  = Object.assign({}, INITIAL_STATE, {
                stations: fakeStationsData
            });            

            const result = reducer(INITIAL_STATE, {
                type: FETCHING_STATIONS_SUCCESS,
                payload: fakeStationsData
            });
        
            expect(result).toEqual(expected);
        })

        it('handles FETCHING_STATIONS_FAILED action', () => {

            const expected  = Object.assign({}, INITIAL_STATE, {
                ui: {
                    isError: true,
                    isFetching: false
                }
            });            

            const result = reducer(INITIAL_STATE, {
                type: FETCHING_STATIONS_FAILED,
            });
        
            expect(result).toEqual(expected);
        })
    });
    
});

