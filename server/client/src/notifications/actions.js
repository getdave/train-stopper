import * as TYPES from './types';
import uid from 'uid';


export function createNotification(notification) {        
    return { 
        type: TYPES.CREATING_NOTIFICATION_SUCCESS,
        payload: notification
    };
}


export function deleteNotification(id) {        
    return { 
        type: TYPES.DELETING_NOTIFICATION_SUCCESS,
        payload: id
    };
}