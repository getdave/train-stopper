import React, { Component } from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { bindAll } from 'lodash';

class TrackerForm extends Component {


	constructor(props) {
		super(props);

		bindAll(this, [
			'handleFormSubmit',
			'handleInputChanged'
		]);
	}

	

	
	handleFormSubmit(formData) {
		const {  } = formData;
		
		
	}

	handleInputChanged(val) {
		
	}


	render() {
		// Redux Form injected props
		const { valid, handleSubmit, pristine, reset, submitting } = this.props;		
		
	    return (
	    	<div>    		
	    		<form onSubmit={handleSubmit(this.handleFormSubmit)}>			
					<div className="form-group">	
						<button className="btn btn-primary mr-2" type="submit" disabled={pristine || !valid || submitting}>Submit</button>
						
					</div>
			    </form>
	    	</div>
	    )
	}
};




const enchance = compose(
    reduxForm({
	  form: 'trackerForm',  // a unique identifier for this form,
	})	
);


export default enchance(TrackerForm);