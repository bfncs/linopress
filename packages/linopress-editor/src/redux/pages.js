const SET_FETCHING = 'SET_FETCHING';
const SET_PAGE = 'SET_PAGE';

export const setFetching = () => ({
  type: SET_FETCHING,
});

export const setPage = (path, content) => ({
  type: SET_PAGE,
  path,
  content,
});

const initialState = {
  fetching: false,
  items: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case SET_PAGE:
      return {
        fetching: false,
        items: {
          ...state.items,
          [action.path]: action.content,
        },
      };
    default:
      return state;
  }
};
