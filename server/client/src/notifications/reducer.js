/**
 * NOITIFICATIONS REDUCER
 */

import { combineReducers } from 'redux';
import createReducer from '../utils/create-reducer';
import * as TYPES from './types';


export const INITIAL_STATE = {    
    byId: {},
    allIds: []    
};


/**
 * CREATE
 */
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

/**
 * DELETE
 */
function handleDeletingNotificationSuccess(state, action) {
	const notification = action.payload;

	const byId = Object.keys(state.byId).reduce( (acc, curr) => {
		if(curr.uid !== notification.uid) {
			acc[curr.uid] = curr;
		}
		return acc;
	},{});

	const allIds = state.allIds.filter( id => id === notification.uid);

    return {
    	byId,
    	allIds
    }; 
}

const dataReducer = createReducer(INITIAL_STATE, {
    [TYPES.CREATING_NOTIFICATION_SUCCESS]: handleCreatingNotificationSuccess,
    [TYPES.DELETING_NOTIFICATION_SUCCESS]: handleDeletingNotificationSuccess,
});



// Export combined reducer
export default dataReducer;


