import React from 'react';
import EditorView from './views/EditorView';
import SitemapView from './views/SitemapView';
import 'foundation-sites/css/foundation.min.css';
import 'font-awesome/css/font-awesome.min.css';

const FRONTEND_BASE_URL = 'http://localhost:3000';

const containerStyle = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '1em 2em',
};

const Editor = () => {
  const editorPath = new URLSearchParams(window.location.search).get('site');
  return (
    <div style={containerStyle}>
      {editorPath
        ? <EditorView contentPath={editorPath} />
        : <SitemapView baseUrl={FRONTEND_BASE_URL} />}
    </div>
  );
};

export default Editor;
