import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Pages
import StationsPage from './scenes/stations/StationsPage';
import JourneyPage from './scenes/journey/JourneyPage';
import ServicePage from './scenes/service/ServicePage';
import TrackerPage from './scenes/tracker/TrackerPage';




class App extends Component {   

    render() {
        
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={StationsPage} />
                        <Route exact path="/journey/:originStation/:destinationStation/:date/:time" component={JourneyPage} />
                        <Route exact path="/journey/service/:trainUId" component={ServicePage} />
                        <Route exact path="/trackers/" component={TrackerPage} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }

}
export default App;
