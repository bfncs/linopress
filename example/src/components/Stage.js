import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    color: '#fff',
    background: 'teal',
    padding: '1em',
  },
});

const Stage = ({ title, description }) => (
  <div className={css(styles.container)}>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);

Stage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Stage;
