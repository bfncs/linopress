import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = StyleSheet.create({
  blocksDivider: {
    margin: '1em 0',
  },
  actionsContainer: {
    padding: '.4em 0',
    textAlign: 'center',
  },
});

const getEmptyChild = () => ({
  title: '',
  description: '',
  reference: '',
});

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
    {children.map(({ title, description, reference}, index) => (
      <div key={index}>
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
        <Divider className={css(styles.blocksDivider)} />
      </div>
    ))}
    <div className={css(styles.actionsContainer)}>
      <FloatingActionButton
        title={'Add new entry here'}
        onTouchTap={() => update(id, { children: [...children, getEmptyChild()] })}
        secondary
        mini
      >
        <ContentAdd />
      </FloatingActionButton>
      <Divider className={css(styles.blocksDivider)} />
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
