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
    .pipe(gulpWebpack(require('./webpack.config.js')))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack-dev-serve', function(){
  var compiler = webpack(require('./webpack.config.js'));
  var server = new WebpackDevServer(compiler, {
    contentBase: require('path').resolve("./build"),
    hot: true,
    historyApiFallback: false,
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
