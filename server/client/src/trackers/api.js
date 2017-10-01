// import axios from 'axios';
import { isEmpty, isNull } from 'lodash';

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
 * CREATE TRACKER
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
       resolve({
            status: 200,
            data: newData,
       })

    })
};


/**
 * UPDATE TRACKER
 */
export const updateTracker = (id, newTracker) => {
    return new Promise( (resolve, reject) => {
      
        // TODO - extract getting of LS data into helper
        let data = JSON.parse( window.localStorage.getItem('ts-journeys') );

        if( isEmpty( data ) ) {
            data = [];
        }

        const targetIndex = data.findIndex(tracker => tracker.uid === id);


        if (isNull(targetIndex)) { // because of zero indexing we have to use isNull
            return {
                status: 400,
                message: `No trackers with matching id ${id}`,
            }
        }

        data[targetIndex] = newTracker;

        window.localStorage.setItem('ts-journeys', JSON.stringify(data) );    

        // Return success and new journeys
        resolve({
            status: 200,
            data: newTracker,
        })

    })
};





