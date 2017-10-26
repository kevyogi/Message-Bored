angular.module('myApp')
.controller('loginController', ['$scope', 'UserService', function($scope, UserService){

  $scope.login = function(e){
    UserService.login();
  }

}]);