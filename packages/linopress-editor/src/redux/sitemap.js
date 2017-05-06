const INIT_SITEMAP = 'INIT_SITEMAP';

export const initSitemap = sitemap => ({
  type: INIT_SITEMAP,
  sitemap,
});

export default (state = { content: null }, action) => {
  switch (action.type) {
    case INIT_SITEMAP:
      return {
        content: action.sitemap,
      };
    default:
      return state;
  }
};
