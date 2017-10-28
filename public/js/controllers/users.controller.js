angular.module('myApp')
.controller('UsersController', ['$scope', 'UserService', function($scope, UserService){
  $scope.UserService = UserService;

  $scope.logout = function(e){
    UserService.logout();
  }

}]);