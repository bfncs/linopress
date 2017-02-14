import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Frontend from '../FrontendApp';
import Editor from './Editor';
import './editor.css';

injectTapEventPlugin();

const EditorApp = ({ page: { children = [] } = {} }) => (
  <MuiThemeProvider>
    <div className="editorApp">
      <div className="editorApp-editor">
        <Editor blocks={children} />
      </div>
      <div className="editorApp-frontend">
        <Frontend />
      </div>
    </div>
  </MuiThemeProvider>
);

EditorApp.propTypes = {
  page: PropTypes.object,
};

export default connect(
  (state) => ({ page: state })
)(EditorApp);
