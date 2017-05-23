import { combineReducers } from 'redux';
import page from './page';
import pages from './pages';
import schema from './schema';
import sitemap from './sitemap';

export default combineReducers({
  page,
  pages,
  schema,
  sitemap,
});
