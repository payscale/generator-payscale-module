const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        'test': [__dirname + '/test.js']
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        publicPath: 'http://localhost:8080/dist/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('<%- name %>.css')
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: ['/node_modules/', '/tests/']
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({ use: ['css-loader'] })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('test.css')
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        https: false
    },
    devtool: 'inline-source-map'
};
