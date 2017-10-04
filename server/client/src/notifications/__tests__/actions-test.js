import faker from 'faker';
import configureMockStore from 'redux-mock-store';
import { times } from 'lodash';

import * as ACTIONS from '../actions';
import * as TYPES 	from '../types';

// Creates x10 fake Notifications
const fakeNotifications = times(10, () => {
	return {
		uid: faker.random.uuid(),
		title: faker.random.word(),
		icon: faker.random.image(),
		image: faker.random.image(),
		badge: faker.random.image(),
		body: faker.lorem.sentence(),
	};
})

describe('notification action creators', () => {
	it('should create CREATING_NOTIFICATION_SUCCESS when creating a notification', () => {

		const notification = fakeNotifications[0];

		const expectedAction = { 
			type: TYPES.CREATING_NOTIFICATION_SUCCESS,
			payload: notification
		};		
		
		expect(ACTIONS.createNotification(notification)).toEqual(expectedAction)
	})

	it('should create DELETING_NOTIFICATION_SUCCESS when deleting a notification', () => {

		const notificationId = fakeNotifications[0]['uid'];

		const expectedAction = { 
			type: TYPES.DELETING_NOTIFICATION_SUCCESS,
			payload: notificationId
		};		
		
		expect(ACTIONS.deleteNotification(notificationId)).toEqual(expectedAction)
	})
})