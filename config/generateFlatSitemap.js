const relativePathToName = relativePath =>
  relativePath
    .replace(/^.\//, '/')
    .replace(/index\.json$/, '')
    .replace(/^(.+)\/+$/, '$1'); // remove ending dashes

const generateFlatSiteMap = tree => {
  return tree.reduce(
    (acc, item) => {
      if (item.type === 'file' && item.name === 'index.json') {
        return Object.assign(
          acc,
          { [relativePathToName(item.relativePath)]: item.relativePath }
        );
      }
      if (item.type === 'dir' && Array.isArray(item.children)) {
        return Object.assign(
          acc,
          generateFlatSiteMap(item.children)
        );
      }
    },
    {}
  );
};

module.exports = tree => generateFlatSiteMap([tree]);
