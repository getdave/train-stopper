import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Pages
import DashboardPage from './scenes/dashboard/DashboardPage';



class App extends Component {   

    render() {
        
        return (
            <div className="container">
                <BrowserRouter>
                  <div>
                    <Route exact path="/" component={DashboardPage} />
                  </div>
                </BrowserRouter>
            </div>
        );
    }

}
export default App;
