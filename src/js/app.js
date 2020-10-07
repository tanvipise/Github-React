var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('./components/App');
var Search = require('./components/Search');
var User = require('./components/User');
var Followers = require('./components/Followers');
var Repos = require('./components/Repos');

var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Search} />
            <Route path="user/:username" component={User}>
                <Route path="followers" component={Followers} />
                <Route path="repos" component={Repos} />
            </Route>
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('app'));