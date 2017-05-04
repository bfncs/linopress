const generateSitemap = (tree, parentPath = '') => {
    const list = document.createElement('ul');
    tree
        .map((item) => {
            const itemPath = `${parentPath}/${item.name}`.replace(/\/+/, '/');
            const element = document.createElement('li');

            const name = document.createElement('span');
            name.innerText = item.name;
            element.appendChild(name);

            if (item.isNode) {
                const link = document.createElement('a');
                link.innerText = '🖉';
                link.href = `/editor${itemPath}`;
                element.appendChild(link);
            }

            if (item.children) {
                element.appendChild(generateSitemap(item.children, itemPath));
            }

            return element;
        })
        .forEach((item) => list.appendChild(item));
    return list;
};

export default (root) => {
    fetch(`/api/sitemap/`)
        .then(res => res.json())
        .then((sitemap) => {
            root.appendChild(generateSitemap([sitemap]));
        });
}