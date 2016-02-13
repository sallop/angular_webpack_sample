describe('PasswordController', function(){
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.grade', function(){
    it('sets the  strength to "strong" if the password length is >8 chars',
      function(){
        var $scope = {};
        var controller = $controller('PasswordController', {
          $scope: $scope 
        });
        $scope.password = 'longrthaneightchars';
        $scope.grade();
        expect($scope.strength).toEqual('strong');
      });
  });

});

xdescribe('app.factory(SelectTeamAction)', function(){
  beforeEach(module('app'));

  beforeEach(module(module(function($provide){
    $provide.value('SelectTeamAction', {
      someVariable: 1
    });
  })));

  ii('can get an instance of my factory', inject(function(myFactory){
    expect(myFactory).toBeDefined();
  }));

});

