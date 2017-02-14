import React, { PropTypes } from 'react';

const Stage = ({ title, description }) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);

Stage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Stage;
