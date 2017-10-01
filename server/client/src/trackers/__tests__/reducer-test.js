import reducer, {

} from '../reducer';

import * as TYPES from '../types';

const INITIAL_STATE = {
    data: {
        byId: {},
        allIds: []
    },
    ui: {
        isError: false,
        isFetching: false
    }
};

// Approximates fake data from persistent storage
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


const fakeTrackersById = {
    '987puofkskdj' : fakeTrackersData[0],
    '7948709834nbmnbc': fakeTrackersData[1],
};

const fakeTrackersAllIds = [
    fakeTrackersData[0]['uid'],
    fakeTrackersData[1]['uid']
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


    describe('fetching trackers', () => {
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
                data: {
                    byId: fakeTrackersById,
                    allIds: fakeTrackersAllIds
                },
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
                data: {
                    byId: {},
                    allIds: []
                },
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


    describe('creating tracker', () => {
        it('handles CREATING_TRACKER', () => {

            const expected  = Object.assign({}, INITIAL_STATE, {
                ui: {
                    isError: false,
                    isFetching: true
                }
            });            

            const result = reducer(INITIAL_STATE, {
                type: TYPES.CREATING_TRACKER,
            });
        
            expect(result).toEqual(expected);
        })

        it('handles CREATING_TRACKER_SUCCESS', () => {
            const expected  = Object.assign({}, INITIAL_STATE, {
                data: {
                    byId: fakeTrackersById,
                    allIds: fakeTrackersAllIds
                },
                ui: {
                    isError: false,
                    isFetching: false
                }
            });            

            const result = reducer(INITIAL_STATE, {
                type: TYPES.CREATING_TRACKER_SUCCESS,
                payload: fakeTrackersData
            });
        
            expect(result).toEqual(expected);
        })


        it('handles CREATING_TRACKER_FAILED', () => {
            const expected  = Object.assign({}, INITIAL_STATE, {
                data: {
                    byId: {},
                    allIds: []
                },
                ui: {
                    isError: true,
                    isFetching: false
                }
            });            

            const result = reducer(INITIAL_STATE, {
                type: TYPES.CREATING_TRACKER_FAILED,
            });
        
            expect(result).toEqual(expected);
        })
    })
})