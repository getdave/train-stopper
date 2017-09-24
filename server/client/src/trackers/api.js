import axios from 'axios';

/**
 * FETCH TRACKERS
 */
export const fetchTrackers = () => {
    return new Promise( (resolve, reject) => {
        const data = JSON.parse( window.localStorage.getItem('ts-journeys') );
        
        resolve(return {
            status: 200,
            data
       });
    })
};


/**
 * SET TRACKER
 */
export const setTracker = (tracker) => {
    return new Promise( (resolve, reject) => {
       const data = JSON.parse( window.localStorage.getItem('ts-journeys') );
       
       data.push(tracker);

       // Update
       window.localStorage.setItem('ts-journeys', JSON.stringify(data) );       

       // Return success and new journeys
       return {
            status: 200,
            data
       }

    })
};


