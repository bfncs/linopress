import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

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
      </div>
    ))}
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
    children: [
      {
        title: '',
        description: '',
        reference: '',
      },
    ],
  },
});

export default TeaserEditor;
