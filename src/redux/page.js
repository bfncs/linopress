import hash from 'murmurhash';

export const PAGE_UPDATE = 'PAGE_UPDATE';

export const update = (page) => ({
  type: PAGE_UPDATE,
  page,
});

const page = (state = {}, action) => {
  switch (action.type) {
    case PAGE_UPDATE:
      const { page } = action;
      return {
        ...page,
        children: page.children.map(child => ({
          ...child,
          key: hash(JSON.stringify(child)),
        })),
      };
    default:
      return state;
  }
};

export default page;