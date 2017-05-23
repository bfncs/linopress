import React from 'react';
import PropTypes from 'prop-types';

const SitemapNode = ({ sitemap, baseUrl, parentPath = '' }) => (
  <ul>
    {sitemap.map(item => {
      const itemPath = `${parentPath}/${item.name}`.replace(/\/+/, '/');
      return (
        <li key={itemPath}>
          {item.name}
          {item.isNode &&
            <span>
              <a href={`${baseUrl}${itemPath}`} target="_blank">👁</a>
              <a href={`/editor?site=${itemPath}`}>🖉</a>
            </span>}
          {item.children &&
            <SitemapNode
              sitemap={item.children}
              baseUrl={baseUrl}
              parentPath={itemPath}
            />}
        </li>
      );
    })}
  </ul>
);

SitemapNode.propTypes = {
  sitemap: PropTypes.arrayOf(PropTypes.object),
  baseUrl: PropTypes.string.isRequired,
  parentPath: PropTypes.string,
};

export default SitemapNode;
