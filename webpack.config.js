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
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.css/, loader: "style!css" },
      { test: /\.js/,
        loader: "ng-annotate!babel?presets[]=es2015!jshint",
        exclude: /node_module|bower_components/
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
