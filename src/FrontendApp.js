import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { init } from './redux/page';
import Page from './components/Page';

class FrontendApp extends Component {
  componentWillMount() {
    const path = window.location.pathname;
    const options = { mode: 'no-cors' };
    
    if (typeof fetch === 'undefined' || !fetch) {
      return;
    }

    fetch(`/api/content${path}index.json`, options)
      .then(res => res.json())
      .then(json => this.props.initPage(json))
      .catch(err => console.error(`Unable to parse content for "${path}".`, err))
  }

  render() {
    const {
      title,
      description,
      children:blocks = [],
    } = this.props.page;
    return (
      <Page
        title={title}
        description={description}
        blocks={blocks}
      />
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
