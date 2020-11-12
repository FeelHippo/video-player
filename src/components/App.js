import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Login from './Login/login';
import Main from './Main/main';
import Player from './Player/player';
// error handler
import ErrorCatch from '../errorCatch';

const App = () => {
    <ErrorCatch>
        <Router>
            <div>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/main' component={Main} />
                    <Route exact path={'/player/:videoId'} component={Player} />
                </Switch>
            </div>
        </Router>
    </ErrorCatch>
}