var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var WebpackDevServer = require("webpack-dev-server");

gulp.task('webpack-stream', function(){
  return gulp.src('src/core/bootstrap.js')
    .pipe(gulpWebpack({
      watch: false,
      devtool: "source-map",
      entry: {
        bundle: ["webpack/hot/dev-server","./src/core/bootstrap.js"],
        vendor: ["angular"]
      },
      output: {
      // http://webpack.github.io/docs/configuration.html
        filename: '[name].js',
      },
      module: {
        loaders: [
          { test: /\.scss$/, loader: 'style!css!sass' },
          { test: /\.css$/ , loader: 'style!css' },
          { test: /\.js$/  ,
            loader: 'ng-annotate!babel?presets[]=es2015!jshint',
            exclude: /node_module|bower_components/
          }
        ]
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
      ]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack', function(callback){
  // run webpack
  webpack(
    // configuration
    require('./webpack.config.js')
  , function(err, stats){
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    callback();
  });
});

gulp.task('html', function(){
  gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});
