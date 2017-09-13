import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Pages
import Dashboard from './pages/Dashboard';



class App extends Component {   

    render() {
        
        return (
            <div className="container">
                <BrowserRouter>
                  <div>
                    <Route exact path="/" component={Dashboard} />
                  </div>
                </BrowserRouter>
            </div>
        );
    }

}
export default App;
