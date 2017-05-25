const generateSitemap = require('./generateSitemap');

const tree = {
  name: 'content',
  relativePath: '.',
  size: 1750,
  type: 'dir',
  children: [
    {
      name: 'index.json',
      relativePath: './index.json',
      size: 876,
      type: 'file',
    },
    {
      name: 'foo',
      relativePath: './foo',
      size: 0,
      type: 'dir',
      children: [
        {
          name: 'bar',
          relativePath: './foo/bar',
          size: 0,
          type: 'dir',
          children: [
            {
              name: 'index.json',
              relativePath: './foo/bar/index.json',
              size: 0,
              type: 'file',
            },
          ],
        },
      ],
    },
    {
      children: [
        {
          name: 'emptyDir',
          relativePath: './other/emptyDir',
          size: 0,
          type: 'dir',
          children: [],
        },
        {
          name: 'index.json',
          relativePath: './other/index.json',
          size: 874,
          type: 'file',
        },
      ],
      name: 'other',
      relativePath: './other',
      size: 874,
      type: 'dir',
    },
  ],
};

const sitemap = {
  name: '/',
  isNode: true,
  children: [
    {
      name: 'foo',
      isNode: false,
      children: [
        {
          name: 'bar',
          isNode: true,
          children: [],
        },
      ],
    },
    {
      name: 'other',
      isNode: true,
      children: [],
    },
  ],
};

describe('generateSitemap', () => {
  test('converts tree', () => {
    expect(generateSitemap(tree)).toEqual(sitemap);
  });
});
