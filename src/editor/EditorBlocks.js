import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import './editor.css';
import editors from './blockEditors';
import { updateBlock, removeBlock, moveUpBlock, moveDownBlock } from '../redux/page';

const mapDispatchToProps = {
  pageUpdateBlock: updateBlock,
  pageRemoveBlock: removeBlock,
  pageMoveBlockUp: moveUpBlock,
  pageMoveBlockDown: moveDownBlock,
};

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
  <div className="editor-blocks">
    {
      blocks && blocks.map(({ type, id, props }, index) => {
        const EditorComponent = typeToComponent(type);
        if (!EditorComponent) {
          return null;
        }

        return (
          <Card
            key={id}
            className={'blockEditor'}
          >
            <CardHeader title={`Block: ${typeToName(type)}`} />
            <CardText>
              {
                React.createElement(
                  EditorComponent,
                  { ...props, update: pageUpdateBlock, remove: pageRemoveBlock, id }
                )
              }
            </CardText>
            <CardActions>
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
            </CardActions>
          </Card>
        )
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
