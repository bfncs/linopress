import React from 'react';
import PropTypes from 'prop-types';
import Stage from './Stage';
import Teaser from './Teaser';
import Helmet from 'react-helmet';

const blocks = {
  Stage,
  Teaser,
};

const typeToComponent = type => {
  const name = type.substr(0, 1).toUpperCase() + type.substr(1);
  if (!(name in blocks)) {
    console.error(`Unable to find component for type "${type}"!`);
    return null;
  }
  return blocks[name];
};

const Page = ({ title, description, blocks }) => (
  <div>
    <Helmet
      title={title}
      meta={[{ name: 'description', content: description }]}
    />
    {blocks.map(({ type, id, props }) => {
      const Component = typeToComponent(type);
      if (!Component) {
        return null;
      }
      return React.createElement(Component, { ...props, key: id });
    })}
  </div>
);

Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      props: React.object,
    })
  ),
};

export default Page;
