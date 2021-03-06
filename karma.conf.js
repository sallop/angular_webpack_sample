// Karma configuration
// Generated on Thu Feb 18 2016 20:50:49 GMT+0900 (JST)

// Some plugin doesn't support for karma
// It need to substitute empty array or hash.
var webpack_config = require('./webpack.config.js');
webpack_config.entry = {};
webpack_config.output = {};
webpack_config.plugins = [];

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      //'src/index.js', <---- remove
      'test/spec/*Spec.js'
      //'src/calculator.js', <----- remove or comment this
      //'test/spec/calculatorSpec.js'
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //'src/index.js': ['webpack'],
      'src/*.js': ['webpack'],
      'test/spec/*Spec.js': ['webpack']
    },
    
    //webpack: require('./webpack.config.js'), doesn't work
    webpack: webpack_config,

    webpackMiddleware: {
      noInfo: true
    },

    //plugins: [
    //  require('karma-jasmine'),
    //  require('karma-phantomjs-launcher'),
    //  require('karma-webpack')
    //],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
