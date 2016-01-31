'use strict';
var webpack = require('webpack'),
    path = require('path');

var APP = __dirname + '/src';

module.exports = {
  //entry: "./src/main.js",
  context: APP,
  entry: ["webpack/hot/dev-server", "./core/bootstrap.js"],
  output: {
    path: './build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css/, loader: "style!css" },
      { test: /\.ts/, loader: "ts" },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
