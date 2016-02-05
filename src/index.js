//module.exports = angular.module('app', [])
var app = angular.module('app', []);

app.controller('FooCtrl', function($scope){
  $scope.name = "If I didn't say anything, people always assumed the worst.";
});

app.controller('BarCtrl', require('./barCtrl.js'));
// default params
function printMessage(status='working'){
  // let
  let message = 'ES6';
  // template string
  console.log(`${message} is ${status}`);
}

printMessage();

module.exports = app;
