import {
  PAGE_INIT,
  PAGE_UPDATE_META,
  PAGE_UPDATE_BLOCK,
  PAGE_INSERT_BLOCK,
  PAGE_APPEND_BLOCK,
  PAGE_REMOVE_BLOCK,
  PAGE_MOVE_UP_BLOCK,
  PAGE_MOVE_DOWN_BLOCK,
} from './page';

export const EDITOR_CLEAN = 'EDITOR_CLEAN';

export const clean = () => ({ type: EDITOR_CLEAN });

const initialState = {
  dirty: false,
};

const editor = (state = initialState, action) => {
  switch (action.type) {
    case EDITOR_CLEAN:
    case PAGE_INIT:
      return {
        ...state,
        dirty: false,
      };

    case PAGE_UPDATE_META:
    case PAGE_UPDATE_BLOCK:
    case PAGE_INSERT_BLOCK:
    case PAGE_APPEND_BLOCK:
    case PAGE_REMOVE_BLOCK:
    case PAGE_MOVE_UP_BLOCK:
    case PAGE_MOVE_DOWN_BLOCK:
      return {
        ...state,
        dirty: true,
      };

    default:
      return state;
  }
};

export default editor;