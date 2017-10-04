import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from 'react-web-notification';
import { bindAll } from 'lodash';
import { selectNotifications } from '../notifications/reducer';


class NotificationsContainer extends Component {


	constructor(props){
		super(props);

		bindAll(this, [
			'handleNotSupported',
			'handlePermissionGranted',
			'handlePermissionDenied',
			'handleNotificationOnShow',
			'handleNotificationOnClick',
			'handleNotificationOnClose',
			'handleNotificationOnError',
		]);

	}


	handleNotSupported() {

	}

	handlePermissionGranted() {

	}

	handlePermissionDenied() {

	}

	handleNotificationOnShow() {
		this.startAlarm()
	}

	handleNotificationOnClick() {
		this.stopAlarm()
	}

	handleNotificationOnClose() {
		this.stopAlarm()
	}

	handleNotificationOnError() {

	}

	startAlarm() {
		document.getElementById('sound').play();
	}

	stopAlarm() {
		document.getElementById('sound').pause();
	}

	render() {
		
		const items = this.props.notifications.map(notification => {

			const options = {
		      	body: notification.body,
		      	//icon: notification.icon TODO - add icon
			};

			return (
				<Notification
					key={notification.uid} 
					notSupported={this.handleNotSupported}
					onPermissionGranted={this.handlePermissionGranted}
					onPermissionDenied={this.handlePermissionDenied}
					onShow={this.handleNotificationOnShow}
					onClick={this.handleNotificationOnClick}
					onClose={this.handleNotificationOnClose}
					onError={this.handleNotificationOnError}
					timeout={10000}
					title={notification.title}
					options={options}
				/>
			)
		});

		return (
			<div>
			{ items }
			<audio id='sound' preload='auto'>
				<source src='/audio/bell.mp3' type='audio/mpeg' />
			</audio>
			</div>
		)
		
	}

}



function mapStateToProps(state) {
	return {
		notifications: selectNotifications(state)
	}
}

export default connect(mapStateToProps)(NotificationsContainer);