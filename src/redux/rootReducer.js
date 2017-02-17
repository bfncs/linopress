import { combineReducers } from "redux";
import page from './page';
import editor from './editor';

export default combineReducers({
  page,
  editor,
});