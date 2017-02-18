import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Card, CardHeader, CardText, CardActions} from 'material-ui/Card';

const styles = StyleSheet.create({
  blockEditor: {
    margin: '0 0 1.4em',
  }
});

const EditorCard = ({ title, children, actions }) => (
  <Card
    className={css(styles.blockEditor)}
  >
    <CardHeader title={`Block: ${title}`}/>
    <CardText>
      {children}
    </CardText>
    {actions && (
      <CardActions>
        {actions}
      </CardActions>
    )}
  </Card>
);

EditorCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
};

export default EditorCard;
