import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const PageEditor = ({ update, title = '', description = '' }) => (
  <div>
    <TextField
      floatingLabelText="Title"
      value={title}
      onChange={(e) => update({ title: e.target.value, description })}
      fullWidth
    />
    <TextField
      floatingLabelText="Description"
      value={description}
      onChange={(e) => update({ title, description: e.target.value })}
      fullWidth
    />
  </div>
);

PageEditor.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  update: PropTypes.func.isRequired,
};

export default PageEditor;
