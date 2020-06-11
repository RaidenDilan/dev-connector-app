import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import jtwDecode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './store/actions/authActions';

import store from './store';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken); // Swt auth token header auth
  // Decode token and get user info expiration
  const decoded = jtwDecode(localStorage.jwtToken);
  // Set user and set isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

function App() {
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
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
