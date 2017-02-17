import murmurhash from 'murmurhash';

export const PAGE_UPDATE = 'PAGE_UPDATE';
export const PAGE_UPDATE_BLOCK = 'PAGE_UPDATE_BLOCK';
export const PAGE_APPEND_BLOCK = 'PAGE_APPEND_BLOCK';
export const PAGE_REMOVE_BLOCK = 'PAGE_REMOVE_BLOCK';

export const update = (page) => ({
  type: PAGE_UPDATE,
  page,
});

export const updateBlock = (id, props) => ({
  type: PAGE_UPDATE_BLOCK,
  id,
  props,
});

export const appendBlock = (block) => ({
  type: PAGE_APPEND_BLOCK,
  block,
});

export const removeBlock = (id) => ({
  type: PAGE_REMOVE_BLOCK,
  id,
});

const hash = (obj) => (
  murmurhash(JSON.stringify(obj)).toString()
);

const decorateWithId = (obj) => ({
  ...obj,
  id: hash(obj),
});

const page = (state = {}, action) => {
  switch (action.type) {
    case PAGE_UPDATE:
      const { page } = action;
      return {
        ...page,
        children: page.children.map(decorateWithId),
      };
    case PAGE_UPDATE_BLOCK:
      return {
        ...state,
        children: state.children.map(child => (
          child.id === action.id
            ? {
              ...child,
              props: action.props,
            }
            : child
        )),
      };
    case PAGE_APPEND_BLOCK:
      return {
        ...state,
        children: [
          ...state.children,
          decorateWithId(action.block),
        ]
      };
    case PAGE_REMOVE_BLOCK:
      return {
        ...state,
        children: state.children.filter(child => (child.id !== action.id))
      };
    default:
      return state;
  }
};

export default page;