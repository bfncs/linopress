import { combineReducers } from 'redux';
import pages from './pages';
import schema from './schema';
import sitemap from './sitemap';

export default combineReducers({
  pages,
  schema,
  sitemap,
});
