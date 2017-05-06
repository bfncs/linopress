const generateSitemap = (tree, frontendBaseUrl, parentPath = '') => {
  const list = document.createElement('ul');
  tree
    .map(item => {
      const itemPath = `${parentPath}/${item.name}`.replace(/\/+/, '/');
      const element = document.createElement('li');

      const name = document.createElement('span');
      name.innerText = item.name;
      element.appendChild(name);

      if (item.isNode) {
        const viewLink = document.createElement('a');
        viewLink.innerText = '👁';
        viewLink.href = `${frontendBaseUrl}${itemPath}`;
        viewLink.target = '_blank';
        element.appendChild(viewLink);

        const editLink = document.createElement('a');
        editLink.innerText = '🖉';
        editLink.href = `/editor${itemPath}`;
        element.appendChild(editLink);
      }

      if (item.children) {
        element.appendChild(
          generateSitemap(item.children, frontendBaseUrl, itemPath)
        );
      }

      return element;
    })
    .forEach(item => list.appendChild(item));
  return list;
};

export default (root, frontendBaseUrl) => {
  fetch(`/api/sitemap/`).then(res => res.json()).then(sitemap => {
    root.appendChild(generateSitemap([sitemap], frontendBaseUrl));
  });
};
