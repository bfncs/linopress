import { hash, fauxHash } from '../utils/hash';
import { withUpdated, withInsertedBefore, moveUp, moveDown } from '../utils/arrayHelpers';

export const PAGE_UPDATE = 'PAGE_UPDATE';
export const PAGE_UPDATE_META = 'PAGE_UPDATE_META';
export const PAGE_UPDATE_BLOCK = 'PAGE_UPDATE_BLOCK';
export const PAGE_INSERT_BLOCK = 'PAGE_INSERT_BLOCK';
export const PAGE_APPEND_BLOCK = 'PAGE_APPEND_BLOCK';
export const PAGE_REMOVE_BLOCK = 'PAGE_REMOVE_BLOCK';
export const PAGE_MOVE_UP_BLOCK = 'PAGE_MOVE_UP_BLOCK';
export const PAGE_MOVE_DOWN_BLOCK = 'PAGE_MOVE_DOWN_BLOCK';

export const update = (page) => ({
  type: PAGE_UPDATE,
  page,
});

export const updateMeta = (props) => ({
  type: PAGE_UPDATE_META,
  props,
});

export const updateBlock = (id, props) => ({
  type: PAGE_UPDATE_BLOCK,
  id,
  props,
});

export const insertBlockBefore = (id, block) => ({
  type: PAGE_INSERT_BLOCK,
  id,
  block,
});

export const appendBlock = (block) => ({
  type: PAGE_APPEND_BLOCK,
  block,
});

export const removeBlock = (id) => ({
  type: PAGE_REMOVE_BLOCK,
  id,
});

export const moveUpBlock = (id) => ({
  type: PAGE_MOVE_UP_BLOCK,
  id,
});

export const moveDownBlock = (id) => ({
  type: PAGE_MOVE_DOWN_BLOCK,
  id,
});

const decorateWithId = (obj) => ({
  ...obj,
  id: hash(obj),
});

const decorateWithRandomId = (obj) => ({
  ...obj,
  id: fauxHash(),
});

const page = (state = {}, action) => {
  switch (action.type) {
    case PAGE_UPDATE:
      const { page } = action;
      return {
        ...page,
        children: page.children.map(decorateWithId),
      };

    case PAGE_UPDATE_META:
      return {
        ...state,
        ...action.props,
        children: state.children,
      };

    case PAGE_UPDATE_BLOCK:
      return {
        ...state,
        children: withUpdated(
          state.children,
          child => child.id === action.id,
          child => ({ ...child, props: action.props }),
        ),
      };

    case PAGE_INSERT_BLOCK:
      return {
        ...state,
        children: withInsertedBefore(
          state.children,
          child => child.id === action.id,
          decorateWithRandomId(action.block)
        ),
      };

    case PAGE_APPEND_BLOCK:
      return {
        ...state,
        children: [
          ...state.children,
          decorateWithRandomId(action.block),
        ]
      };

    case PAGE_REMOVE_BLOCK:
      return {
        ...state,
        children: state.children.filter(child => child.id !== action.id)
      };

    case PAGE_MOVE_UP_BLOCK:
      return {
        ...state,
        children: moveUp(state.children, child => child.id === action.id),
      };

    case PAGE_MOVE_DOWN_BLOCK:
      return {
        ...state,
        children: moveDown(state.children, child => child.id === action.id),
      };

    default:
      return state;
  }
};

export default page;