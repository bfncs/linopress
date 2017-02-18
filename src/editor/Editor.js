import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './editor.css';
import { clean } from '../redux/editor';
import {
  updateMeta,
  updateBlock,
  appendBlock,
  removeBlock,
  moveUpBlock,
  moveDownBlock
} from '../redux/page';
import PageEditor from '../components/PageEditor';
import StageEditor from '../components/StageEditor';
import TeaserEditor from '../components/TeaserEditor';

const editors = {
  PageEditor,
  StageEditor,
  TeaserEditor,
};

const mapStateToProps = (state) => ({
  page: state.page,
  dirty: state.editor.dirty,
});

const mapDispatchToProps = {
  cleanState: clean,
  pageUpdateBlock: updateBlock,
  pageUpdateMeta: updateMeta,
  pageAppendBlock: appendBlock,
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

const sanitizePage = (page) => ({
  ...page,
  children: page.children.map(child => ({
    type: child.type,
    props: child.props,
  })),
});

const savePage = (page, onSuccess) => {
  const path = window.location.pathname;
  const options = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(sanitizePage(page)),
  };
  fetch(`/api${path}`, options)
    .then(() => onSuccess())
    .catch(err => console.error(`Unable to save content for "${path}".`, err))
};

const Editor = ({
  page,
  dirty,
  cleanState,
  pageUpdateMeta,
  pageUpdateBlock,
  pageAppendBlock,
  pageRemoveBlock,
  pageMoveBlockUp,
  pageMoveBlockDown,
}) => (
  <div className="editor">
    <Card className={'blockEditor'}>
      <CardHeader title={'Page'} />
      <CardText>
        <PageEditor update={pageUpdateMeta} {...page} />
      </CardText>
    </Card>
    <div className="editor-blocks">
      {
        page.children && page.children.map(({ type, id, props }, index) => {
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
                  disabled={index === page.children.length - 1}
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
    <div className="editor-actions">
      <IconMenu
        iconButtonElement={<FloatingActionButton><ContentAdd /></FloatingActionButton>}
        className="editor-addMenu"
      >
        {
          Object.entries(editors).map(([name, component]) => (
            <MenuItem
              key={name}
              value={name}
              primaryText={name}
              onTouchTap={() => pageAppendBlock(component.getEmpty())}
            />
          ))
        }
      </IconMenu>
      <RaisedButton
        label="Save"
        onTouchTap={() => savePage(page, cleanState)}
        className={'editorActions-btn'}
        disabled={!dirty}
        primary
        fullWidth
      />
    </div>
  </div>
);

Editor.propTypes = {
  page: PropTypes.shape({
    blocks: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        props: React.object,
      })
    ),
  }),
  dirty: PropTypes.bool,
  cleanState: PropTypes.func,
  pageUpdateMeta: PropTypes.func,
  pageUpdateBlock: PropTypes.func,
  pageAppendBlock: PropTypes.func,
  pageRemoveBlock: PropTypes.func,
  pageMoveBlockUp: PropTypes.func,
  pageMoveBlockDown: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
