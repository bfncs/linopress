import React, { PropTypes } from 'react';
import hash from 'murmurhash';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    listStyle: 'none',
    margin: 0,
    padding: '1em',
  },
  blockHeader: {
    color: 'teal',
    ':hover': {
      color: 'peru',
    },
  },
});

const Teaser = ({ children }) => {
  return (
    <ul className={css(styles.container)}>
      {children.map(({ title, description, reference }) => (
        <li key={hash(title + description + reference)}>
          <h2>
            <a href={reference} className={css(styles.blockHeader)}>{title}</a>
          </h2>
          <p>{description}</p>
        </li>
      ))}
    </ul>
  );
};

Teaser.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      reference: PropTypes.string.isRequired,
    })
  ),
};

export default Teaser;
