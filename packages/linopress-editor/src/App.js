import React from 'react';
import EditorView from './views/EditorView';
import SitemapView from './views/SitemapView';

const FRONTEND_BASE_URL = 'http://localhost:3000';

const getContentPath = pathName => {
  const path = pathName.replace(/^\/editor\//, '').replace(/\/$/, '');
  return path === '' ? '/' : `/${path}/`;
};

const App = () => {
  const path = window.location.pathname;
  const contentPath = getContentPath(path);
  console.log({ contentPath });
  if (path === '/') {
    return <SitemapView baseUrl={FRONTEND_BASE_URL} />;
  } else if (path.startsWith('/editor/')) {
    return <EditorView contentPath={contentPath} />;
  } else {
    window.location.pathname = '/';
  }
};

export default App;
