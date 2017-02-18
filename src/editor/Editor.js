import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import EditorBlocks from './EditorBlocks';
import EditorActions from './EditorActions';

import './editor.css';
import { updateMeta } from '../redux/page';
import PageEditor from '../components/PageEditor';

const mapStateToProps = (state) => ({
  page: state.page,
});

const mapDispatchToProps = {
  pageUpdateMeta: updateMeta,
};

const Editor = ({
  page,
  pageUpdateMeta,
}) => (
  <div className="editor">
    <Card className={'blockEditor'}>
      <CardHeader title={'Page'} />
      <CardText>
        <PageEditor update={pageUpdateMeta} {...page} />
      </CardText>
    </Card>
    <EditorBlocks blocks={page.children} />
    <EditorActions />
  </div>
);

Editor.propTypes = {
  page: PropTypes.shape({
    blocks: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        props: React.object,
      })
    ),
  }),
  pageUpdateMeta: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
