import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateBlock } from '../redux/page';
import StageEditor from '../components/StageEditor';
import TeaserEditor from '../components/TeaserEditor';

const editors = {
  StageEditor,
  TeaserEditor,
};


const typeToComponent = (type) => {
  const name = type.substr(0, 1).toUpperCase() + type.substr(1) + 'Editor';
  if (!(name in editors)) {
    console.error(`Unable to find editor component for type "${type}"!`);
    return null;
  }
  return editors[name];
};

const Editor = ({ blocks, update }) => (
  <div>
    {
      blocks.map(({ type, id, props }) => {
        const EditorComponent = typeToComponent(type);
        if (!EditorComponent) {
          return null;
        }

        return React.createElement(
          EditorComponent,
          { ...props, update, id, key: id }
        );
      })
    }
  </div>
);

Editor.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      props: React.object,
    })
  ),
  update: PropTypes.func,
};

export default connect(
  (state) => ({ blocks: state.children || [] }),
  { update: updateBlock }
)(Editor);
