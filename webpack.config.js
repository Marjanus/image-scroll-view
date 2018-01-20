const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const webpackConfig = {
  entry: path.join(__dirname, '/src/client/index.jsx'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(__dirname, '/src/client/index.html'),
    title: 'Image Scroll View',
    inject: 'body',
  })],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = webpackConfig;
