import { addHours, format } from 'date-fns';
import { times, filter, keyBy } from 'lodash';
import faker from 'faker';

import reducer, {
    selectTrackers,
    selectTracker,
    selectCurrentTracker,
    selectIsFetching,
    selectIsError,
    selectNonArchivedTrackers
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

// Some random stops based on real data from the API
const stopData = [
    {
        name: 'Frome',
        code: 'FRO'
    },
    {
        name: 'Bristol Temple Meads',
        code: 'BRI'
    },
    {
        name: 'Bradford-upon-Avon',
        code: 'BOA'
    },
    {
        name: 'Bath Spa',
        code: 'BTH'
    },
];

// Generate our fake data
const fakeTrackersData = times(5, () => {
    const start     = faker.date.future();
    const end       = addHours(start, 1);
    const random    = faker.random.number({min:0, max:stopData.length-1});

    // Grab random station from stops data
    const origin = stopData[ random ];

    // Filter out this value to ensure it cannot be selected again as dest
    const newStopData = filter(stopData, (value, index ) => {
        return index !== random;
    })

    // Grab random station
    const dest = newStopData[ faker.random.number({min:0, max: newStopData.length-1}) ];
    
    return {
        uid: faker.random.uuid(),
        status: faker.random.arrayElement(['active', 'inactive', 'archived']),
        data: {},
        originCode: origin.code,
        originName: origin.name,
        destinationCode: dest.code,
        destinationName: dest.name,
        date: format( start, 'YYYY-MM-DD'),
        time: format( start, 'HH:mm')
    };
})

// Map fake data as required by store
const fakeTrackersById     = keyBy(fakeTrackersData, item => item.uid);
const fakeTrackersAllIds   = fakeTrackersData.map(item => item.uid);


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

    describe('setting current tracker', () => {
        it('handles SETTING_CURRENT_TRACKER_SUCCESS', () => {

            const selectedTrackerId = '987puofkskdj';

            const expected  = Object.assign({}, INITIAL_STATE, {
                current: selectedTrackerId // we expect to get ba
            });            

            const result = reducer(INITIAL_STATE, {
                type: TYPES.SETTING_CURRENT_TRACKER_SUCCESS,
                payload: selectedTrackerId // the "id" of the tracker
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
                current: currentTracker['uid'],
                data: {
                    byId: fakeTrackersById // we need this in state to be able to select the current item
                }
            })
        };

        const result = selectCurrentTracker(state);


        expect(result).toEqual(currentTracker);
    })

    test('selectNonArchivedTrackers correctly selects all trackers which are not archived', () => {

        const state  = {
            trackers: Object.assign({}, INITIAL_STATE, {
                data: {
                    allIds: fakeTrackersAllIds,
                    byId: fakeTrackersById // we need this in state to be able to select the current item
                }
            })
        };

        const result = selectNonArchivedTrackers(state);
        
        result.forEach(item => {
            expect(item).not.toHaveProperty( 'status', 'archived' );
        })
    })
})
