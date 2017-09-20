import React, { Component } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AutoSuggest from '../../components/AutoSuggest';
import * as stationsActions from '../../stations/actions';
import * as stationsSelectors from '../../stations/reducers';


class StationForm extends Component {


	constructor(props) {
		super(props);
		this.handleFormSubmit 	= this.handleFormSubmit.bind(this);
		this.handleInputChanged = this.handleInputChanged.bind(this);
	}

	
	handleFormSubmit(formData) {
		const { originStation, destinationStation } = formData;
		
		this.props.history.push(`/journey/${encodeURIComponent(originStation.value)}/${encodeURIComponent(destinationStation.value)}`)
		
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
							onChange={this.handleInputChanged}
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
							onChange={this.handleInputChanged}
							busy={this.props.isFetching}
				         />
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

const enchance = compose(
    withRouter,
    reduxForm({
	  form: 'stationForm',  // a unique identifier for this form,
	  validate
	}),
	connect(mapStateToProps, stationsActions)
);


export default enchance(StationForm);