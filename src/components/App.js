import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Login from './Login/login';
import Signup from './signup/signup';
import Home from '../containers/homeContainer';
import VideoDetail from '../containers/videoContainer';
// error handler
import ErrorCatch from '../errorCatch';

const App = () => {
    <ErrorCatch>
        <Router>
            <div>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path={'/:videoId'} component={VideoDetail} />
                </Switch>
            </div>
        </Router>
    </ErrorCatch>
}

export default App;