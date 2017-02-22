import React, { PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import editors from './blockEditors';

const NewBlockButtonMenu = ({ className, createComponent }) => (
  <IconMenu
    iconButtonElement={
      <FloatingActionButton
        title={'Add new block here'}
        mini
      >
        <ContentAdd />
      </FloatingActionButton>
    }
    className={className}
  >
    {
      Object.entries(editors).map(([name, component]) => (
        <MenuItem
          key={name}
          value={name}
          primaryText={name}
          onTouchTap={() => createComponent(component.getEmpty())}
        />
      ))
    }
  </IconMenu>
);

NewBlockButtonMenu.propTypes = {
  createComponent: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default NewBlockButtonMenu;