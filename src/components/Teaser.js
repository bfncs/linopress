import React, { PropTypes } from 'react';
import hash from 'murmurhash';

const Teaser = ({ children }) => {
  return (
    <ul>
      {
        children.map(({ title, description, reference }) => (
          <li key={hash(title+description+reference)}>
            <h2><a href={reference}>{title}</a></h2>
            <p>{description}</p>
          </li>
        ))
      }
    </ul>
  )
};

Teaser.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      reference: PropTypes.string.isRequired,
    }),
  ),
};

export default Teaser;
