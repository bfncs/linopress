import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const StageEditor = ({ id, title, description, update }) => (
  <div>
    <h2>Stage</h2>
    <TextField
      floatingLabelText="Title"
      value={title}
      onChange={(e) => update(id, { title: e.target.value, description })}
      fullWidth
    />
    <TextField
      floatingLabelText="Description"
      value={description}
      onChange={(e) => update(id, { title, description: e.target.value })}
      fullWidth
    />
  </div>
);

StageEditor.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default StageEditor;
