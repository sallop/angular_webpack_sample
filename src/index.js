//module.exports = angular.module('app', [])
var app = angular.module('app', []);

app.controller('PasswordController', function($scope){
  $scope.password = '';
  $scope.grade = function(){
    var size = $scope.password.length;
    if (size > 8){
      $scope.strength = 'strong';
    } else if(size > 3){
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };
});

//class ListStore extends EventEmitter {
//  constructor(){
//    super();
//    this.christianList = [];
//    console.log("constructor called");
//  }
//
//  addItem(christianName){
//    var items = this.christianList.push(christianName);
//    console.log("items=");
//    console.log( items );
//  }
//
//  emitChange(){
//    this.emit('change');
//  }
//}

app.service('dispatcher', EventEmitter);


//app.factory('SelectTeamAction', function(dispatcher){
app.factory('SelectTeamAction', ['$http', 'dispatcher', function($http, dispatcher){
  // So, is this sync or async?
  // which value will be return
  var data = ["doesn't get yet"];
  $http.get('assets/sample.json')
    .then(function success(res){
      data = res.data;
    }, function error(res){
      console.log("error");
      console.log(res);
    });
  return {
    getItem: function(item){
      dispatcher.emit({
        // actionType: some_action
        // item: data
      });
    }
  };
}]);

// app.factory('SelectItemAction', function(dispatcher){
//   // var editStore = new EditStore();
//   // dispatcher.emit('event');
//   return {
//     // doSomething(item){
//     //  dispatcher.emit({
//     //    actionType: DO_SOMETHING
//     //    item: item
//     //  });
//     // }
//   }
// });
// 
// app.factory('SubmitAction', function($http){
//   // for submit button
//   // return {
//   //   send : function(send_command){
//   //     $http.get('/insert/' + send_command)
//   //     .success(function(data){
//   //       console.log(data);
//   //     }).error(function(){
//   //       console.log(data);
//   //     });
//   //   }
//   // };
// });
// 
// 
// 
// app.controller('ListCtrl', function($scope, $http){
//   $scope.name = "If I didn't say anything, people always assumed the worst.";
//   //$scope.name = "It's only after we've lost everything that we're free to do anything.";
// 
// });
// 
// 
// app.factory('listStore', function(dispatcher){
//   var listStore = new ListStore();
// 
//   dispatcher.addListener('ADD_ITEM', function(item){
//     listStore.addItem(item);
//     listStore.emitChange();
//   });
// 
//   // expose only the public interface
//   return {
//     //addListener: (l) => listStore.addListener(l)
//     //someItems: () => someStore.Items
//   };
// });
// 
// app.factory('editStore', function(dispatcher){
//   var editStore = new EditStore();
// 
//   dispatcher.addListener('SELECT_ITEM', function(item){
//     //editStore.doSomething();
//     //editStore.emitChange();
//   });
// 
//   return {
//     // addListener: (l) => someStore.addListener(l),
//     // someItems: () => someStore.Items
//   };
// });
// 
// app.controller('EditCtrl', function(){
//   constructor(){
//     this.submitStore = submitStore();
//   }
// 
//   listStore.addListener(() => this.submitItems());
// 
//   submitItems(){
//     //this.items
//   }
// });

module.exports = app;
