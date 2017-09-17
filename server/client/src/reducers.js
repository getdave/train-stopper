import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import stationsReducer from './scenes/dashboard/reducers';

export default combineReducers({
	form: reduxForm,
	stations: stationsReducer,
});