import axios from 'axios';
import { isEmpty } from 'lodash';

/**
 * FETCH TRACKERS
 */
export const fetchTrackers = () => {
    return new Promise( (resolve, reject) => {
        const data = JSON.parse( window.localStorage.getItem('ts-journeys') );
        
        resolve({
            status: 200,
            data,
       });
    })
};


/**
 * SET TRACKER
 */
export const createTracker = (tracker) => {
    return new Promise( (resolve, reject) => {
       let data = JSON.parse( window.localStorage.getItem('ts-journeys') );
       
       if( isEmpty( data ) ) {
          data = [];
       }
       
       const newData = data.concat(tracker);

       // Update
       window.localStorage.setItem('ts-journeys', JSON.stringify(newData) );       

       // Return success and new journeys
       return {
            status: 200,
            newData,
       }

    })
};


