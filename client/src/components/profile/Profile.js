import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProfileHeader from './showProfile/ProfileHeader';
import ProfileAbout from './showProfile/ProfileAbout';
import ProfileCredentials from './showProfile/ProfileCredentials';
import ProfileGithub from './showProfile/ProfileGithub';

import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../store/actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) this.props.getProfileByHandle(this.props.match.params.handle);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) this.props.history.push('/not-found');
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) profileContent = <Spinner />;
    else {
      profileContent = (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <Link
                to='/profiles'
                className='btn btn-light mb-3 float-left'>
                Back To Profiles
              </Link>
            </div>
            <div className='col-md-6' />
          </div>
          <div>
            <ProfileHeader profile={ profile } />
            <ProfileAbout profile={ profile } />
            <ProfileCredentials
              education={ profile.education }
              experience={ profile.experience } />
          </div>
          { profile.githubUsername ? (<ProfileGithub username={ profile.githubUsername } />) : null }
        </div>
      );
    }

    return (
      <div className='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>{ profileContent }</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);