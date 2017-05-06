import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'json-editor'; /* global JSONEditor */

JSONEditor.defaults.theme = 'foundation5';
JSONEditor.defaults.iconlib = 'fontawesome4';

class Editor extends Component {
  static propTypes = {
    savePage: PropTypes.func.isRequired,
    content: PropTypes.object,
    schema: PropTypes.object,
  };

  editorInstance = null;
  editorContainer = null;

  componentWillReceiveProps(nextProps) {
    const schemaChanged = this.props.schema !== nextProps.schema;
    const contentChanged = this.props.content !== nextProps.content;
    if (
      nextProps.schema &&
      nextProps.content &&
      (schemaChanged || contentChanged)
    ) {
      if (this.editorInstance) {
        this.editorInstance.destroy();
      }
      this.editorInstance = new JSONEditor(this.editorContainer, {
        schema: nextProps.schema,
        startval: nextProps.content,
        disable_collapse: true,
        disable_edit_json: true,
        disable_properties: true,
        no_additional_properties: true,
      });
      this.editorInstance.on('change', () => {
        this.props.savePage(this.editorInstance.getValue());
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

export default Editor;
