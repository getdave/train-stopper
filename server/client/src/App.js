import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';

// Pages
import StationsPage from './scenes/stations/StationsPage';
import JourneyPage from './scenes/journey/JourneyPage';
import ServicePage from './scenes/service/ServicePage';
import TrackersPage from './scenes/trackers/TrackersPage';
import TrackerPage from './scenes/trackers/TrackerPage';
import FourOhFour from './scenes/FourOhFour';

import * as trackerActions from './trackers/actions';
import * as trackersSelectors from './trackers/reducer';



let notificationsAllowed        = false;

class App extends Component {  

    componentDidMount() {

        // Fetch all Trackers upfront
        this.props.fetchTrackers();
       
        // Start polling Trackers
        this.props.poller.start();

        // Ask for perms to Notify the user
        if ("Notification" in window) {
            Notification.requestPermission(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                notificationsAllowed = true;
              }
            });
        }
    }




    render() {
        
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Switch>
                        <Route exact path="/" component={StationsPage} />
                        <Route exact path="/journey/:originStation/:destinationStation/:date/:time" component={JourneyPage} />
                        <Route exact path="/journey/service/:trainUId" component={ServicePage} />
                        <Route exact path="/trackers/" component={TrackersPage} />
                        <Route exact path="/trackers/:trackerId" component={TrackerPage} />
                        <Route component={FourOhFour} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }

}






export default connect(null, trackerActions)(App);
