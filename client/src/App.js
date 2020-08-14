import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import jtwDecode from 'jwt-decode';
import setAuthToken from './shared/utils/setAuthToken';

import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { clearCurrentProfile } from './store/actions/profileActions';

import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/createProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/addCredentials/AddExperience';
import AddEducation from './components/profile/addCredentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import Posts from './components/posts/Posts';
import Post from './components/posts/post/Post';

import NotFound from './components/notFound/NotFound';

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
              <Switch>
                <PrivateRoute
                  exact
                  path='/feed'
                  component={ Posts } />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/post/:id'
                  component={ Post } />
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
