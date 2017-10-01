// import axios from 'axios';
import { isEmpty, isNull } from 'lodash';


function fetchTrackersFromStorage() {
    let data = JSON.parse( window.localStorage.getItem('ts-journeys') );

    return ( !isEmpty( data ) ) ? data : [];
}

function persistTrackersToStorage(trackersData) {
    window.localStorage.setItem('ts-journeys', JSON.stringify(trackersData) );   
}


/**
 * FETCH ALL TRACKERS
 */
export const fetchTrackers = () => {
    return new Promise( (resolve, reject) => {
        const data = fetchTrackersFromStorage()
        
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
        const data = fetchTrackersFromStorage();

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
       let data = fetchTrackersFromStorage();
       
       const newData = data.concat(tracker);

       // Update
       persistTrackersToStorage(newData);       

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
        let data = fetchTrackersFromStorage();

        const targetIndex = data.findIndex(tracker => tracker.uid === id);


        if (isNull(targetIndex)) { // because of zero indexing we have to use isNull
            return {
                status: 400,
                message: `No trackers with matching id ${id}`,
            }
        }

        data[targetIndex] = newTracker;

        persistTrackersToStorage(data);    

        // Return success and new journeys
        resolve({
            status: 200,
            data: newTracker,
        })

    })
};





