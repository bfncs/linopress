import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'json-editor'; /* global JSONEditor */
import { setFetching, setPage } from '../redux/pages';
import { setSchema } from '../redux/schema';

JSONEditor.defaults.theme = 'foundation5';
JSONEditor.defaults.iconlib = 'fontawesome4';

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

  editorInstance = null;
  editorContainer = null;

  fetchPageContent(contentPath) {
    this.props.setFetching();
    fetch(`/api/content${contentPath}index.json`)
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

    const schemaChanged = this.props.schema !== nextProps.schema;
    const contentChanged = this.props.pageContent !== nextProps.pageContent;
    if (
      nextProps.schema &&
      nextProps.pageContent &&
      (schemaChanged || contentChanged)
    ) {
      if (this.editorInstance) {
        this.editorInstance.destroy();
      }
      this.editorInstance = new JSONEditor(this.editorContainer, {
        schema: nextProps.schema,
        startval: nextProps.pageContent,
        disable_collapse: true,
        disable_edit_json: true,
        disable_properties: true,
        no_additional_properties: true,
      });
      this.editorInstance.on('change', () => {
        saveContentPage(this.props.contentPath, this.editorInstance.getValue());
      });
    }
  }

  render() {
    return (
      <div>
        <div
          ref={input => {
            this.editorContainer = input;
          }}
        />
        <div>
          <button className={'button'} type={'button'}>save</button>
          <a href="/" className={'button secondary'}>back</a>
        </div>
      </div>
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
