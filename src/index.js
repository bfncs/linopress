import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { StyleSheet, StyleSheetServer } from 'aphrodite';
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
      <Component isDevelopment={process.env.NODE_ENV === "development"} />
    </Provider>
  );
};

const renderApp = (app) => (
  ReactDOM.render(app, document.getElementById('root'))
);

if (typeof document !== 'undefined') {
    StyleSheet.rehydrate(window.__PRELOADED_STYLES__);
    delete window.__PRELOADED_STYLES__;

    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;

    renderApp(createApp(Frontend, preloadedState));
}

export default (locals, callback) => {
  window.location = {
    pathname: locals.path,
  };

  const preloadedState = {
    page: locals.content[locals.path],
  };

  const { html: content, css: aphroditeCSS} = StyleSheetServer.renderStatic(() => {
    return ReactDOMServer.renderToString(createApp(Frontend, preloadedState))
  });
  const head = Helmet.rewind();

  const assets = Object.keys(locals.webpackStats.compilation.assets);
  const stylesheets = assets.filter(value => value.match(/\.css$/));
  const scripts = assets.filter(value => value.match(/\.js$/));

  const page = ReactDOMServer.renderToStaticMarkup(
    <HtmlWrapper
      head={head}
      stylesheets={stylesheets}
      scripts={scripts}
      state={preloadedState}
      aphroditeCSS={aphroditeCSS}
    >
      {content}
    </HtmlWrapper>
  );

  callback(null, page);
};