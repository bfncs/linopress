import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import RaisedButton from 'material-ui/RaisedButton';

import { clean } from '../redux/editor';
import { appendBlock } from '../redux/page';

const mapStateToProps = (state) => ({
  page: state.page,
  dirty: state.editor.dirty,
});

const mapDispatchToProps = {
  cleanState: clean,
  pageAppendBlock: appendBlock,
};

const styles = StyleSheet.create({
  container: {
    margin: '3em 0',
  },
  button: {
    margin: '.4em 0',
  }
});

const sanitizePage = (page) => ({
  ...page,
  children: page.children.map(child => ({
    type: child.type,
    props: child.props,
  })),
});

const savePage = (page, onSuccess) => {
  const path = window.location.pathname;
  const options = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(sanitizePage(page)),
  };
  fetch(`/api/content${path}`, options)
    .then(() => onSuccess())
    .catch(err => console.error(`Unable to save content for "${path}".`, err))
};

const EditorActions = ({
  page,
  dirty,
  cleanState,
  pageAppendBlock,
}) => (
  <div className={css(styles.container)}>
    <RaisedButton
      label="Save page"
      onTouchTap={() => savePage(page, cleanState)}
      className={css(styles.button)}
      disabled={!dirty}
      primary
      fullWidth
    />
  </div>
);

EditorActions.propTypes = {
  page: PropTypes.shape({
    blocks: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        props: React.object,
      })
    ),
  }),
  dirty: PropTypes.bool,
  cleanState: PropTypes.func,
  pageAppendBlock: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorActions);
