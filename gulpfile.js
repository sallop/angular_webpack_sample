var gulp = require('gulp');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var WebpackDevServer = require("webpack-dev-server");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var browserSync = require('browser-sync').create();

var sources = {
  html: ['src/**/*.html'],
  js: ['src/**/*.js'],
  css: ['src/**/*.css','src/**/*.scss'],
  dist: ['build/bundle.js']
};

gulp.task('webpack-stream', function(){
  return gulp.src('src/core/bootstrap.js')
    .pipe(gulpWebpack({
      watch: true,
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

gulp.task('webpack-dev-serve', function(){
  //var compiler = webpack( require('./webpack.config.js'), function(){});
  var compiler = webpack({
    //watch: true,
    cache: true,
    context: __dirname,
    entry: {
      bundle: ['webpack/hot/dev-server', './src/core/bootstrap.js'],
      vendor: ['angular']
    },
    output: {
      // note: https://github.com/webpack/webpack-dev-server/issues/88
      // Error: Invalid path
      path: require('path').resolve('./build'),
      filename: '[name].js'
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
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ]
  });
  //compiler.watch({
  //  aggregateTimeout: 300,
  //  poll: true
  //}, function(err, stats){
  //  if(err) throw new gutil.PluginError("webpack", err);
  //  gutil.log("[webpack]", stats.toString({
  //    // output options
  //  }));
  //});

  // not work
  var server = new WebpackDevServer(compiler, {
    contentBase: require('path').resolve("./build"),
    hot: true,
    historyApiFallback: false,
    //proxy: {
    //  "*": "http://localhost:9090"
    //},
    //quiet: false,
    //noInfo: false,
    //lazy: true,
    //filename: "bundle.js",
    //watchOptions: {
    //  aggregateTimeout: 300,
    //  poll: 1000
    //},
    //publicPath: "/assets/",
    //headers: {"X-Custom-Header":"yes"},
    //stats: { color: true },
  });
  server.listen(8080, "localhost", function(err){
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]",
      "http://localhost:8080/webpack-dev-server/index.html");
  });
});

gulp.task('html', function(){
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

gulp.task('html-watch', ['html'], browserSync.reload);

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
  gulp.watch(sources.html, ['html-watch']);
  // not work. It may need browserSync.stream()
  //gulp.watch(sources.html).on("change", browserSync.reload);
  gulp.watch(sources.dist).on('change', browserSync.reload);
  //not work. When a change event emit, build/bundle.js haven't compiled yet.
  //gulp.watch(sources.js).on('change', browserSync.reload);
  //gulp.watch(sources.css).on('change', browserSync.reload);
});

gulp.task('default', ['html', 'webpack-stream', 'browser-sync']);

gulp.task('clean', function(){
  gulp.src(['build/*.js', 'build/*.map', 'build/*.json'], { read: false })
      .pipe(clean());
});
