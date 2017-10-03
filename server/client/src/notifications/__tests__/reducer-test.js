import reducer, {
    INITIAL_STATE
} from '../reducer';

import * as TYPES from '../types';



// Approximates fake data from persistent storage
const fakeNotifications = [
    {
        uid: '987puofkskdj',
        name: 'My Notification'
    },
    {
        uid: '7948709834nbmnbc',
        name: 'Some other Notification'
    }
];


const fakeNotificationsById = {
    '987puofkskdj' : fakeNotifications[0],
    '7948709834nbmnbc': fakeNotifications[1],
};

const fakeNotificationsAllIds = [
    fakeNotifications[0]['uid'],
    fakeNotifications[1]['uid']
];

/**
 * REDUCERS
 */

describe('notifications reducer', () => {
    it('returns the initial state', () => {

        const expected  = INITIAL_STATE;

        const result = reducer(undefined, {});

        expect(result).toEqual(expected);
    })


    describe('creating notifications', () => {



        it('handles CREATING_NOTIFICATION_SUCCESS', () => {

            const newNotification = fakeNotifications[0];

            const expected  = Object.assign({}, INITIAL_STATE, {
                    
                byId: {
                    [newNotification['uid']]: newNotification
                },
                allIds: [newNotification['uid']]
                    
            });            

            const result = reducer(INITIAL_STATE, {
                type: TYPES.CREATING_NOTIFICATION_SUCCESS,
                payload: newNotification
            });
        
            expect(result).toEqual(expected);
        })   
        
    });
})
