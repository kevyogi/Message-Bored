angular.module('myApp')
.controller('newUserController', ['$scope', 'UserService', function($scope, UserService){

  $scope.addUser = function(e){
    UserService.addUser($scope.newUser);

    $scope.newUser.name = '';
    $scope.newUser.password = '';
  }

}])
