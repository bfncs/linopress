import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const StageEditor = ({ title, description, update }) => (
  <div>
    <h2>Stage</h2>
    <TextField
      floatingLabelText="Title"
      value={title}
      onChange={(e) => update({ title: e.target.value, description })}
    />
    <TextField
      floatingLabelText="Description"
      value={description}
      onChange={(e) => update({ title, description: e.target.value })}
    />
  </div>
);

StageEditor.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default StageEditor;
