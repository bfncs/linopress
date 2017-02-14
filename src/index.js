import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import pageReducer from './redux/page';

import Frontend from './FrontendApp';
import Editor from './editor/EditorApp';
import './index.css';

const store = createStore(pageReducer);

const App = process.env.NODE_ENV === "development"
  ? Editor
  : Frontend;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);