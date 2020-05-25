import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import firebase from './firebase';
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { setUser, clearUser } from './actions'
import 'semantic-ui-css/semantic.min.css';
import rootReducer from './reducers';
import Spinner from './Spinner'

const store = createStore(rootReducer, composeWithDevTools());


class Root extends Component {
  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        // console.log(user)

        if (user) {
          this.props.setUser(user)
          this.props.history.push('/');
        } else {
          this.props.history.push('/login');
          this.props.clearUser();
        }
      })
  }
  render() {
    return this.props.isLoading ? <Spinner /> : (

      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
})

// handling history
const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser, clearUser }
  )(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />,
</Router>
  </Provider>,
  document.getElementById('root')
);

// serviceWorker();


