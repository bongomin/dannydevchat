import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';


const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Signup} />
    </Switch>
  </Router>

)

ReactDOM.render(<Root />, document.getElementById('root')
);

serviceWorker.unregister();
