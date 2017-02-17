import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const StageEditor = ({ id, update, title, description }) => (
  <div>
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

StageEditor.getEmpty = () => ({
  type: 'stage',
  props: {
    title: '',
    description: '',
  },
});

export default StageEditor;
