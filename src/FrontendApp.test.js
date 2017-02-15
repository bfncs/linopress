import React from 'react';
import ReactDOM from 'react-dom';
import FrontendApp from './FrontendApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FrontendApp />, div);
});
