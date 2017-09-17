import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import AutoSuggest from '../../components/AutoSuggest';
import * as actions from './actions';
import * as selectors from './reducers';


class StationForm extends Component {


	constructor(props) {
		super(props);
		this.handleFormSubmit 	= this.handleFormSubmit.bind(this);
		this.handleInputChanged = this.handleInputChanged.bind(this);
	}

	
	handleFormSubmit(formData) {
		this.props.setStations(formData);
	}

	handleInputChanged(val) {
		this.props.fetchStations(val);
	}


	render() {
		// Redux Form injected props
		const { handleSubmit, pristine, reset, submitting } = this.props;		
		
	   	console.log(this.props);
	    return (
	    	<div>    		
	    		<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<div>
						
						<Field
							labelName="Origin Station"
							name="originStation"
							component={AutoSuggest}
							data={this.props.stations}
							valueField="value"
							textField="label"
							onChange={this.handleInputChanged}
							busy={this.props.isFetching}
				         />
					</div>

					<div>
						<Field
							labelName="Destination Station"
							name="destinationStation"
							component={AutoSuggest}
							data={this.props.stations}
							valueField="value"
							textField="label"
							onChange={this.handleInputChanged}
							busy={this.props.isFetching}
				         />
					</div>

					
			      
					<div>
						<button type="submit" disabled={pristine || submitting}>Submit</button>
						<button type="button" disabled={pristine || submitting} onClick={reset}>Reset Values
						</button>
					</div>
			    </form>
	    	</div>
	    )
	}
};

function mapStateToProps(state) {
    return {
        stations: selectors.selectStations(state),
        isError: selectors.selectIsError(state),
        isFetching: selectors.selectIsFetching(state),
    }
}

function validate(formProps) {
    const errors = {};
    const { originStation, destinationStation } = formProps;

    if (!originStation) {
        errors.originStation = 'Please choose a origin station';
    }

    if (!destinationStation) {
        errors.destinationStation = 'Please choose a destination station';
    } else {
	    if (destinationStation === originStation) {
	    	errors.destinationStation = 'Destination cannot be the same as origin. Please check your selections';
	    }
    }

    return errors;
}

StationForm = reduxForm({
  form: 'stationForm',  // a unique identifier for this form,
  validate
})(StationForm)

StationForm = connect(mapStateToProps, actions)(StationForm);


export default StationForm;