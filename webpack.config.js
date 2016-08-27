const path = require('path');

module.exports = {
  entry: './ui/client.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.css/,
      loader: 'style!css',
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  devServer: {
  },
};
