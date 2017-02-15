import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Frontend from '../FrontendApp';
import Editor from './Editor';
import './editor.css';

injectTapEventPlugin();

const EditorApp = () => (
  <MuiThemeProvider>
    <div className="editorApp">
      <div className="editorApp-editor">
        <Editor />
      </div>
      <div className="editorApp-frontend">
        <Frontend />
      </div>
    </div>
  </MuiThemeProvider>
);

export default EditorApp;
