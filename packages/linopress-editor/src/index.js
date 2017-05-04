import renderSitemap from './renderSitemap';
import renderEditor from './renderEditor';

const pathName = window.location.pathname;
const root = document.getElementById('root');

if (pathName === '/') {
    renderSitemap(root);
} else if (pathName.startsWith('/editor/')) {
    renderEditor(root);
} else {
    window.location.pathname = '/';
}