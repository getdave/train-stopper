import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import stationsReducer from './stations/reducer';
import journeyReducer from './journey/reducer';


export default combineReducers({
	form: reduxForm,
	stations: stationsReducer,
	journey: journeyReducer
});