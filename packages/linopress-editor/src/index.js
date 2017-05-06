import renderSitemap from './renderSitemap';
import renderEditor from './renderEditor';

const pathName = window.location.pathname;
const root = document.getElementById('root');
const FRONTEND_BASE_URL = 'http://localhost:3000';

if (pathName === '/') {
  renderSitemap(root, FRONTEND_BASE_URL);
} else if (pathName.startsWith('/editor/')) {
  renderEditor(root);
} else {
  window.location.pathname = '/';
}
