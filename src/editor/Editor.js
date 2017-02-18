import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import EditorBlocks from './EditorBlocks';
import EditorActions from './EditorActions';

import { updateMeta } from '../redux/page';
import PageEditor from '../components/PageEditor';
import EditorCard from './EditorCard';

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
  <div>
    <EditorCard title={'Page'}>
      <PageEditor update={pageUpdateMeta} {...page} />
    </EditorCard>
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
