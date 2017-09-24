import reducer, {

} from '../reducer';

import * as TYPES from '../types';

const INITIAL_STATE = {
    data: [],
    ui: {
        isError: false,
        isFetching: false
    }
};


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

/**
 * REDUCERS
 */

describe('trackers reducer', () => {
    it('returns the initial state', () => {

        const expected  = INITIAL_STATE;

        const result = reducer(undefined, {});

        expect(result).toEqual(expected);
    })


    it('handles FETCHING_TRACKERS', () => {

        const expected  = Object.assign({}, INITIAL_STATE, {
            ui: {
                isError: false,
                isFetching: true
            }
        });            

        const result = reducer(INITIAL_STATE, {
            type: TYPES.FETCHING_TRACKERS,
        });
    
        expect(result).toEqual(expected);
    })

   
    it('handles FETCHING_TRACKERS_SUCCESS', () => {
        const expected  = Object.assign({}, INITIAL_STATE, {
            data: fakeTrackersData,
            ui: {
                isError: false,
                isFetching: false
            }
        });            

        const result = reducer(INITIAL_STATE, {
            type: TYPES.FETCHING_TRACKERS_SUCCESS,
            payload: fakeTrackersData
        });
    
        expect(result).toEqual(expected);
    })


    it('handles FETCHING_TRACKERS_FAILED', () => {
        const expected  = Object.assign({}, INITIAL_STATE, {
            data: [],
            ui: {
                isError: true,
                isFetching: false
            }
        });            

        const result = reducer(INITIAL_STATE, {
            type: TYPES.FETCHING_TRACKERS_FAILED,
        });
    
        expect(result).toEqual(expected);
    })
    





})