import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import stationsReducer from './scenes/dashboard/reducers';
import journeysReducer from './scenes/journey/reducers';


export default combineReducers({
	form: reduxForm,
	stations: stationsReducer,
	journeys: journeysReducer
});