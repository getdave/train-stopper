import faker from 'faker';
import configureMockStore from 'redux-mock-store';
import { times } from 'lodash';

import * as ACTIONS from '../actions';
import * as TYPES 	from '../types';

// Creates x10 fake Notifications
const fakeNotifications = times(10, () => {
	return {
		title: faker.random.word(),
		icon: faker.random.image(),
		image: faker.random.image(),
		badge: faker.random.image(),
		body: faker.lorem.sentence(),
	};
})

describe('notification action creators', () => {
	it('should create CREATING_NOTIFICATION when creating a notification', () => {

		const notification = fakeNotifications[0];

		const expectedAction = { 
			type: TYPES.CREATING_NOTIFICATION_SUCCESS,
			payload: notification
		};		
		
		expect(ACTIONS.createNotification(notification)).toEqual(expectedAction)
	})
})