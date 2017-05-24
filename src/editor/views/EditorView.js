import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFetching, setPage } from '../../redux/pages';
import { setSchema } from '../../redux/schema';
import Editor from '../components/Editor';

function saveContentPage(path, page) {
  const options = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(page),
  };
  return fetch(`/api/content${path}`, options);
}

class EditorView extends Component {
  static propTypes = {
    contentPath: PropTypes.string.isRequired,
    pageContent: PropTypes.object,
    pageContentFetching: PropTypes.bool,
    schema: PropTypes.object,
    setFetching: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    setSchema: PropTypes.func.isRequired,
  };

  fetchPageContent(contentPath) {
    this.props.setFetching();
    const path = contentPath.replace(/\/+$/, '');
    fetch(`/api/content${path}/index.json`)
      .then(res => res.json())
      .then(page => this.props.setPage(contentPath, page))
      .catch(err => {
        console.error(
          `Unable to get content for ${contentPath} from API".`,
          err
        );
      });
  }

  componentWillMount() {
    fetch('/api/schema/')
      .then(res => res.json())
      .then(this.props.setSchema)
      .catch(err => console.error(`Unable to get schema from API".`, err));

    this.fetchPageContent(this.props.contentPath);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.contentPath !== nextProps.contentPath) {
      this.fetchPageContent(nextProps.contentPath);
    }
  }

  render() {
    return (
      <Editor
        savePage={content => saveContentPage(this.props.contentPath, content)}
        schema={this.props.schema}
        content={this.props.pageContent}
      />
    );
  }
}

export default connect(
  (state, ownProps) => ({
    pageContent: state.pages.items[ownProps.contentPath],
    pageContentFetching: state.pages.fetching,
    schema: state.schema,
  }),
  { setFetching, setPage, setSchema }
)(EditorView);
