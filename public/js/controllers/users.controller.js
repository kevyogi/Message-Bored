angular.module('myApp')
.controller('UsersController', ['$scope', 'UserService', function($scope, UserService){

  // $scope.users = [];

  $scope.UserService = UserService;

  // $scope.newUser = {
  //   name: ''
  // };

  // $scope.getUser = function(e){
  //   UserService.getUser()
  // }

  // $scope.getUsers = function(e){
  //   $scope.users = UserService.getUsers();
  // }
}]);