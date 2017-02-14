import React, { PropTypes } from 'react';
import StageEditor from '../components/StageEditor';

const editors = {
  StageEditor,
};


const typeToComponent = (type) => {
  const name = type.substr(0, 1).toUpperCase() + type.substr(1) + 'Editor';
  if (!(name in editors)) {
    console.error(`Unable to find editor component for type "${type}"!`);
    return null;
  }
  return editors[name];
};

const update = (nextState) => {
  console.log({ nextState });
};

const Editor = ({ blocks }) => (
  <div>
    {
      blocks.map(({ type, key, props }) => {
        const EditorComponent = typeToComponent(type);
        if (!EditorComponent) {
          return null;
        }

        return React.createElement(
          EditorComponent,
          { ...props, key, update }
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
};

export default Editor;
