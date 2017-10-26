angular.module('myApp')
.controller('loginController', ['$scope', 'UserService', function($scope, UserService){

  $scope.login = function(e){
    console.log('scope.user:', $scope.user);
    UserService.login($scope.user);

    $scope.user.name = '';
    $scope.user.password = '';
  }

}]);