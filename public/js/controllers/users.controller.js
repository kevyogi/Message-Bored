angular.module('myApp')
.controller('UsersController', ['$scope', 'UserService', function($scope, UserService){

  $scope.users = [];

  $scope.UserService = UserService;

  $scope.newUser = {
    name: ''
  };

  // UserService.getUsers()
  // .then(function(users){
  //   $scope.users = users;
  // });

  // UserService.getUsers()
  // .then(function(users){
  //   $scope.users = users;
  // });

  $scope.getUsers = function(e){
    $scope.users = UserService.getUsers();
  }

  $scope.addUser = function(e){
    UserService.addUser($scope.newUser);

    $scope.newUser.name = '';
  }
}]);