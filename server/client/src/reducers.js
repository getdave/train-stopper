import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import stationsReducer from './stations/reducers';
import journeyReducer from './journey/reducers';


export default combineReducers({
	form: reduxForm,
	stations: stationsReducer,
	journey: journeyReducer
});