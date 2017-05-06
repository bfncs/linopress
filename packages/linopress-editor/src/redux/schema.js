const SET_SCHEMA = 'SET_SCHEMA';

export const setSchema = schema => ({
  type: SET_SCHEMA,
  schema,
});

export default (state = null, action) => {
  switch (action.type) {
    case SET_SCHEMA:
      return action.schema;
    default:
      return state;
  }
};
