//require("./style.css");
//document.write(require("./content.js"));
module.exports = angular.module('app', [])
.controller('FooCtrl', function($scope){
  $scope.name = "foo";
});
