const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devtool: "cheap-eval-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3002,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                secure: false
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.ejs'
        })
    ]
};