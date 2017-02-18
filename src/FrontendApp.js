import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { init } from './redux/page';
import Page from './components/Page';

class FrontendApp extends Component {
  componentWillMount() {
    const path = window.location.pathname;
    const options = { mode: 'no-cors' };
    fetch(`/api${path}`, options)
      .then(res => res.json())
      .then(json => this.props.initPage(json))
      .catch(err => console.error(`Unable to parse content for "${path}".`, err))
  }

  render() {
    const { children:blocks = [] } = this.props.page;
    return (
      <Page blocks={blocks} />
    )
  }
}

FrontendApp.propTypes = {
  page: PropTypes.object,
  init: PropTypes.func,
};

export default connect(
  (state) => ({
    page: state.page,
  }),
  { initPage: init }
)(FrontendApp);
