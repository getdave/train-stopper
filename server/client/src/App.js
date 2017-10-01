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

let trackerCheckingStarted    = false;
let notificationsAllowed        = false;

class App extends Component {  


    fetchAppData() {
        this.props.fetchTrackers();
    } 

    componentDidMount() {
        this.fetchAppData();
       
        if(this.props.trackers.length && !trackerCheckingStarted) {
            this.startCheckingTrackers();
        }        

        if ("Notification" in window) {
            Notification.requestPermission(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                notificationsAllowed = true;
              }
            });
        }
    }

    componentWillReceiveProps(nextProps) {       
        if(nextProps.trackers.length && !trackerCheckingStarted) {
            this.startCheckingTrackers();
        }
    }

    startCheckingTrackers() {
        trackerCheckingStarted = true;

        setInterval(() => {
            const activeTrackers = this.props.trackers.filter(tracker => tracker.status === 'active');

            activeTrackers.forEach(tracker => {
                // console.log(tracker)
                const arrivalTS     = Date.parse(`${tracker.date} ${tracker.time}`);
                const diff = differenceInMilliseconds(arrivalTS, new Date());

                if (diff <= 0) {
                    new Notification("Tracker done!", {
                        body: tracker.uid,
                        vibrate: [200, 100, 200]
                    });

                    this.props.archiveTracker(tracker.uid);

                }
            });

        },1000);
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



function mapStateToProps(state) {
    return {
        trackers: trackersSelectors.selectTrackers(state)
    }
}


export default connect(mapStateToProps, trackerActions)(App);
