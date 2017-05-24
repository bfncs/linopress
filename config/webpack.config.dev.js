var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var getClientEnvironment = require('./env');
var path = require('path');
var paths = require('./paths');

module.exports = (contentBasePath) => {
  const contentSrc = path.resolve(contentBasePath, 'src');
  const contentModules = path.resolve(contentBasePath, 'node_modules');

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
      root: [contentSrc, path.resolve(__dirname, '..', 'src')],
      modulesDirectories: [
        contentModules,
        path.resolve(__dirname, '..', 'node_modules'),
      ],
    },
    resolveLoader: {
      fallback: path.resolve(__dirname, '..', 'node_modules')
    },
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint',
          include: paths.appSrc,
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
          exclude: /(node_modules|bower_components)/,
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