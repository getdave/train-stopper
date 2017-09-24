import React, { Component } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import bindAll from 'lodash/bindAll';
import isObject from 'lodash/isObject';
import { isValid } from 'date-fns';

import AutoSuggest from '../../components/AutoSuggest';
import * as stationsActions from '../../stations/actions';
import * as stationsSelectors from '../../stations/reducer';
import { uriEncodeAll } from '../../helpers';

class StationForm extends Component {


	constructor(props) {
		super(props);

		bindAll(this, [
			'handleFormSubmit',
			'handleInputChanged'
		]);
	}

	

	
	handleFormSubmit(formData) {
		const { originStation, destinationStation, date, time } = formData;
		
		// Destructuring reassigns `let` declared vars above
		const encoded = uriEncodeAll([
			originStation.value,
			destinationStation.value,
			date,
			time
		]);

		this.props.history.push(`/journey/${encoded[0]}/${encoded[1]}/${encoded[2]}/${encoded[3]}`)		
	}

	handleInputChanged(val) {
		this.props.fetchStations(val);
	}


	render() {
		// Redux Form injected props
		const { valid, handleSubmit, pristine, reset, submitting } = this.props;		
		
	    return (
	    	<div>    		
	    		<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<div className="form-group">				
						<Field
							labelName="Origin Station"
							placeholder="eg: Bristol..."
							name="originStation"
							component={AutoSuggest}
							data={this.props.stations}
							valueField="value"
							textField="label"
							handleInputChanged={this.handleInputChanged}
							busy={this.props.isFetching}
				         />
					</div>

					<div className="form-group">	
						<Field
							labelName="Destination Station"
							placeholder="eg: Bath Spa..."
							name="destinationStation"
							component={AutoSuggest}
							data={this.props.stations}
							valueField="value"
							textField="label"
							handleInputChanged={this.handleInputChanged}
							busy={this.props.isFetching}
				         />
					</div>

					<div className="form-group">	
						<Field name="date" component="input" type="text" placeholder="YYYY-MM-DD"/>
					</div>

					<div className="form-group">	
						<Field name="time" component="input" type="text" placeholder="HH:MM" />
					</div>

					
			      
					<div className="form-group">	
						<button className="btn btn-primary mr-2" type="submit" disabled={pristine || !valid || submitting}>Submit</button>
						<button className="btn btn-default" type="button" disabled={pristine || submitting} onClick={reset}>Reset Values
						</button>
					</div>
			    </form>
	    	</div>
	    )
	}
};

function mapStateToProps(state) {
    return {
        stations: stationsSelectors.selectStations(state),
        isError: stationsSelectors.selectIsError(state),
        isFetching: stationsSelectors.selectIsFetching(state),
    }
}

function validate(formProps) {
    const errors = {};
    const { originStation, destinationStation, date, time } = formProps;

    if (!originStation) {
        errors.originStation = 'Please choose a origin station';
    }

    if (!isObject(originStation)) {
    	errors.originStation = 'Station invalid. Please choose a valid station from the list';
    }

    if (!destinationStation) {
        errors.destinationStation = 'Please choose a destination station';
    } else {
	    if (destinationStation === originStation) {
	    	errors.destinationStation = 'Destination cannot be the same as origin. Please check your selections';
	    }
    }

    if (!isObject(destinationStation)) {
    	errors.destinationStation = 'Station invalid. Please choose a valid station from the list';
    }


    if (!date || !isValid( new Date(date) ) ) {
        errors.date = 'Please enter a valid date in the format YYYY-MM-DD';
    }

    // Test for HH:MM time format
    const timeRE = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    
    if (!time || !timeRE.test( time ) ) {
        errors.time = 'Please enter a valid time in the format HH:MM';
    }

    return errors;
}

const enchance = compose(
    withRouter,
    reduxForm({
	  form: 'stationForm',  // a unique identifier for this form,
	  validate
	}),
	connect(mapStateToProps, stationsActions)
);


export default enchance(StationForm);