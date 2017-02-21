import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Frontend from '../FrontendApp';
import Editor from './Editor';

injectTapEventPlugin();

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
  },
  panel: {
    width: '50%',
    minHeight: '100%',
    maxHeight: '100%',
    overflowX: 'auto',
    overflowY: 'auto',
  },
  editor: {
    float: 'left',
    boxShadow: '0 0 10px 0 lightslategray',
    padding: '1em',
  },
  frontend: {
    marginLeft: '50%',
  },
});

const EditorApp = () => (
  <MuiThemeProvider>
    <div className={css(styles.container)}>
      <div className={css(styles.panel, styles.editor)}>
        <Editor />
      </div>
      <div className={css(styles.panel, styles.frontend)}>
        <Frontend />
      </div>
    </div>
  </MuiThemeProvider>
);

export default EditorApp;
