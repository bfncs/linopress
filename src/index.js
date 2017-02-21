import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/rootReducer';
import HtmlWrapper from './components/HtmlWrapper';
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
    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;

    renderApp(createApp(Frontend, preloadedState));
  }
}

export default (locals, callback) => {
  window.location = {
    pathname: locals.path,
  };

  const preloadedState = {
    page: locals.content[locals.path],
  };

  const head = Helmet.rewind();
  const content = ReactDOMServer.renderToString(createApp(Frontend, preloadedState));
  const assets = Object.keys(locals.webpackStats.compilation.assets);
  const stylesheets = assets.filter(value => value.match(/\.css$/));
  const scripts = assets.filter(value => value.match(/\.js$/));

  const page = ReactDOMServer.renderToStaticMarkup(
    <HtmlWrapper
      head={head}
      stylesheets={stylesheets}
      scripts={scripts}
      state={preloadedState}
    >
      {content}
    </HtmlWrapper>
  );

  callback(null, page);
};