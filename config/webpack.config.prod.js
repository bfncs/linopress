const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const getClientEnvironment = require('./env');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const jetPack = require('fs-jetpack');
const generateFlatSitemap = require('./generateFlatSitemap');

module.exports = (paths) => {
  const contentTree = jetPack.inspectTree(paths.contentPayload, { relativePath: true });
  const content = Object.entries(generateFlatSitemap(contentTree))
    .reduce(
      (acc, item) => {
        const name = item[0];
        const relativePath = item[1];
        return Object.assign(
          acc,
          { [name]: require(path.resolve(paths.contentPayload, relativePath)) }
        )
      },
      {}
    );

  var publicPath = paths.servedPath;
  var shouldUseRelativeAssetPaths = publicPath === './';
  var publicUrl = publicPath.slice(0, -1);
  var env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
  if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
  }

// Note: defined here because it will be used more than once.
  const cssFilename = 'static/css/[name].[contenthash:8].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
  const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
    : undefined;

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
  return {
    debug: true,
    // Don't attempt to continue if there are any errors.
    bail: true,
    // We generate sourcemaps in production. This is slow but gives good results.
    // You can exclude the *.map files from the build during deployment.
    devtool: 'source-map',
    // In production, we only want to load the polyfills and the app code.
    entry: [require.resolve('./polyfills'), paths.appIndexJs],
    output: {
      libraryTarget: 'umd',
      // The build folder.
      path: paths.appBuild,
      // Generated JS file names (with nested folders).
      // There will be one main bundle, and one file per asynchronous chunk.
      // We don't currently advertise code splitting but Webpack supports it.
      filename: 'static/js/[name].[chunkhash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: publicPath,
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx', ''],
      root: [paths.contentSrc, paths.appSrc],
      modulesDirectories: [
        paths.contentNodeModules,
        paths.appNodeModules,
      ],
    },
    resolveLoader: {
      fallback: paths.appNodeModules,
    },
    module: {
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint',
          include: paths.contentSrc,
        },
      ],
      loaders: [
        // ** ADDING/UPDATING LOADERS **
        // The "url" loader handles all assets unless explicitly excluded.
        // The `exclude` list *must* be updated with every change to loader extensions.
        // When adding a new loader, you must add its `test`
        // as a new entry in the `exclude` list in the "url" loader.

        // "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
        // Otherwise, it acts like the "file" loader.
        {
          exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/, /\.svg$/],
          loader: 'url',
          query: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        // Process JS with Babel.
        {
          test: /\.(js|jsx)$/,
          include: [paths.contentSrc, paths.appSrc],
          loader: 'babel',
        },
        // The notation here is somewhat confusing.
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader normally turns CSS into JS modules injecting <style>,
        // but unlike in development configuration, we do something different.
        // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
        // (second argument), then grabs the result CSS and puts it into a
        // separate file in our build process. This way we actually ship
        // a single CSS file in production instead of JS code injecting <style>
        // tags. If you use code splitting, however, any async bundles will still
        // use the "style" loader inside the async code so CSS from them won't be
        // in the main CSS file.
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            'style',
            'css?importLoaders=1!postcss',
            extractTextPluginOptions
          ),
          // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
        },
        // JSON is not enabled by default in Webpack but both Node and Browserify
        // allow it implicitly so we also enable it.
        {
          test: /\.json$/,
          loader: 'json',
        },
        // "file" loader for svg
        {
          test: /\.svg$/,
          loader: 'file',
          query: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        // ** STOP ** Are you adding a new loader?
        // Remember to add the new extension(s) to the "url" loader exclusion list.
      ],
    },

    // We use PostCSS for autoprefixing only.
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
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      // In production, it will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(env.raw),
      new StaticSiteGeneratorPlugin(
        'main',
        Object.keys(content),
        {
          content: content,
        },
        { window: {} }
      ),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // It is absolutely essential that NODE_ENV was set to production here.
      // Otherwise React will be compiled in the very slow development mode.
      new webpack.DefinePlugin(env.stringified),
      // This helps ensure the builds are consistent if source hasn't changed:
      new webpack.optimize.OccurrenceOrderPlugin(),
      // Try to dedupe duplicated modules, if any:
      new webpack.optimize.DedupePlugin(),
      // Minify the code.
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
      // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
      new ExtractTextPlugin(cssFilename),
      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
      new CopyWebpackPlugin([{
        from: paths.contentPayload,
        to: 'api/content',
      }])
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  };
};