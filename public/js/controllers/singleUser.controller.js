angular.module('myApp')
.controller('singleUserController', ['$scope', '$routeParams', 'UserService', function($scope, $routeParams, UserService){

  //console.log($routeParams);
  $scope.UserService = UserService;

  UserService.getUser($routeParams.id)
  .then(function(userInfo){
    $scope.user = userInfo;
  });

}]);