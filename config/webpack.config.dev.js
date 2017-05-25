const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./env');

module.exports = (paths) => {
  const publicPath = '/';
  const publicUrl = '';
  const env = getClientEnvironment(publicUrl);
  return {
    devtool: 'cheap-module-source-map',
    entry: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      require.resolve('./polyfills'),
      paths.appIndexJs,
    ],
    output: {
      path: paths.appBuild,
      pathinfo: true,
      filename: 'static/js/bundle.js',
      publicPath: publicPath,
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx', ''],
      root: [paths.contentSrc, paths.appSrc],
      modulesDirectories: [
        paths.contentNodeModules,
        paths.appNodeModules
      ],
    },
    resolveLoader: {
      fallback: paths.appNodeModules,
    },
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint',
          include: paths.contentSrc,
        },
      ],
      loaders: [
        {
          exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/, /\.svg$/],
          loader: 'url',
          query: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(js|jsx)$/,
          include: [paths.contentSrc, paths.appSrc],
          loader: 'babel',
          query: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.css$/,
          loader: 'style!css?importLoaders=1!postcss',
        },
        {
          test: /\.json$/,
          loader: 'json',
        },
        {
          test: /\.svg$/,
          loader: 'file',
          query: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    postcss: function() {
      return [
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ],
        }),
      ];
    },
    plugins: [
      new InterpolateHtmlPlugin(env.raw),
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
      }),
      new webpack.DefinePlugin(env.stringified),
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    ],
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  };
};