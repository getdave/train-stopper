import React, { Component } from 'react';
import StationForm from './StationForm';


class DashboardPage extends Component {


	render() {
	    return (
	    	<div>
		    	<h1>Choose your Stations</h1>
		    	<p>Tell us about where you are travelling to and from.</p>
		    	<StationForm />
		    </div>
	    )
	}
};


export default DashboardPage;