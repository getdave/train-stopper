import faker from 'faker';
import { keyBy } from 'lodash';

import reducer, {
    INITIAL_STATE
} from '../reducer';

import * as TYPES from '../types';


// Approximates fake data from persistent storage
const fakeNotifications = [
    {
        uid: faker.random.uuid(),
        title: faker.random.word(),
        icon: faker.random.image(),
        image: faker.random.image(),
        badge: faker.random.image(),
        body: faker.lorem.sentence(),
    },
    {
        uid: faker.random.uuid(),
        title: faker.random.word(),
        icon: faker.random.image(),
        image: faker.random.image(),
        badge: faker.random.image(),
        body: faker.lorem.sentence(),
    }
];

const fakeNotificationsByID     = keyBy(fakeNotifications, notif => notif.uid);
const fakeNotificationsAllIds   = fakeNotifications.map(notif => notif.uid);



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

    describe('deletomg notifications', () => {

        // it('handles DELETING_NOTIFICATION_SUCCESS', () => {

        //     const notificationToRemove = fakeNotifications[0];

        //     const expected  = Object.assign({}, INITIAL_STATE, {
        //         byId: {
        //             [newNotification['uid']]: newNotification
        //         },
        //         allIds: [newNotification['uid']]
                    
        //     });            

        //     const result = reducer(INITIAL_STATE, {
        //         type: TYPES.DELETING_NOTIFICATION_SUCCESS,
        //         payload: newNotification
        //     });
        
        //     expect(result).toEqual(expected);
        // })   
        
    });
})
