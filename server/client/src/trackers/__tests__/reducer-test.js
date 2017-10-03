import reducer, {
    selectTrackers,
    selectTracker,
    selectCurrentTracker,
    selectIsFetching,
    selectIsError
} from '../reducer';

import * as TYPES from '../types';

const INITIAL_STATE = {
    current: false,
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

    describe('fetching single tracker', () => {
        it('handles FETCHING_TRACKER_SUCCESS', () => {

            const selectedTrackerId = '987puofkskdj';

            const expected  = Object.assign({}, INITIAL_STATE, {
                current: fakeTrackersById[selectedTrackerId] // we expect to get ba
            });            

            const result = reducer(INITIAL_STATE, {
                type: TYPES.FETCHING_TRACKER_SUCCESS,
                payload: fakeTrackersById[selectedTrackerId] // the "id" of the tracker
            });
        
            expect(result).toEqual(expected);
        })
    });
})



/**
 * SELECTORS
 */
describe('trackers selectors', () => {
    const globalState  = {
        trackers: INITIAL_STATE
    };
    test('selectIsFetching correctly selects from state', () => {
        
        const result = selectIsFetching(globalState);

        expect(result).toBe(false);
    })

    test('selectIsError correctly selects from state shape', () => {

        const result = selectIsError(globalState);

        expect(result).toBe(false);
    })

    test('selectTrackers correctly selects all trackers from state shape', () => {

        const state  = {
            trackers: Object.assign({}, INITIAL_STATE, {
                data: {
                    byId: fakeTrackersById,
                    allIds: fakeTrackersAllIds
                }
            })
        };

        const result = selectTrackers(state);

        expect(result).toEqual(fakeTrackersData);
    })

    test('selectTracker correctly selects a single tracker from state shape', () => {

        const state  = {
            trackers: Object.assign({}, INITIAL_STATE, {
                data: {
                    byId: fakeTrackersById,
                    allIds: fakeTrackersAllIds
                }
            })
        };

        const trackerToSelect = fakeTrackersData[0]['uid'];

        const result = selectTracker(state, trackerToSelect);

        expect(result).toEqual(fakeTrackersData[0]);
    })

    test('selectCurrentTracker correctly selects current tracker from state shape', () => {

        const currentTracker = fakeTrackersData[0];

        const state  = {
            trackers: Object.assign({}, INITIAL_STATE, {
                current: currentTracker
            })
        };

        const result = selectCurrentTracker(state);

        expect(result).toEqual(currentTracker);
    })


})
