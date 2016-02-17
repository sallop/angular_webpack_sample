// http://stackoverflow.com/questions/12938388/jasmine-test-does-not-see-angularjs-module
// http://stackoverflow.com/questions/13013772/how-do-i-test-an-angularjs-service-with-jasmine
// http://stackoverflow.com/questions/16565531/unit-testing-angularjs-factories-that-have-dependencies
describe('dispatcher', function(){
  //var dispatcher;
  beforeEach(module('app'));
  //beforeEach(inject(function(_dispatcher_){
  //  dispatcher = _dispatcher_;
  //}));

  it('should be', inject(function(dispatcher, $http){
    expect(dispatcher).toBeDefined();
    expect($http).toBeDefined();
  }));

});

describe('SelectTeamAction', function(){
  var $http, dispatcher;
  beforeEach(module('app'));

  beforeEach(inject(function(_$http_, _dispatcher_){
    $http = _$http_;
    dispatcher = _dispatcher_;
  }));

  it('should be', inject(function(SelectTeamAction, dispatcher, $http){
    expect(SelectTeamAction).toBeDefined();
  }));

  it('should be', inject(function(SelectTeamAction){
    expect(SelectTeamAction).toBeDefined();
  }));
});


xdescribe('PasswordController', function(){
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

xdescribe('injector', function(){
  var $injector;

  beforeEach(inject(function(_$injector_){
//https://docs.angularjs.org/api/ngMock/function/angular.mock.inject#resolving-references-underscore-wrapping-
    $injector = _$injector_;
  }));

  it('should be return $injector service', function(){
    expect($injector.get('$injector')).toBe($injector);
    expect($injector.invoke(function($injector){
      return $injector;
    })).toBe($injector);
  });
});

xdescribe('A spy', function(){
  var foo, bar = null;

  beforeEach(function(){
    foo = {
      setBar: function(value){
        bar = value;
      }
    };

    // spyOn(obj, 'method')
    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it("tracks that the spy was called", function(){
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks all the arguments of its calls", function(){
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it("stops all execution on a function", function(){
    expect(bar).toBeNull();
  });
});

xdescribe('A spy, when configured to call through', function(){
  var foo, bar, fetchBar;

  beforeEach(function(value){
    foo = {
      setBar: function(value){
        bar = value;
      },
      getBar: function(){
        return bar;
      }
    };

    spyOn(foo, 'getBar').and.callThrough();

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function(){
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not affect other function", function(){
    expect(bar).toEqual(123);
  });

  it("when called returns the requested value", function(){
    expect(fetchedBar).toEqual(123);
  });
});

//https://docs.angularjs.org/guide/services
xdescribe('Unit Testing', function(){
  var mock, notify;
  beforeEach(module('app'));
  beforeEach(function(){
    mock = { alert: jasmine.createSpy() };

    module(function($provide){
      $provide.value('$window', mock);
    });

    inject(function($injector){
      notify = $injector.get('notify');
    });

    it('should not alert first two notifications', function(){
      notify('one');
      notify('two');

      expect(mock.alert).not.toHaveBeenCalled();
    });

    it('should alert all after third notification', function(){
      nofity('one');
      notify('two');
      notify('three');

      expect(mock.alert).toHaveBeenCalledWith("one\ntwo\nthree");
    });

    it('should clear messages after alert', function(){
      notify('one');
      notify('two');
      notify('third');
      notify('more');
      notify('two');
      notify('third');

      expect(mock.alert.callCount).toEqual(2);
      expect(mock.alert.mostRecentCall.args).toEqual(["more\ntwo\nthird"]);
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

