import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import StationsPage from './scenes/stations/StationsPage';
import JourneyPage from './scenes/journey/JourneyPage';
import ServicePage from './scenes/service/ServicePage';
import TrackersPage from './scenes/trackers/TrackersPage';
import TrackerPage from './scenes/trackers/TrackerPage';
import FourOhFour from './scenes/FourOhFour';

import * as actions from './trackers/actions';


class App extends Component {  

    fetchAppData() {
        this.props.fetchTrackers();
    } 

    componentDidMount() {
        this.fetchAppData();
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



export default connect(null, actions)(App);
