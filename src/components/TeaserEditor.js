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

const StageEditor = ({ id, update, children }) => (
  <div>
    <h2>Teaser</h2>
    {children.map(({ title, description, reference}, index) => (
      <div key={index}>
        <TextField
          floatingLabelText="Title"
          value={title}
          onChange={(e) => update(id, setFieldValue(children, reference, 'title', e.target.value))}
        />
        <TextField
          floatingLabelText="Description"
          value={description}
          onChange={(e) => update(id, setFieldValue(children, reference, 'description', e.target.value))}
        />
        <TextField
          floatingLabelText="Reference"
          value={reference}
          onChange={(e) => update(id, setFieldValue(children, reference, 'reference', e.target.value))}
        />
      </div>
    ))}
  </div>
);

StageEditor.propTypes = {
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

export default StageEditor;
