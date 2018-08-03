const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [path.resolve(__dirname, '../src/styles/')]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
