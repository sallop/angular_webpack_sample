'use strict';
var webpack = require('webpack'),
    path = require('path');

//var APP = __dirname + '/src';

module.exports = {
  //entry: "./src/main.js",
  //context: APP,
  //devTool: "source-map",
  devtool: "source-map",
  entry: {
    app: ["webpack/hot/dev-server", "./src/core/bootstrap.js"],
    vendor: ["angular"]
  },
  output: {
    path: path.resolve('./build'),
    filename: "[name].bundle.js"
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js")
  ]
};
