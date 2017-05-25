const hasDirectIndex = ({ children }) =>
  children.some(child => child.type === 'file' && child.name === 'index.json');

const hasRemoteIndex = ({ children }) =>
  children.some(child => child.type === 'dir' && hasIndex(child));

function hasIndex(item) {
  return item.type === 'dir' && (hasDirectIndex(item) || hasRemoteIndex(item));
}

const generateSiteMap = tree => {
  return tree
    .map(item => {
      if (!(item.type === 'dir' || item.children)) {
        return null;
      }
      const isNode = hasDirectIndex(item);
      if (!(isNode || hasRemoteIndex(item))) {
        return null;
      }
      return {
        name: item.name,
        isNode,
        children: generateSiteMap(item.children),
      };
    })
    .filter(item => item !== null);
};

module.exports = tree => {
  tree.name = '/';
  return generateSiteMap([tree])[0];
};
