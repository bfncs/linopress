import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import FlatButton from 'material-ui/FlatButton';

import { updateBlock, removeBlock, moveUpBlock, moveDownBlock } from '../redux/page';
import editors from './blockEditors';
import EditorCard from './EditorCard';

const mapDispatchToProps = {
  pageUpdateBlock: updateBlock,
  pageRemoveBlock: removeBlock,
  pageMoveBlockUp: moveUpBlock,
  pageMoveBlockDown: moveDownBlock,
};

const styles = StyleSheet.create({
  container: {
    margin: '1em 0',
  },
});

const typeToName = (type) => {
  return type.substr(0, 1).toUpperCase() + type.substr(1);
};

const typeToComponent = (type) => {
  const name = typeToName(type) + 'Editor';
  if (!(name in editors)) {
    console.error(`Unable to find editor component for type "${type}"!`);
    return null;
  }
  return editors[name];
};

const EditorBlocks = ({
  blocks,
  pageUpdateBlock,
  pageRemoveBlock,
  pageMoveBlockUp,
  pageMoveBlockDown,
}) => (
  <div className={css(styles.container)}>
    {
      blocks && blocks.map(({ type, id, props }, index) => {
        const EditorComponent = typeToComponent(type);
        if (!EditorComponent) {
          return null;
        }

        const actions = (
          <div>
            <FlatButton
              label="Up"
              onTouchTap={() => pageMoveBlockUp(id)}
              disabled={index === 0}
            />
            <FlatButton
              label="Down"
              onTouchTap={() => pageMoveBlockDown(id)}
              disabled={index === blocks.length - 1}
            />
            <FlatButton
              label="Remove"
              onTouchTap={() => pageRemoveBlock(id)}
            />
          </div>
        );
        return (
          <EditorCard
            key={id}
            title={`Block: ${typeToName(type)}`}
            actions={actions}
          >
            <EditorComponent
              {...props}
              update={pageUpdateBlock}
              remove={pageRemoveBlock}
              id={id}
            />
          </EditorCard>
        );
      })
    }
  </div>
);

EditorBlocks.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      props: React.object,
    })
  ),
  pageUpdateBlock: PropTypes.func,
  pageRemoveBlock: PropTypes.func,
  pageMoveBlockUp: PropTypes.func,
  pageMoveBlockDown: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps
)(EditorBlocks);
