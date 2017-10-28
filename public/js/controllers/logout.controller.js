angular.module('myApp')
.controller('LogoutController', ['$scope', 'UserService', function($scope, UserService){

  $scope.UserService = UserService;

  $scope.logout = UserService.logout();

}]);