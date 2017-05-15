const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader',
    },
    {
      test: /.(scss|css)$/,
      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
      })
      //loaders: ['style-loader', 'css-loader', 'sass-loader'],
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('style.css')
    //if you want to pass in options, you can do so:
    //new ExtractTextPlugin({
    //  filename: 'style.css'
    //})
  ]
};