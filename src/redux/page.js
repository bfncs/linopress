import hash from 'murmurhash';

export const PAGE_UPDATE = 'PAGE_UPDATE';
export const PAGE_UPDATE_BLOCK = 'PAGE_UPDATE_BLOCK';

export const update = (page) => ({
  type: PAGE_UPDATE,
  page,
});

export const updateBlock = (id, props) => {
  return ({
    type: PAGE_UPDATE_BLOCK,
    id,
    props,
  });
};

const page = (state = {}, action) => {
  switch (action.type) {
    case PAGE_UPDATE:
      const { page } = action;
      return {
        ...page,
        children: page.children.map(child => ({
          ...child,
          id: hash(JSON.stringify(child)).toString(),
        })),
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
    default:
      return state;
  }
};

export default page;