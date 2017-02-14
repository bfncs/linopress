import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { update } from './redux/page';
import Page from './components/Page';
import content from '../content/index.json';

class FrontendApp extends Component {
  componentWillMount() {
    this.props.update(content);
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
  update: PropTypes.func,
};

export default connect(
  (state) => ({
    page: state,
  }),
  { update }
)(FrontendApp);
