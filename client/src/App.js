import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import jtwDecode from 'jwt-decode';
import setAuthToken from './shared/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { clearCurrentProfile } from './store/actions/profileActions';

import store from './store';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/CreateProfile/CreateProfile';

import PrivateRoute from './components/Common/PrivateRoute';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken); // Swt auth token header auth
  // Decode token and get user info expiration
  const decoded = jtwDecode(localStorage.jwtToken);
  // Set user and set isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className='App'>
            <Navbar />
            <Route
              exact
              path='/'
              component={ Landing } />
            <div className='container'>
              <Route
                exact
                path='/register'
                component={ Register } />
              <Route
                exact
                path='/login'
                component={ Login } />
              <Switch>
                <PrivateRoute
                  exact
                  path='/dashboard'
                  component={ Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/Create-profile'
                  component={ CreateProfile } />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
