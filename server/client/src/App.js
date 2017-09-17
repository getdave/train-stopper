import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Pages
import DashboardPage from './scenes/dashboard/DashboardPage';
import JourneyPage from './scenes/journey/JourneyPage';




class App extends Component {   

    render() {
        
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={DashboardPage} />
                        <Route exact path="/journey/:originStation/:destinationStation" component={JourneyPage} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }

}
export default App;
