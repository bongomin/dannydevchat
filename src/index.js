import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import firebase from './firebase';
import 'semantic-ui-css/semantic.min.css';


class Root extends Component {
  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.props.history.push('/');
        }
      })
  }
  render() {
    return (

      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
      </Switch>


    );
  }
}

// handling history
const RootWithAuth = withRouter(Root);

ReactDOM.render(<Router>
  <RootWithAuth />,
</Router>, document.getElementById('root')
);

// serviceWorker();


