//module.exports = angular.module('app', [])
var app = angular.module('app', []);

app.controller('FooCtrl', function($scope){
  //$scope.name = "If I didn't say anything, people always assumed the worst.";
  $scope.name = "This is your life and it's ending one minutes at at time.";
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

class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  toString(){
    return '(' + this.x + ',' + this.y + ')';
  }
};

module.exports = {
  app: app,
  Point: Point
};
