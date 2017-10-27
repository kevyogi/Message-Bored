angular.module('myApp')
.controller('loginController', ['$scope', 'UserService', function($scope, UserService){

  $scope.login = function(e){
    UserService.login($scope.user);

    $scope.user.name = '';
    $scope.user.password = '';
  }

}]);