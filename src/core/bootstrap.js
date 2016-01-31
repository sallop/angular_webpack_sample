/* jshint browser:true */
'use strict';

require('angular');

// load the main app file
var appModule = require('../index');
// replace ng-app="appNmae"
angular.element(document).ready(function(){
  angular.bootstrap(document, [appModule.name], {
    //strictDi: true
  });
});
