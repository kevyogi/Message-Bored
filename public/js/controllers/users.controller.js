angular.module('myApp')
.controller('UsersController', ['$scope', 'UserService', function($scope, UserService){
  $scope.UserService = UserService;
}]);