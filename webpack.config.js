const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './ui/index.js',
  output: {
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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'ui/index.html',
    }),
  ],
  devServer: {
    proxy: {
      '/graphql': 'http://localhost:3010/graphql',
      '/login/*': 'http://localhost:3010',
      '/logout': 'http://localhost:3010',
    },
    historyApiFallback: {
      index: '/',
    },
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: path.join(__dirname, 'node_modules'),
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
};
