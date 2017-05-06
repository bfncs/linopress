import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initSitemap } from '../redux/sitemap';
import SitemapNode from '../components/SitemapNode';

class SiteMapView extends Component {
  static propTypes = {
    sitemap: PropTypes.object,
    initSitemap: PropTypes.func.isRequired,
    baseUrl: PropTypes.string.isRequired,
  };

  componentWillMount = () => {
    fetch(`/api/sitemap/`).then(res => res.json()).then(this.props.initSitemap);
  };

  render() {
    const { sitemap, baseUrl } = this.props;

    if (!sitemap) {
      return <span>…</span>;
    }

    return (
      <div>
        Sitemap
        <SitemapNode sitemap={[sitemap]} baseUrl={baseUrl} />
      </div>
    );
  }
}

export default connect(state => ({ sitemap: state.sitemap.content }), {
  initSitemap,
})(SiteMapView);
