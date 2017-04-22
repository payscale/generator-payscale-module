var webpack = require('webpack');

module.exports = {
    entry: {
        '<%- name %>': __dirname + '/lib/index.js',
        '<%- name %>.min': __dirname + '/lib/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        publicPath: 'https://localhost:8080/dist/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: ['/node_modules/', '/tests/']
        }]
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        https: true
    },
    devtool: 'inline-source-map'
};