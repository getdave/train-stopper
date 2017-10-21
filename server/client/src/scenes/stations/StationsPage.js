import React, { Component } from 'react';
import StationForm from './StationForm';
import { Container } from 'semantic-ui-react'

class Stations extends Component {


	render() {
	    return (
	    	<Container>
		    	<h1>Choose your Stations</h1>
		    	<p>Tell us about where you are travelling to and from.</p>
		    	<StationForm />
		    </Container>
	    )
	}
};


export default Stations;