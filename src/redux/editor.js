import {
  PAGE_UPDATE,
  PAGE_UPDATE_BLOCK,
  PAGE_APPEND_BLOCK,
  PAGE_REMOVE_BLOCK,
  PAGE_MOVE_UP_BLOCK,
  PAGE_MOVE_DOWN_BLOCK,
} from './page';

const initialState = {
  dirty: false,
};

const editor = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_UPDATE:
      return {
        ...state,
        dirty: false,
      };

    case PAGE_UPDATE_BLOCK:
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