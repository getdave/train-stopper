import { 
    FETCHING_EXAMPLES,
    FETCHING_EXAMPLES_SUCCESS,
    FETCHING_EXAMPLES_FAILED
} from './types';


export function fetchExamples(query) {
    return (dispatch, getState) => {
        dispatch({ 
            type: FETCHING_EXAMPLES,
        });
        
        return api.fetchExample(query)
            .then(function (response) {
                const { data } = response;
                dispatch({ 
                    type: FETCHING_EXAMPLES_SUCCESS,
                    payload: data
                });
            })
            .catch(function (error) {
                dispatch({ 
                    type: FETCHING_EXAMPLES_FAILED,
                });
            }); 
    }
}