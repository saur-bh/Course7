
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './screens/home/Home';
import Login from './screens/login/Login'
import Header from './common/header/Header';
import Profile from './screens/profile/Profile';

class App extends Component {
    render() {
        return (
            <Router>
                <div>

                    <Switch>
                        <Route path='/' exact={true} component={Login} />
                        <Route path='/Home' exact={true} component={Home} />
                        <Route path='/Profile' exact={true} component={Profile} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;