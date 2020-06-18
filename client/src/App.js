import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import jtwDecode from 'jwt-decode';
import setAuthToken from './shared/utils/setAuthToken';

import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { clearCurrentProfile } from './store/actions/profileActions';

import store from './store';

import PrivateRoute from './components/Common/PrivateRoute';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';

import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/Profile/CreateProfile';
import EditProfile from './components/Profile/EditProfile';
import AddExperience from './components/Profile/AddCredentials/AddExperience';
import AddEducation from './components/Profile/AddCredentials/AddEducation';
import Profiles from './components/Profiles/Profiles';
import Profile from './components/Profile/Profile';

import NotFound from './components/NotFound/NotFound';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken); // Swt auth token header auth
  const decoded = jtwDecode(localStorage.jwtToken); // Decode token and get user info expiration
  store.dispatch(setCurrentUser(decoded)); // Set user and set isAuthenticated
  const currentTime = Date.now() / 1000; // Check for expired token

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser()); // Logout user
    store.dispatch(clearCurrentProfile()); // Clear current profile
    window.location.href = '/login'; // Redirect to login
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
              <Route
                exact
                path='/profiles'
                component={ Profiles } />
              <Route
                exact
                path='/profile/:handle'
                component={ Profile } />
              <Switch>
                <PrivateRoute
                  exact
                  path='/dashboard'
                  component={ Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={ CreateProfile } />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={ EditProfile } />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-experience'
                  component={ AddExperience } />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={ AddEducation } />
              </Switch>
              <Route
                exact
                path='/not-found'
                component={ NotFound } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
