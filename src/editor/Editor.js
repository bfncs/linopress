import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './editor.css';
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

const sanitizePage = (page) => ({
  ...page,
  children: page.children.map(child => ({
    type: child.type,
    props: child.props,
  })),
});

const savePage = (page) => {
  const path = window.location.pathname;
  const options = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(sanitizePage(page)),
  };
  fetch(`/api${path}`, options)
    .then(() => console.log('Ok'))
    .catch(err => console.error(`Unable to save content for "${path}".`, err))
};

const Editor = ({ page, update }) => (
  <div className="editor">
    <div className="editor-blocks">
      {
        page.children && page.children.map(({ type, id, props }) => {
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
              onTouchTap={() => console.log(`new ${name}`)}
            />
          ))
        }
      </IconMenu>
      <RaisedButton
        label="Save"
        onTouchTap={() => savePage(page)}
        className={'editorActions-btn'}
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
  update: PropTypes.func,
};

export default connect(
  (state) => ({ page: state }),
  { update: updateBlock }
)(Editor);
