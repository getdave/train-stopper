/**
 * NOITIFICATIONS REDUCER
 */

import { omit } from 'lodash';
import createReducer from '../utils/create-reducer';
import * as TYPES from './types';


export const INITIAL_STATE = {    
    byId: {},
    allIds: []    
};


/**
 * REDUCER
 */

// CREATE
function handleCreatingNotificationSuccess(state, action) {

	const notification = action.payload;

	const newState = {
		byId: {
			...state.byId, 
			[notification.uid]: notification 
		},
		allIds: state.allIds.concat(notification.uid)		
	};

    return newState; 
}

// DELETE
function handleDeletingNotificationSuccess(state, action) {
	const notificationId = action.payload;

	const byId 		= omit(state.byId, [notificationId]);

	const allIds 	= state.allIds.filter( id => id === notificationId);

    return {
    	byId,
    	allIds
    }; 
}

const dataReducer = createReducer(INITIAL_STATE, {
    [TYPES.CREATING_NOTIFICATION_SUCCESS]: handleCreatingNotificationSuccess,
    [TYPES.DELETING_NOTIFICATION_SUCCESS]: handleDeletingNotificationSuccess,
});



/**
 * SELECTORS
 */

// Ordered list of Notifications
export const selectNotifications = (state) => state.notifications.allIds.map( id => state.notifications.byId[id] );



// Export combined reducer
export default dataReducer;


