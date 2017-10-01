// import axios from 'axios';
import { isEmpty } from 'lodash';

/**
 * FETCH ALL TRACKERS
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
 * FETCH SINGLE TRACKER
 */
export const fetchTracker = (trackerId) => {
    return new Promise( (resolve, reject) => {
        const data = JSON.parse( window.localStorage.getItem('ts-journeys') );

        const tracker = data.find( tracker => tracker.uid === trackerId);
          
        resolve({
            status: 200,
            data: tracker
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


