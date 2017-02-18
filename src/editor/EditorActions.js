import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './editor.css';
import editors from './blockEditors';
import { clean } from '../redux/editor';
import { appendBlock } from '../redux/page';

const mapStateToProps = (state) => ({
  page: state.page,
  dirty: state.editor.dirty,
});

const mapDispatchToProps = {
  cleanState: clean,
  pageAppendBlock: appendBlock,
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

const EditorActions = ({
  page,
  dirty,
  cleanState,
  pageAppendBlock,
}) => (
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
);

EditorActions.propTypes = {
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
  pageAppendBlock: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorActions);
