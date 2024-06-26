import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // clientId: process.env.DEVCON_GITHUB_CLIENT_ID,
      // clientSecret: process.env.DEVCON_GITHUB_CLIENT_SECRET,
      accessToken: process.env.REACT_APP_DEVCON_GITHUB_ACCESS_TOKEN,
      count: 5,
      sort: 'created: asc',
      repos: []
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, accessToken } = this.state;
    // const abortController = new AbortController();
    // const signal = abortController;

    fetch(`https://api.github.com/users/${ username }/repos?per_page=${ count }&sort=${ sort }`, {
      headers: {
        'Authorization': accessToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (this.myRef) this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    // if (this.abortController) this.abortController.abort();
    this.myRef = null;
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div
        key={ repo.id }
        className='card card-body mb-2'>
        <div className='row'>
          <div className='col-md-6'>
            <h4>
              { /* Using <Link /> will not work with external links, use <a /> instead */ }
              <a
                href={ repo.html_url }
                className='text-info'
                target='_blank'
                rel='noopener noreferrer'>
                { repo.name }
              </a>
            </h4>
            <p>{ repo.description }</p>
          </div>
          <div className='col-md-6'>
            <span className='badge badge-info mr-1'>
              Stars: { repo.stargazers_count }
            </span>
            <span className='badge badge-secondary mr-1'>
              Watchers: { repo.watchers_count }
            </span>
            <span className='badge badge-success'>
              Forks: { repo.forks_count }
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref={ this.myRef }>
        <hr />
        <h3 className='mb-4'>Latest Github Repos</h3>
        { repoItems }
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
