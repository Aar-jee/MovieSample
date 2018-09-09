import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import Home from './components/home/home';
import Movies from './components/movies/movies';
import Cast from './components/cast/cast';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/cast" exact component={Cast} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();