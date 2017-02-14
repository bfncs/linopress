import React, { PropTypes } from 'react';
import Stage from './Stage';
import Teaser from './Teaser';

const blocks = {
  Stage,
  Teaser,
};

const typeToComponent = (type) => {
  const name = type.substr(0, 1).toUpperCase() + type.substr(1);
  if (!(name in blocks)) {
    console.error(`Unable to find component for type "${type}"!`);
    return null;
  }
  return blocks[name];
};

const Page = ({ blocks }) => (
  <div>
    {
      blocks.map(({ type, key, props }) => {
        const Component = typeToComponent(type);
        if (!Component) {
          return null;
        }
        return React.createElement(Component, { ...props, key });
      })
    }
  </div>
);

Page.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      props: React.object,
    })
  ),
};

export default Page;
