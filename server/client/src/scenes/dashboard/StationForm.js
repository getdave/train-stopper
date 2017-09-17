import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import AutoSuggest from '../../components/AutoSuggest';
import * as actions from './actions';
import * as selectors from './reducers';

console.log(selectors);

class StationForm extends Component {


	constructor(props) {
		super(props);

		this.handleFormSubmit 	= this.handleFormSubmit.bind(this);
		this.handleInputChanged = this.handleInputChanged.bind(this);

	}

	
	
	handleFormSubmit() {
		console.log("Form submitted");
	}

	handleInputChanged(val) {
		this.props.fetchStations(val);
	}


	render() {
		// Redux Form injected props
		const { handleSubmit, pristine, reset, submitting } = this.props;		
		
	   
	    return (
	    	<div>    		
	    		<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<div>
						<label>Origin Station</label>
						<Field
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
						<label>Destination Station</label>
						<Field
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

StationForm = reduxForm({
  form: 'stationForm'  // a unique identifier for this form
})(StationForm)

StationForm = connect(mapStateToProps, actions)(StationForm);


export default StationForm;