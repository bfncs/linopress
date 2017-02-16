import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './editorApp.css';
import Frontend from '../FrontendApp';
import Editor from './Editor';

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
