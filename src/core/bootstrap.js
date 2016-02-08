/* jshint browser:true */
'use strict';

require('./vendor')(); // run an empty function
// load the main app file
//var appModule = require('../index');
var appModule = require('../cart');

// replace ng-app="appName"
angular.element(document).ready(function(){
  angular.bootstrap(document, [appModule.name], {
    // strictDi: true
  });
});
