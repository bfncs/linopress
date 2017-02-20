import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/rootReducer';

import Frontend from './FrontendApp';
import './index.css';

const createApp = (Component, preloadedState) => {
  const store = createStore(rootReducer, preloadedState);
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

const renderApp = (app) => (
  ReactDOM.render(app, document.getElementById('root'))
);

if (typeof document !== 'undefined') {
  if (process.env.NODE_ENV === "development") {
    require.ensure([], (require) => {
      const Editor = require('./editor/EditorApp').default;
      renderApp(createApp(Editor));
    });
  } else {
    renderApp(createApp(Frontend));
  }
}

export default (locals, callback) => {
  window.location = {
    pathname: locals.path,
  };
  const preloadedState = {
    page: locals.content[locals.path],
  };
  callback(null, ReactDOMServer.renderToString(createApp(Frontend, preloadedState)));
};