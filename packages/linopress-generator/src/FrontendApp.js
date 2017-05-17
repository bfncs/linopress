import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { init } from './redux/page';
import Page from 'components/Page';

const POLLING_INTERVAL_MS = 1000;

class FrontendApp extends Component {
  state = {
    pollingIntervalId: null,
  };

  componentWillMount() {
    if (typeof fetch === 'undefined' || !fetch) {
      return;
    }

    this.fetchContent().then(() => {
      if (this.props.isDevelopment) {
        this.setState({
          pollingIntervalId: setInterval(
            this.fetchContent,
            POLLING_INTERVAL_MS
          ),
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.state.pollingIntervalId) {
      clearInterval(this.state.pollingIntervalId);
    }
  }

  fetchContent = () => {
    const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
    const options = { mode: 'no-cors' };

    return fetch(`/api/content/${path}/index.json`, options)
      .then(res => res.json())
      .then(json => this.props.initPage(json))
      .catch(err =>
        console.error(`Unable to parse content for "${path}".`, err)
      );
  };

  render() {
    const { title, description, children: blocks = [] } = this.props.page;
    return <Page title={title} description={description} blocks={blocks} />;
  }
}

FrontendApp.propTypes = {
  page: PropTypes.object,
  init: PropTypes.func,
  isDevelopment: PropTypes.bool,
};

FrontendApp.defaultProps = {
  isDevelopment: false,
};

export default connect(
  state => ({
    page: state.page,
  }),
  { initPage: init }
)(FrontendApp);
