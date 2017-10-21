import React from 'react';
import withConditionalRender from '../../../hoc/withConditionalRender';
import { Link } from 'react-router-dom';

const ServiceList = props => {
	
	const stationServices = props.stationServices.map( service => {
		return (
			<Link key={service.train_uid} to={`/journey/service/${service.train_uid}`} className="list-group-item list-group-item-action flex-column align-items-start">
				<div className="d-flex w-100 justify-content-between">
					<h5 className="mb-1">{service.origin_name} - {service.destination_name}</h5>
				</div>
				<p className="mb-1">this train departs from <strong>{props.originStation}</strong> at {service.aimed_departure_time}</p>
			</Link>
		)
	});

	return (
		<div>
			<p>Pick a journey...</p>
			<ul>
				{stationServices}
			</ul>
		</div>
	)
};


export default withConditionalRender({
	requiredProp: 'stationServices',
	missingDataMsg: `Uh oh, we couldn't find any train services for the options you provided. Try another search.`
})(ServiceList);