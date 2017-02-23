import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List, ListItem} from 'material-ui/List';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = StyleSheet.create({
  actionsContainer: {
    padding: '.4em 0',
    textAlign: 'center',
  },
  itemContainer: {
    margin: '0 0 1.4em',
  }
});

const getEmptyChild = () => ({
  title: '',
  description: '',
  reference: '',
});



const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="entry actions"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon />
  </IconButton>
);

const getRightIconMenu = (handleRemove) => (
  <IconMenu
    iconButtonElement={iconButtonElement}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem onTouchTap={handleRemove}>Remove entry</MenuItem>
  </IconMenu>
);

const removeChildAtPosition = (children, position) => (
  children.filter((child, childPosition) => (childPosition !== position))
);


const setFieldValue = (stateChildren, reference, field, value) => {
  const children = stateChildren.map(item => {
    if (item.reference !== reference) {
      return item;
    }
    return {
      ...item,
      [field]: value,
    }
  });
  return { children };
};

const TeaserEditor = ({ id, update, children }) => (
  <div>
    <List>
      {children.map(({ title, description, reference}, index) => (
        <ListItem
          key={index}
          className={css(styles.itemContainer)}
          rightIconButton={
            getRightIconMenu(() => update(id, {children: removeChildAtPosition(children, index) }))
          }
        >
          <TextField
            floatingLabelText="Title"
            value={title}
            onChange={(e) => update(id, setFieldValue(children, reference, 'title', e.target.value))}
            fullWidth
          />
          <TextField
            floatingLabelText="Description"
            value={description}
            onChange={(e) => update(id, setFieldValue(children, reference, 'description', e.target.value))}
            fullWidth
          />
          <TextField
            floatingLabelText="Reference"
            value={reference}
            onChange={(e) => update(id, setFieldValue(children, reference, 'reference', e.target.value))}
            fullWidth
          />
        </ListItem>
      ))}
    </List>
    <div className={css(styles.actionsContainer)}>
      <FloatingActionButton
        title={'Add new entry here'}
        onTouchTap={() => update(id, { children: [...children, getEmptyChild()] })}
        secondary
        mini
      >
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div>
);

TeaserEditor.propTypes = {
  id: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      reference: PropTypes.string.isRequired,
    }),
  ),
};

TeaserEditor.getEmpty = () => ({
  type: 'teaser',
  props: {
    children: [getEmptyChild()],
  },
});

export default TeaserEditor;
