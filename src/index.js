import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/rootReducer';

import Frontend from './FrontendApp';
import './index.css';

const store = createStore(rootReducer);

const renderApp = (Component) => (
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )
);

if (process.env.NODE_ENV === "development") {
  require.ensure([], (require) => {
    const Editor = require('./editor/EditorApp').default;
    renderApp(Editor);
  });
} else {
  renderApp(Frontend);
}